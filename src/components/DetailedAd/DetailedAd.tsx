import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateOrderRequest, CreateProductRequest } from '../../api/data-contracts';
import { appStore, modalStore } from '../../store';
import adStore from '../../store/adStore';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import {
  dateSchema,
  descriptionSchema,
  sizesSchema,
  titleSchema,
} from '../../utils/placeOrderHelpers';
import OrderForm from '../PlaceAdvForm/OrderForm/OrderForm';
import ProductForm from '../PlaceAdvForm/ProductForm/ProductForm';
import styles from './detailedAd.module.scss';

interface IProps {
  store: adStore;
}
const initialProduct: CreateProductRequest = {
  title: '',
  description: '',
  price: 0,
  contactInfo: 'EMAIL',
  quantity: 0,
};

const initalOrder: CreateOrderRequest = {
  title: '',
  description: '',
  price: 0,
  size: '',
  deadline: `${new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)}`,
  contactInfo: 'EMAIL',
};
const DetailedAd = observer(({ store }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const schema = titleSchema.concat(descriptionSchema);
  const ad = store.ad[0];
  if ('orderId' in ad) {
    schema.concat(sizesSchema).concat(dateSchema);
  }

  const initialProduct: CreateProductRequest = {
    title: ad.title,
    description: ad.description,
    price: ad.price,
    contactInfo: 'EMAIL',
    quantity: 'quantity' in ad ? ad.quantity : 0,
  };

  const initalOrder: CreateOrderRequest = {
    title: ad.title,
    description: ad.description,
    price: ad.price,
    size: 'size' in ad ? ad.size : '',
    deadline:
      'deadlineAt' in ad
        ? ad.deadlineAt
        : `${new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)}`,
    contactInfo: 'EMAIL',
  };
  const formik = useFormik({
    initialValues: 'orderId' in ad ? initalOrder : initialProduct,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      schema
        .validate({ ...values }, { abortEarly: false })
        .then(() => {
          store.updateAd(values, 'productId' in ad ? ad.productId : ad.orderId);
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
      </form>

      <div className={styles.footer}>
        <Button color='orange' type='button' handler={() => navigate(-1)}>
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
                    await appStore.restoreAd('orderId' in ad ? ad.orderId : ad.productId);
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
