import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
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
  const [submit, setSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const onSubmit = ({
    lastName,
    firstName,
    middleName,
    email,
    phoneNumber,
  }: ISubmitTypes) => {
    try {
      setTimeout(async () => {
        await userStore.fetchRegistration({
          lastName,
          firstName,
          middleName,
          email,
          phoneNumber,
        });
      }, 500);
    } catch (error) {
      console.log(error);
    }

    setSubmit(true);
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
              setError={setIsError}
            />
          );
        })}
        <Checkbox checked={userStore.isRemember} onClick={userStore.toggleRemember} />
        {!submit &&
          (isError ? (
            <Button color='white' type='submit' disabled={true}>
              Заполните все поля
            </Button>
          ) : (
            <Button color='blue' type='submit' width='100%'>
              Зарегистрироваться
            </Button>
          ))}
        {submit && (
          <Button color='blue' type='submit' width='100%' disabled={true}>
            <div className={styles.loaderWrapper}>
              <div className={styles.loader}>Ожидаем...</div>
            </div>
          </Button>
        )}
      </form>
      <div className={styles.loginLinkBlock}>
        <p>Уже зарегистрированы?</p>
        <Link to='/authorization'>Войти</Link>
      </div>
    </div>
  );
});

export default RegistrationForm;
