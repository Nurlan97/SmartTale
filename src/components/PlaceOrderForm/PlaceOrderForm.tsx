import 'react-datepicker/dist/react-datepicker.css';
import './selectDay.css';

import { ru } from 'date-fns/locale';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import DatePicker, { registerLocale } from 'react-datepicker';

import { IInital } from '../../pages/PlaceOrderPage/PlaceOrderPage';
import { modalStore, typePlaceOrderStore, userStore } from '../../store';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import DateCustomInput from '../../UI/DateCustomInput/DateCustomInput';
import ImagesInput from '../../UI/ImageInput/ImageInput';
import Input from '../../UI/Input/Input';
import Textarea from '../../UI/Textarea/Textarea';
import {
  dateSchema,
  descriptionSchema,
  sizesSchema,
  titleSchema,
} from '../../utils/placeOrderHelpers';
import styles from './placeOrderForm.module.scss';

registerLocale('ru', ru);

type Props = {
  store: typePlaceOrderStore;
  initialValues: IInital;
  type: 'new' | 'update';
};

const PlaceOrderForm = observer(({ store, initialValues, type }: Props) => {
  const schema = titleSchema.concat(descriptionSchema);
  if (store.type === 'Order') {
    schema.concat(sizesSchema).concat(dateSchema);
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: ({ title, description, price, contacts, sizes, deadline }) => {
      schema
        .validate({ title, description, sizes, deadline }, { abortEarly: false })
        .then(() => {
          store.placeAd(
            {
              type: store.type,
              title: title,
              description: description,
              price: price ? Number(price) : undefined,
              size: sizes ? sizes : undefined,
              deadline:
                store.type === 'Order' ? deadline.toISOString().slice(0, 10) : undefined,
              contactInfo: contacts ? contacts : undefined,
            },
            store.additionalFiles,
          );
          formik.resetForm();
        })
        .catch((e) => {
          console.log(e);
          modalStore.openModal(Modals.errorValidation);
        });
    },
  });

  return (
    <>
      <form
        className={styles.wrapper}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className={styles.title}>Тип объявления</div>
        <div className={styles.buttonGroup}>
          <Button
            color={store.type === 'Product' ? 'orange' : 'white'}
            type='button'
            handler={() => store.setType('Product')}
          >
            Оборудование
          </Button>
          <Button
            color={store.type === 'Product' ? 'white' : 'orange'}
            type='button'
            handler={() => store.setType('Order')}
          >
            Заказ
          </Button>
        </div>

        <div
          className={styles.title}
        >{`Информация об ${store.type === 'Product' ? 'оборудовании' : 'заказе'}`}</div>
        <Input
          onChange={formik.handleChange}
          value={formik.values.title}
          required={true}
          label='Название'
          width='100%'
          id='title'
        />
        <div className={styles.helper}>максимум 250 символов, минимум 5</div>
        <Textarea
          onChange={formik.handleChange}
          value={formik.values.description}
          required={true}
          label='Описание'
          width='100%'
          id='description'
        />
        <div className={styles.helper}>максимум 1000 символов, минимум 5</div>
        {store.type === 'Order' && (
          <>
            <Input
              onChange={formik.handleChange}
              value={formik.values.sizes}
              label='Размеры'
              width='100%'
              id='sizes'
            />
            <div className={styles.helper}>максимум 250 символов, минимум 5</div>
          </>
        )}

        <Input
          onChange={formik.handleChange}
          value={formik.values.price}
          label='Стоимость в cомах'
          width='100%'
          id='price'
        />
        {store.type === 'Order' && (
          <>
            <div className={styles.title}>Крайняя дата выполнения</div>
            <DatePicker
              selected={
                (formik.values.deadline && new Date(formik.values.deadline)) || null
              }
              onChange={(date: Date) => formik.setFieldValue('deadline', date)}
              customInput={<DateCustomInput />}
              dateFormat='dd.MMM.yyyy'
              calendarStartDay={1}
              locale='ru'
              id='deadline'
            />
          </>
        )}

        <div className={styles.title}>Галерея фотографий</div>
        <ImagesInput store={store} />
        <div className={styles.title}>Контактная информация</div>
        <div className={styles.contactsWrapper}>
          <div className={styles.contactsTxt}>
            Выберите какую контактную информацию показывать в объявлении
          </div>
          <div>
            <span
              className={
                formik.values.contacts.includes('PHONE')
                  ? styles.contactsItemActive
                  : styles.contactsItem
              }
            >
              {userStore.phone}
            </span>
            <span
              className={
                formik.values.contacts.includes('EMAIL')
                  ? styles.contactsItemActive
                  : styles.contactsItem
              }
            >
              {userStore.email}
            </span>
          </div>
          <div className={styles.contactsBtnGroup}>
            <button
              className={
                formik.values.contacts === 'PHONE'
                  ? styles.contactsBtnActive
                  : styles.contactsBtn
              }
              onClick={() => formik.setFieldValue('contacts', 'PHONE')}
              type='button'
            >
              Телефон
            </button>
            <button
              className={
                formik.values.contacts === 'EMAIL'
                  ? styles.contactsBtnActive
                  : styles.contactsBtn
              }
              onClick={() => formik.setFieldValue('contacts', 'EMAIL')}
              type='button'
            >
              E-mail
            </button>
            <button
              className={
                formik.values.contacts === 'EMAIL_PHONE'
                  ? styles.contactsBtnActive
                  : styles.contactsBtn
              }
              onClick={() => formik.setFieldValue('contacts', 'EMAIL_PHONE')}
              type='button'
            >
              {' '}
              Оба
            </button>
          </div>
        </div>

        <div className={styles.horizontalLine}></div>
        <div className={styles.footer}>
          {type === 'new' ? (
            <Button
              color='blue'
              type='submit'
              disabled={!formik.values.title || !formik.values.description}
            >
              Разместить объявление
            </Button>
          ) : (
            <>
              <Button color='red' type='button'>
                Удалить
              </Button>{' '}
              <Button color='blue' type='button'>
                Скрыть объявление
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
});

export default PlaceOrderForm;
