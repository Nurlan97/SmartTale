import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import userStore from '../../store/userStore';
import Button from '../../UI/Button/Button';
import {
  AuthorizationSchema,
  formData,
  initialValues,
  ISubmitTypes,
} from '../../utils/authorizationHelpers';
import Checkbox from '../Checkbox/Checkbox';
import FormInput from '../FormInput/FormInput';
import styles from './AuthorizationForm.module.scss';

const AuthorizationForm = observer(() => {
  const onSubmit = ({ email }: ISubmitTypes) => {
    console.log(email);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: AuthorizationSchema,
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
          Войти
        </Button>
      </form>
      <div className={styles.registrationLinkBlock}>
        <p>Ещё не зарегистрированы?</p>
        <Link to='/registration'>Зарегистрироваться</Link>
      </div>
    </div>
  );
});

export default AuthorizationForm;
