import 'react-datepicker/dist/react-datepicker.css';
import './selectDay.css';

import { ru } from 'date-fns/locale';
import { FormikErrors } from 'formik';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select';

import { CreateJobRequest } from '../../../api/data-contracts';
import { userStore } from '../../../store';
import adStore from '../../../store/adStore';
import DateCustomInput from '../../../UI/DateCustomInput/DateCustomInput';
import ImageInput from '../../../UI/ImageInput/ImageInput';
import Input from '../../../UI/Input/Input';
import TabSwitch from '../../../UI/TabSwitch/TabSwitch';
import Textarea from '../../../UI/Textarea/Textarea';
import { createStyles } from '../../../utils/selectHelpers';
import styles from './jobForm.module.scss';

type Props = {
  store: adStore;
  values: CreateJobRequest;
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<CreateJobRequest>>;
  isEdit?: boolean;
};
registerLocale('ru', ru);

type OptionType = {
  value: string;
  label: string;
};

const JobForm = observer(
  ({ values, handleChange, setFieldValue, store, isEdit = true }: Props) => {
    useLayoutEffect(() => {
      store.getDropdownPositions();
    }, []);
    const customStyles = createStyles<OptionType>(false);
    const jobTypeOptions: OptionType[] = [
      { value: 'FULL_TIME', label: 'Полная занятость' },
      { value: 'PART_TIME', label: 'Частичня занятость' },
      { value: 'CONTRACT', label: 'По контракту' },
      { value: 'INTERN', label: 'Стажировка' },
      { value: 'TEMPORARY', label: 'Временная занятость' },
    ];
    const position = store.posiitons.find(
      (posiiton) => posiiton.positionId === values.positionId,
    );
    const defaultValue = {
      value: values.positionId,
      label: position && position.title,
    };

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
          disabled={!isEdit}
        />
        <div className={styles.helper}>максимум 250 символов, минимум 5</div>
        <Textarea
          onChange={handleChange}
          value={values.description}
          required={true}
          label='Описание'
          width='100%'
          id='description'
          disabled={!isEdit}
        />
        <div className={styles.helper}>максимум 1000 символов, минимум 5</div>

        <Input
          onChange={handleChange}
          value={String(values.salary)}
          label='Размер оплаты'
          width='100%'
          id='salary'
          disabled={!isEdit}
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
          disabled={!isEdit}
        />

        <div className={styles.title}>Тип занятости</div>
        <Select
          isDisabled={!isEdit}
          options={jobTypeOptions}
          onChange={(option: any) => {
            setFieldValue('jobType', option.value);
          }}
          styles={customStyles}
          defaultValue={{
            value: values.jobType,
            label: jobTypeOptions.find((type) => type.value === values.jobType)?.label,
          }}
        />
        <div className={styles.title}>Должность</div>
        <Select
          isDisabled={!isEdit}
          options={store.posiitons.map((option) => {
            return {
              value: option.positionId,
              label: option.title,
            };
          })}
          onChange={(option: any) => {
            setFieldValue('positionId', option.value);
          }}
          styles={customStyles}
          defaultValue={values.positionId === -1 ? defaultValue : undefined}
          placeholder={'Выберите должность'}
        />

        <div className={styles.title}>Регион</div>
        <Input
          onChange={handleChange}
          value={values.location}
          required={true}
          label='Регион'
          width='100%'
          id='location'
          disabled={!isEdit}
        />
        <div className={styles.title}>Галерея фотографий</div>
        <ImageInput store={store} disabled={!isEdit} />
        <div className={styles.title}>
          Выберите какую контактную информацию показывать в объявлении
        </div>
        <div className={styles.contactsWrapper}>
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
            disabled={!isEdit}
          />
        </div>
      </div>
    );
  },
);

export default JobForm;
