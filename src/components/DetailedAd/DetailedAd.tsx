import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CreateOrderRequest,
  CreateProductRequest,
  OrderFull,
  ProductFull,
} from '../../api/data-contracts';
import { createPlaceAdvStore, modalStore } from '../../store';
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
  id: number;
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
const DetailedAd = observer(({ id }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const store = createPlaceAdvStore(id);

  const schema = titleSchema.concat(descriptionSchema);
  const ad = store.ad[0];
  if ('orderId' in ad) {
    schema.concat(sizesSchema).concat(dateSchema);
  }
  const formik = useFormik({
    initialValues: 'orderId' in ad ? initalOrder : initialProduct,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      schema
        .validate({ ...values }, { abortEarly: false })
        .then(() => {
          // store.placeAd(values, store.additionalFiles);
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
            <div className={styles.buttonGroup}>
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
            </div>
          ) : (
            <>
              <Button
                color='blue'
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
                handler={() => modalStore.openModal(Modals.hideAd)}
              >
                Скрыть объявление
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default DetailedAd;
