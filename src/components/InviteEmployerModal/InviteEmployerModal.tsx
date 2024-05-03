import { useFormik } from 'formik';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './inviteEmployerModal.module.scss';

const InviteEmployerModal = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      position: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={styles.wrapper}>
      <div>Пригласить сотрудника</div>
      <Input
        value={formik.values.email}
        onChange={formik.handleChange}
        label='Введите электронную почту'
        id='email'
      />
      <Input
        value={formik.values.position}
        onChange={formik.handleChange}
        label='Должность сотрудника'
        id='position'
      />
      <Button color='blue' type='button'>
        Отправить пришлашение
      </Button>
    </div>
  );
};

export default InviteEmployerModal;
