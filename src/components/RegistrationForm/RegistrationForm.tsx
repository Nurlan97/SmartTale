import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { userStore } from '../../store';
import Button from '../../UI/Button/Button';
import {
  formData,
  initialValues,
  ISubmitTypes,
  RegistrationSchema,
} from '../../utils/registrationHelpers';
import Checkbox from '../Checkbox/Checkbox';
import FormInput from '../FormInput/FormInput';
import styles from './RegistrationForm.module.scss';

const RegistrationForm = observer(() => {
  const onSubmit = async ({ lastName, firstName, middleName, email }: ISubmitTypes) => {
    // console.log(lastName, firstName, middleName, email);
    try {
      await userStore.fetchRegistration({ lastName, firstName, middleName, email });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: RegistrationSchema,
  });
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {formData.map((data, index) => {
          return (
            <FormInput
              key={index}
              htmlFor={data.htmlFor}
              label={data.label}
              placeholder={data.placeholder}
              id={data.id}
              formik={formik}
            />
          );
        })}
        <Checkbox checked={userStore.isRemember} onClick={userStore.toggleRemember} />
        <Button color='blue' type='submit' width='100%'>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.loginLinkBlock}>
        <p>Уже зарегистрированы?</p>
        <Link to='/authorization'>Войти</Link>
      </div>
    </div>
  );
});

export default RegistrationForm;
