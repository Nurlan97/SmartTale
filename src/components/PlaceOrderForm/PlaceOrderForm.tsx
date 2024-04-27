import 'react-datepicker/dist/react-datepicker.css';
import './selectDay.css';

import { ru } from 'date-fns/locale';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import DatePicker, { registerLocale } from 'react-datepicker';

import { typePlaceOrderStore } from '../../store';
import Button from '../../UI/Button/Button';
import DateCustomInput from '../../UI/DateCustomInput/DateCustomInput';
import ImagesInput from '../../UI/ImageInput/ImageInput';
import Input from '../../UI/Input/Input';
import PhoneInput from '../../UI/PhoneInput/PhoneInput';
import Textarea from '../../UI/Textarea/Textarea';
import styles from './placeOrderForm.module.scss';

registerLocale('ru', ru);

type Props = { store: typePlaceOrderStore };

const PlaceOrderForm = observer(({ store }: Props) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      phone: '',
      sizes: '',
      deadline: new Date(),
    },

    onSubmit: ({ title, description, price, phone, sizes, deadline }) => {
      console.log(title, description, price, phone, sizes, deadline);
      console.log(store.calcActions());
    },
  });

  return (
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
          color={store.type === 'equipment' ? 'orange' : 'white'}
          type='button'
          handler={() => store.setType('equipment')}
        >
          Оборудование
        </Button>
        <Button
          color={store.type === 'equipment' ? 'white' : 'orange'}
          type='button'
          handler={() => store.setType('services')}
        >
          Заказ
        </Button>
      </div>

      <div className={styles.title}>{`Информация об ${
        store.type === 'equipment' ? 'оборудовании' : 'заказе'
      }`}</div>
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
      {store.type === 'services' && (
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
      {store.type === 'services' && (
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
      <PhoneInput
        onChange={formik.handleChange}
        value={formik.values.phone}
        label='Номер телефона'
        id='phone'
        width='100%'
      />
      <div className={styles.horizontalLine}></div>
      <div className={styles.footer}>
        <Button color='blue' type='submit'>
          Разместить объявление
        </Button>
      </div>
    </form>
  );
});

export default PlaceOrderForm;
