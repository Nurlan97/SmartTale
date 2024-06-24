import 'react-datepicker/dist/react-datepicker.css';
import './selectDay.css';

import { ru } from 'date-fns/locale';
import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import { CreateOrderRequest, UpdateOrderRequest } from '../../../api/data-contracts';
import { typePlaceAdvStore, userStore } from '../../../store';
import DateCustomInput from '../../../UI/DateCustomInput/DateCustomInput';
import ImageInput from '../../../UI/ImageInput/ImageInput';
import Input from '../../../UI/Input/Input';
import SortableImageInput from '../../../UI/SortableImageInput/SortableImageInput';
import TabSwitch from '../../../UI/TabSwitch/TabSwitch';
import Textarea from '../../../UI/Textarea/Textarea';
import SizeInput from '../../SizeInput/SizeInput';
import styles from './orderForm.module.scss';
type Props = {
  store: typePlaceAdvStore;
  formik: FormikProps<CreateOrderRequest | UpdateOrderRequest>;
  isEdit?: boolean;
};
registerLocale('ru', ru);

const OrderForm = observer(({ formik, store, isEdit = true }: Props) => {
  const preSelectSize: Set<string> = new Set(formik.values.size?.split(','));
  const [selectedSize, setSelectedSize] = useState(preSelectSize);
  useEffect(() => {
    formik.setFieldValue('size', Array.from(selectedSize).toString());
  }, [selectedSize]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`Информация о заказе`}</div>
      <Input
        onChange={formik.handleChange}
        value={formik.values.title}
        required={true}
        label='Название'
        width='100%'
        id='title'
        disabled={!isEdit}
      />
      <div className={styles.helper}>максимум 250 символов, минимум 5</div>
      <Textarea
        onChange={formik.handleChange}
        value={formik.values.description}
        required={true}
        label='Описание'
        width='100%'
        id='description'
        disabled={!isEdit}
      />
      <div className={styles.helper}>максимум 1000 символов, минимум 5</div>

      <SizeInput
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        disabled={!isEdit}
      />

      <Input
        onChange={(e) => {
          const regex = new RegExp(/^\+?[0-9]*$/);
          if (!regex.test(e.target.value)) return;
          formik.handleChange(e);
        }}
        value={String(formik.values.price ? formik.values.price : '')}
        placeholder='Не указана'
        label='Стоимость в cомах'
        width='100%'
        id='price'
        disabled={!isEdit}
      />
      <div className={styles.title}>Крайняя дата выполнения</div>
      {/* {'deadline' in formik.values && (
        <DatePicker
          withPortal
          selected={
            (formik.values.deadlineAt && new Date(formik.values.deadlineAt)) || null
          }
          onChange={(date: Date) =>
            formik.setFieldValue('deadline', date.toISOString().slice(0, 10))
          }
          customInput={<DateCustomInput />}
          dateFormat='dd.MMM.yyyy'
          calendarStartDay={1}
          locale='ru'
          id='deadline'
          disabled={!isEdit}
        />
      )} */}
      {'deadlineAt' in formik.values && (
        <DatePicker
          withPortal
          selected={
            (formik.values.deadlineAt && new Date(formik.values.deadlineAt)) || null
          }
          onChange={(date: Date) =>
            formik.setFieldValue('deadlineAt', date.toISOString().slice(0, 10))
          }
          customInput={<DateCustomInput />}
          dateFormat='dd.MMM.yyyy'
          calendarStartDay={1}
          locale='ru'
          id='deadlineAt'
          disabled={!isEdit}
        />
      )}

      <div className={styles.title}>Галерея фотографий</div>
      {/* <ImageInput store={store} disabled={!isEdit} />
       */}
      <SortableImageInput store={store} disabled={!isEdit} />
      <div className={styles.title}>
        Выберите какую контактную информацию показывать в объявлении
      </div>
      <div className={styles.contactsWrapper}>
        <div className={styles.contactsGrp}>
          <span
            className={
              formik.values.contactInfo.includes('PHONE')
                ? styles.contactsItemActive
                : styles.contactsItem
            }
          >
            {userStore.phone}
          </span>
          <span
            className={
              formik.values.contactInfo.includes('EMAIL')
                ? styles.contactsItemActive
                : styles.contactsItem
            }
          >
            {userStore.email}
          </span>
        </div>
        <TabSwitch
          tabs={[
            { tab: 'PHONE', title: 'Телефон' },
            { tab: 'EMAIL', title: 'E-mail' },
            { tab: 'EMAIL_PHONE', title: 'Оба' },
          ]}
          activeTab={formik.values.contactInfo}
          switchFunc={(tab: any) => () => {
            formik.setFieldValue('contactInfo', tab);
          }}
          disabled={!isEdit}
        />
      </div>
    </div>
  );
});

export default OrderForm;
