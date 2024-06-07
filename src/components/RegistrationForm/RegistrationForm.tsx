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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleNextStage = () => {
    if (isContactDataFilled(formik.values)) {
      userStore.authenticationStage = 2;
    } else {
      formik.setFieldError('email', 'Обязательное поле для заполнения!');
      formik.setFieldError('phoneNumber', 'Обязательное поле для заполнения!');
    }
  };
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

    setIsSubmitting(true);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: RegistrationSchema,
  });

  console.log(formik.touched);
  console.log(formik.errors);
  const debounceEmailSearch = useDebounce((search: string) => {
    if (search === '') return;

    if (formik.errors.email !== 'Неправильный формат email адреса') {
      userStore.fetchAvailableEmail(search).then((data) => {
        if (!data) formik.setFieldError('email', 'Данный email занят');
      });
    }
  });

  const debouncePhoneSearch = useDebounce((search: string) => {
    if (search === '') return;
    // if (
    //   !formik.errors.phoneNumber ||
    //   formik.errors.phoneNumber === 'Указанный вами номер занят'
    // ) {
    userStore.fetchAvailablePhone(search).then((data) => {
      if (!data) formik.setFieldError('phoneNumber', 'Указанный вами номер занят');
    });
    // }
  });

  // const isFormEmpty = Object.keys(formik.touched).length === 0;
  const hasErrors = Object.keys(formik.errors).length !== 0;
  const isContactDataFilled = (values: typeof initialValues) => {
    return values.email !== '' && values.phoneNumber !== '';
  };

  interface ButtonProps {
    color: 'blue' | 'white' | 'red' | 'orange' | 'whiteWithoutBorder';
    type: 'submit' | 'button';
    width: string;
    disabled: boolean;
    children: React.ReactNode;
  }
  const buttonProps: ButtonProps = isSubmitting
    ? {
        color: 'blue',
        type: 'submit',
        width: '100%',
        disabled: hasErrors,
        children: (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}>Ожидаем...</div>
          </div>
        ),
      }
    : {
        color: hasErrors ? 'white' : 'blue',
        type: 'submit',
        width: '100%',
        disabled: hasErrors,
        // children: isFormEmpty
        //   ? 'Зарегистрироваться'
        //   : hasErrors
        //     ? 'Зарегистрироваться'
        //     : 'Зарегистрироваться',
        children: 'Зарегистрироваться',
      };

  useEffect(() => {
    debounceEmailSearch(formik.values.email);
    // if (formik.values.phoneNumber) debouncePhoneSearch(formik.values.phoneNumber);
    // if (formik.values.email) console.log('Email request');
    // if (formik.values.phoneNumber) console.log('Phone request');
  }, [formik.values.email]);
  useEffect(() => {
    debouncePhoneSearch(formik.values.phoneNumber);
    // if (formik.values.phoneNumber) debouncePhoneSearch(formik.values.phoneNumber);
    // if (formik.values.phoneNumber) console.log('Phone request');
  }, [formik.values.phoneNumber]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {formData.map((data, index) => {
          if (userStore.authenticationStage === data.stage) {
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
          }
        })}
        {userStore.authenticationStage === 2 && (
          <Checkbox checked={userStore.isRemember} onClick={userStore.toggleRemember} />
        )}
        {/* {!isSubmitting &&
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
        {isSubmitting && (
          <Button color='blue' type='submit' width='100%' disabled={isSubmitting}>
            <div className={styles.loaderWrapper}>
              <div className={styles.loader}>Ожидаем...</div>
            </div>
          </Button>
        )} */}

        {userStore.authenticationStage === 1 && (
          <Button color='blue' type='button' width='100%' handler={handleNextStage}>
            Продолжить
          </Button>
        )}
        {userStore.authenticationStage === 2 && (
          <Button
            color={buttonProps.color}
            type={buttonProps.type}
            width={buttonProps.width}
            disabled={isSubmitting}
          >
            Зарегистрироваться
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
