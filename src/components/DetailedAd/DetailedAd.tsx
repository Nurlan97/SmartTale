import { FormikErrors, useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreateJobRequest,
  CreateOrderRequest,
  CreateProductRequest,
  UpdateJobRequest,
  UpdateOrderRequest,
  UpdateProductRequest,
} from '../../api/data-contracts';
import { defaultImage, defaultPhoto } from '../../assets';
import { appStore, modalStore, userStore } from '../../store';
import adStore from '../../store/adStore';
import employeeStore from '../../store/employeeStore';
import { Modals } from '../../store/modalStore';
import vacancyStore from '../../store/vacancyStore';
import Button from '../../UI/Button/Button';
import { formatDate } from '../../utils/helpers';
import { deadlineSchema, descriptionSchema, titleSchema } from '../../utils/yupShemas';
import JobForm from '../PlaceAdvForm/JobForm/JobForm';
import OrderForm from '../PlaceAdvForm/OrderForm/OrderForm';
import ProductForm from '../PlaceAdvForm/ProductForm/ProductForm';
import styles from './detailedAd.module.scss';

interface IProps {
  store: adStore;
}

const DetailedAd = observer(({ store }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const schema = titleSchema.concat(descriptionSchema);
  const ad = store.ad[0];
  if ('orderId' in ad) {
    schema.concat(deadlineSchema);
  }

  const initialProduct: UpdateProductRequest | CreateProductRequest = {
    title: 'title' in ad ? ad.title : '',
    description: 'description' in ad ? ad.description : '',
    price: 'price' in ad ? ad.price : 0,
    contactInfo: 'EMAIL',
    quantity: 'quantity' in ad ? ad.quantity : 0,
    advertisementId: 'productId' in ad ? ad.productId : undefined,
  };

  const initalOrder: UpdateOrderRequest | CreateOrderRequest = {
    title: 'title' in ad ? ad.title : '',
    description: 'description' in ad ? ad.description : '',
    price: 'price' in ad ? ad.price : 0,
    size: 'size' in ad ? ad.size : '',
    deadlineAt:
      'deadlineAt' in ad
        ? ad.deadlineAt
        : `${new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)}`,
    contactInfo: 'EMAIL',
    advertisementId: 'orderId' in ad ? ad.orderId : undefined,
  };
  const initalJob: UpdateJobRequest | CreateJobRequest = {
    title: 'title' in ad ? ad.title : '',
    description: 'description' in ad ? ad.description : '',
    contactInfo: userStore.contactInfo ? userStore.contactInfo : 'EMAIL',
    jobType: 'jobType' in ad ? ad.jobType : 'FULL_TIME',
    salary: 'salary' in ad ? ad.salary : 0,
    jobId: 'jobId' in ad ? ad.jobId : 0,
    location: 'location' in ad ? ad.location : '',
    positionId: 'positionId' in ad ? ad.positionId : -1,
    applicationDeadline: 'applicationDeadline' in ad ? ad.applicationDeadline : '',
  };

  const formik = useFormik({
    initialValues:
      'orderId' in ad ? initalOrder : 'productId' in ad ? initialProduct : initalJob,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      schema
        .validate({ ...values }, { abortEarly: false })
        .then(() => {
          store.updateAd(values);
          store.fetchAd(
            'productId' in store.ad[0]
              ? store.ad[0].productId
              : 'orderId' in store.ad[0]
                ? store.ad[0].orderId
                : store.ad[0].jobId,
          );
          formik.resetForm();
        })
        .catch((e) => {
          console.log(e);
          modalStore.openModal(Modals.errorValidation);
        });
    },
  });
  const navigate = useNavigate();
  return (
    <div>
      {ad.isClosed && <div className={styles.adHided}>Объявление скрыто!</div>}

      <form
        className={styles.form}
        onSubmit={(e) => {
          console.log('submit');
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        {'orderId' in ad && <OrderForm store={store} formik={formik} isEdit={isEdit} />}
        {'quantity' in formik.values && (
          <ProductForm
            store={store}
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            isEdit={isEdit}
          />
        )}
        {'positionId' in formik.values && (
          <JobForm
            store={store}
            values={formik.values}
            isEdit={isEdit}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
          />
        )}
      </form>

      {'acceptanceRequests' in ad && !!ad.acceptanceRequests.length && (
        <>
          <div className={styles.requests}>
            <div className={styles.title}>Заявки на исполнение</div>
          </div>
          {ad.acceptanceRequests.map((request, ind) => {
            return (
              <div key={ind} className={styles.request}>
                <div className={styles.requestDescription}>
                  <img
                    className={styles.requestLogo}
                    src={request.logoUrl ? request.logoUrl : defaultImage}
                    alt=''
                  />
                  <div className={styles.requestOrg}>{request.name}</div>
                </div>
                <div className={styles.requestDescription}>
                  <div
                    className={styles.requestDate}
                  >{`Дата заявки ${formatDate(request.requestedAt)}`}</div>{' '}
                  <Button
                    color={'white'}
                    type={'button'}
                    height='40px'
                    handler={() => {
                      store.confirmRequest(request.code);
                    }}
                  >
                    Принять
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      )}
      {'jobApplications' in ad && !!ad.jobApplications.length && (
        <>
          <div className={styles.requests}>
            <div className={styles.title}>Заявки на исполнение</div>
          </div>
          {ad.jobApplications.map((request, ind) => {
            return (
              <div key={ind} className={styles.request}>
                <div className={styles.requestDescription}>
                  <img
                    className={styles.requestLogo}
                    src={request.avatarUrl ? request.avatarUrl : defaultPhoto}
                    alt=''
                  />
                  <div className={styles.requestOrg}>{request.applicantName}</div>
                </div>
                <div className={styles.requestDescription}>
                  <div
                    className={styles.requestDate}
                  >{`Дата заявки ${formatDate(request.applicationDate)}`}</div>{' '}
                  <Button
                    color={'white'}
                    type={'button'}
                    height='40px'
                    handler={() => {
                      // store.confirmRequest(request.applicantId);
                      employeeStore.inviteEmployee({
                        email: request.email,
                        phoneNumber: request.phoneNumber,
                        positionId: ad.positionId,
                      });
                    }}
                  >
                    Принять
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className={styles.footer}>
        <Button
          color='orange'
          type='button'
          handler={() => {
            navigate(-1);
            // store.
          }}
        >
          Назад
        </Button>
        <div className={styles.btnGroup}>
          {isEdit ? (
            <>
              <Button
                color='white'
                type='button'
                width='fit-content'
                handler={() => {
                  formik.resetForm();
                  store.resetImgs();
                  setIsEdit(false);
                }}
              >
                Отменить изменения
              </Button>
              <Button
                color='orange'
                type='button'
                width='fit-content'
                handler={() => {
                  formik.submitForm();
                  setIsEdit(false);
                }}
              >
                Сохранить изменения
              </Button>
            </>
          ) : (
            <>
              <Button
                color='orange'
                type='button'
                width='fit-content'
                handler={() => setIsEdit(true)}
              >
                Изменить данные
              </Button>
              <Button
                color='red'
                type='button'
                handler={() => modalStore.openModal(Modals.deleteAd)}
              >
                Удалить
              </Button>
              <Button
                color='blue'
                type='button'
                handler={async () => {
                  if (ad.isClosed) {
                    if ('jobId' in ad) {
                      await vacancyStore.restoreAd(ad.jobId);
                    } else {
                      await appStore.restoreAd(
                        'orderId' in ad ? ad.orderId : ad.productId,
                      );
                    }

                    navigate(-1);
                  } else {
                    modalStore.openModal(Modals.hideAd);
                  }
                }}
              >
                {ad.isClosed ? 'Вернуть объявление' : 'Скрыть объявление'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default DetailedAd;
