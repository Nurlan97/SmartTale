import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';

import { InviteRequest } from '../../api/data-contracts';
import { modalStore } from '../../store';
import Button from '../../UI/Button/Button';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import Input from '../../UI/Input/Input';
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
      <CustomSelect
        current={formik.values.positionId}
        options={modalStore.dropDownPositions}
        handleChange={(key) => {
          formik.setFieldValue('positionId', key);
        }}
      />
      <Button color='blue' type='submit'>
        Отправить пришлашение
      </Button>
    </form>
  );
});

export default InviteEmployerModal;
