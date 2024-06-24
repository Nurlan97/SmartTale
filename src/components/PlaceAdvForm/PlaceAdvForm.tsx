import { useFormik } from 'formik';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import * as Yup from 'yup';

import {
  CreateJobRequest,
  CreateOrderRequest,
  CreateProductRequest,
} from '../../api/data-contracts';
import { createPlaceAdvStore, modalStore, userStore } from '../../store';
import { AdType } from '../../store/adStore';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import { errorNotify } from '../../utils/toaster';
import {
  applicationDeadlineSchema,
  deadlineSchema,
  descriptionSchema,
  positionSchema,
  quantitySchema,
  titleSchema,
} from '../../utils/yupShemas';
import JobForm from './JobForm/JobForm';
import OrderForm from './OrderForm/OrderForm';
import styles from './placeAdvForm.module.scss';
import ProductForm from './ProductForm/ProductForm';

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
  deadlineAt: `${new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString()}`,
  contactInfo: 'EMAIL',
};

const initialJob: CreateJobRequest = {
  title: '',
  description: '',
  salary: 0,
  applicationDeadline: `${new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString()}`,
  contactInfo: 'EMAIL',
  jobType: 'FULL_TIME',
  location: '',
  positionId: 0,
};

const initialObj = {
  Product: initialProduct,
  Order: initalOrder,
  Job: initialJob,
};
const store = createPlaceAdvStore();
const PlaceAdvForm = observer(() => {
  let schema = titleSchema.concat(descriptionSchema);
  if (store.type === 'Product') {
    schema = schema.concat(quantitySchema);
  }
  if (store.type === 'Order') schema = schema.concat(deadlineSchema);
  if (store.type === 'Job')
    schema = schema.concat(applicationDeadlineSchema).concat(positionSchema);

  const typesArr: { tab: AdType; title: string }[] = [
    { tab: 'Product', title: 'Оборудование' },
    { tab: 'Order', title: 'Заказ' },
  ];
  if (userStore.authorities.includes('INVITE_EMPLOYEE')) {
    typesArr.push({ tab: 'Job', title: 'Работа' });
  }

  const formik = useFormik({
    initialValues: initialObj[store.type],
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await schema.validate({ ...values }).catch((err) => {
          const errorMessage = err.errors;
          errorNotify(`${errorMessage}`);
          throw err;
        });
        store.placeAd(values);
        formik.resetForm();
      } catch (error) {
        console.log(error);
        modalStore.openModal(Modals.errorValidation);
      }
    },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <TabSwitch
          activeTab={store.type}
          tabs={typesArr}
          switchFunc={(tab) => store.setType(tab)}
        />

        <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
          {store.type === 'Product' && 'quantity' in formik.values && (
            <ProductForm
              values={formik.values}
              store={store}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
            />
          )}
          {store.type === 'Order' && 'size' in formik.values && (
            <OrderForm formik={formik} store={store} />
          )}
          {store.type === 'Job' && 'jobType' in formik.values && (
            <JobForm
              values={formik.values}
              handleChange={formik.handleChange}
              setFieldValue={formik.setFieldValue}
              store={store}
            />
          )}
          <div className={styles.horizontalLine}></div>
          <div className={styles.footer}>
            <Button
              color='blue'
              type='submit'
              disabled={
                !formik.values.title ||
                !formik.values.description ||
                ('quantity' in formik.values ? !formik.values.quantity : false) ||
                ('location' in formik.values ? !formik.values.location : false)
              }
            >
              Разместить объявление
            </Button>
          </div>
        </form>
      </div>
    </>
  );
});

export default PlaceAdvForm;
