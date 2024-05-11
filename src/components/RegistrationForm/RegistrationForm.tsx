import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDebounce } from '../../hooks/useDebounce';
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
  const debounceSearch = useDebounce((search: string) => {
    if (search === '') return;
    if (!formik.errors.email || formik.errors.email === 'Данный email занят') {
      userStore.fetchAvailableEmail(search).then((data) => {
        if (!data) formik.setFieldError('email', 'Данный email занят');
      });
    }
  });
  useEffect(() => {
    debounceSearch(formik.values.email);
  }, [formik.values.email]);
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
        {!submit &&
          (Object.keys(formik.touched).length === 0 ? (
            <Button color='blue' type='submit' width='100%'>
              Зарегистрироваться
            </Button>
          ) : Object.keys(formik.errors).length !== 0 ? (
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
