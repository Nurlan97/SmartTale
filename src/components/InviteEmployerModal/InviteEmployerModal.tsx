import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import Select from 'react-select';

import { InviteRequest } from '../../api/data-contracts';
import { modalStore } from '../../store';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { createStyles } from '../../utils/selectHelpers';
import styles from './inviteEmployerModal.module.scss';

const InviteEmployerModal = observer(() => {
  const initalValue: InviteRequest = {
    email: '',
    phoneNumber: '',
    positionId: 0,
  };
  useLayoutEffect(() => {
    modalStore.getPositions();
  }, []);
  const formik = useFormik({
    initialValues: initalValue,
    onSubmit: (values) => {
      modalStore.senInvite(values);
    },
  });
  type OptionType = {
    value: string;
    label: string;
  };
  const customStyles = createStyles<OptionType>(!!formik.errors.positionId);
  return (
    <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
      <div>Пригласить сотрудника</div>
      <Input
        value={formik.values.email}
        onChange={formik.handleChange}
        label='Введите электронную почту'
        id='email'
      />
      <Input
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        label='Введите телефон'
        id='phoneNumber'
      />
      <Select
        options={modalStore.dropDownPositions.map((option) => {
          return {
            value: option.positionId,
            label: option.title,
          };
        })}
        onChange={(option: any) => {
          formik.setFieldValue('positionId', option.value);
        }}
        styles={customStyles}
      />

      <Button color='blue' type='submit'>
        Отправить пришлашение
      </Button>
    </form>
  );
});

export default InviteEmployerModal;
