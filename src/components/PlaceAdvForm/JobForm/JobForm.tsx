import 'react-datepicker/dist/react-datepicker.css';
import './selectDay.css';

import { ru } from 'date-fns/locale';
import { FormikErrors, FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import { CreateJobRequest } from '../../../api/data-contracts';
import { typePlaceAdvStore, userStore } from '../../../store';
import CustomSelect from '../../../UI/CustomSelect/CustomSelect';
import DateCustomInput from '../../../UI/DateCustomInput/DateCustomInput';
import ImageInput from '../../../UI/ImageInput/ImageInput';
import Input from '../../../UI/Input/Input';
import TabSwitch from '../../../UI/TabSwitch/TabSwitch';
import Textarea from '../../../UI/Textarea/Textarea';
import styles from './jobForm.module.scss';

type Props = {
  store: typePlaceAdvStore;
  values: CreateJobRequest;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<CreateJobRequest>>;
};
registerLocale('ru', ru);
const JobForm = observer(({ values, handleChange, setFieldValue, store }: Props) => {
  useEffect(() => {
    store.getDropdownPositions();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`Информация о вакансии`}</div>
      <Input
        onChange={handleChange}
        value={values.title}
        required={true}
        label='Название'
        width='100%'
        id='title'
      />
      <div className={styles.helper}>максимум 250 символов, минимум 5</div>
      <Textarea
        onChange={handleChange}
        value={values.description}
        required={true}
        label='Описание'
        width='100%'
        id='description'
      />
      <div className={styles.helper}>максимум 1000 символов, минимум 5</div>

      <Input
        onChange={handleChange}
        value={String(values.salary)}
        label='Размер оплаты'
        width='100%'
        id='salary'
      />
      <div className={styles.title}>Крайняя дата принятия предложения</div>
      <DatePicker
        withPortal
        selected={
          (values.applicationDeadline && new Date(values.applicationDeadline)) || null
        }
        onChange={(date: Date) => setFieldValue('applicationDeadline', date)}
        customInput={<DateCustomInput />}
        dateFormat='dd.MMM.yyyy'
        calendarStartDay={1}
        locale='ru'
        id='applicationDeadline'
      />

      <div className={styles.title}>Тип занятости</div>
      <CustomSelect
        current={values.jobType}
        options={[
          { key: 'FULL_TIME', value: 'Полная занятость' },
          { key: 'PART_TIME', value: 'Частичня занятость' },
          { key: 'CONTRACT', value: 'По контракту' },
          { key: 'INTERN', value: 'Стажировка' },
          { key: 'TEMPORARY', value: 'Временная занятость' },
        ]}
        handleChange={(key) => {
          setFieldValue('jobType', key);
        }}
      />
      {/* <select id='jobType' name='jobType' onChange={handleChange} value={values.jobType}>
        {[
          { key: 'FULL_TIME', value: 'Полная занятость' },
          { key: 'PART_TIME', value: 'Частичня занятость' },
          { key: 'CONTRACT', value: 'По контракту' },
          { key: 'INTERN', value: 'Стажировка' },
          { key: 'TEMPORARY', value: 'Временная занятость' },
        ].map((option, ind) => {
          return (
            <option key={option.key} value={option.value} selected={ind === 0}>
              {option.value}
            </option>
          );
        })}
      </select> */}

      <div className={styles.title}>Должность</div>

      <CustomSelect
        current={values.positionId}
        options={store.posiitons}
        handleChange={(key) => {
          setFieldValue('positionId', key);
        }}
      />
      {/* <select
        id='positionId'
        name='positionId'
        onChange={handleChange}
        value={values.positionId}
        className={styles.select}
      >
        {store.posiitons.map((option, ind) => {
          return (
            <option
              key={option.positionId}
              value={option.positionId}
              selected={ind === 0}
              className={styles.option}
            >
              {option.title}
            </option>
          );
        })}
      </select> */}

      <div className={styles.title}>Регион</div>
      <Input
        onChange={handleChange}
        value={values.location}
        required={true}
        label='Регион'
        width='100%'
        id='location'
      />
      <div className={styles.title}>Галерея фотографий</div>
      <ImageInput store={store} />
      <div className={styles.title}>
        Выберите какую контактную информацию показывать в объявлении
      </div>
      <div className={styles.contactsWrapper}>
        {/* <div className={styles.contactsTxt}>
          Выберите какую контактную информацию показывать в объявлении
        </div> */}
        <div className={styles.contactsGrp}>
          <span
            className={
              values.contactInfo.includes('PHONE')
                ? styles.contactsItemActive
                : styles.contactsItem
            }
          >
            {userStore.phone}
          </span>
          <span
            className={
              values.contactInfo.includes('EMAIL')
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
          activeTab={values.contactInfo}
          switchFunc={(tab: any) => () => {
            setFieldValue('contactInfo', tab);
          }}
        />
      </div>
    </div>
  );
});

export default JobForm;
