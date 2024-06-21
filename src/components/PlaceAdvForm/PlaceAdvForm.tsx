import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import {
  CreateJobRequest,
  CreateOrderRequest,
  CreateProductRequest,
} from '../../api/data-contracts';
import { modalStore, typePlaceAdvStore, userStore } from '../../store';
import { AdType } from '../../store/adStore';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import {
  dateSchema,
  descriptionSchema,
  sizesSchema,
  titleSchema,
} from '../../utils/placeOrderHelpers';
import JobForm from './JobForm/JobForm';
import OrderForm from './OrderForm/OrderForm';
import styles from './placeAdvForm.module.scss';
import ProductForm from './ProductForm/ProductForm';

type Props = {
  store: typePlaceAdvStore;
};

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

const initialJob: CreateJobRequest = {
  title: '',
  description: '',
  salary: 0,
  applicationDeadline: '',
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
const PlaceAdvForm = observer(({ store }: Props) => {
  const schema = titleSchema.concat(descriptionSchema);
  if (store.type === 'Order') {
    schema.concat(sizesSchema).concat(dateSchema);
  }
  const typesArr: { tab: AdType; title: string }[] = [
    { tab: 'Product', title: 'Оборудование' },
    { tab: 'Order', title: 'Заказ' },
  ];
  if (userStore.authorities.includes('INVITE_EMPLOYEE')) {
    typesArr.push({ tab: 'Job', title: 'Услуга' });
  }

  const formik = useFormik({
    initialValues: initialObj[store.type],
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      schema
        .validate({ ...values }, { abortEarly: false })
        .then(() => {
          store.placeAd(values, store.additionalFiles);
          formik.resetForm();
        })
        .catch((e) => {
          console.log(formik.errors);
          console.log(e);
          modalStore.openModal(Modals.errorValidation);
        });
    },
  });

  return (
    <>
      <div className={styles.wrapper}>
        {/* <div className={styles.title}>Тип объявления</div> */}
        <TabSwitch
          activeTab={store.type}
          tabs={typesArr}
          switchFunc={(tab) => store.setType(tab)}
        />

        <form
          className={styles.wrapper}
          onSubmit={(e) => {
            console.log('submit');
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
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
              disabled={!formik.values.title || !formik.values.description}
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
