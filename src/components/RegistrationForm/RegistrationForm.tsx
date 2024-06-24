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
    userStore.fetchAvailablePhone(search).then((data) => {
      if (!data) formik.setFieldError('phoneNumber', 'Указанный вами номер занят');
    });
  });

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
        children: 'Зарегистрироваться',
      };

  useEffect(() => {
    debounceEmailSearch(formik.values.email);
  }, [formik.values.email]);
  useEffect(() => {
    debouncePhoneSearch(formik.values.phoneNumber);
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
