import { FormikProps } from 'formik';

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
  const isError = formik.errors[htmlFor] ? formik.errors[htmlFor] : ' ';
  return (
    <div>
      <label htmlFor={htmlFor} className={styles.lastName}>
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={formik.values[htmlFor]}
        onChange={formik.handleChange}
        border={true}
        id={id}
        isError={!!isError}
      />
      <p className={styles.errors}>{`${isError}`}</p>
    </div>
  );
};

export default FormInput;
