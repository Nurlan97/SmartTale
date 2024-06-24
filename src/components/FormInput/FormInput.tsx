import { FormikProps } from 'formik';
import { useEffect, useState } from 'react';

import Input from '../../UI/Input/Input';
import styles from './FormInput.module.scss';

type FormType = {
  htmlFor: string;
  label: string;
  placeholder: string;
  id: string;
  formik: FormikProps<any>;
};

const FormInput = ({ htmlFor, label, placeholder, id, formik }: FormType) => {
  const error = formik.errors[htmlFor] ? formik.errors[htmlFor] : '';
  const isTouched = !!formik.touched[htmlFor];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (htmlFor === 'phoneNumber') {
      const regex = new RegExp(/^\+?[0-9]*$/);
      if (!regex.test(e.target.value)) return;
    }
    formik.setFieldValue(htmlFor, e.target.value, false);
  };
  return (
    <div>
      <label htmlFor={htmlFor} className={styles.lastName}>
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={formik.values[htmlFor]}
        onChange={handleInputChange}
        border={true}
        id={id}
        isError={!!error && isTouched}
        onBlur={formik.handleBlur}
      />
      <p className={styles.errors}>{`${!!error && isTouched ? error : ''}`}</p>
    </div>
  );
};

export default FormInput;
