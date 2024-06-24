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
  const isError = formik.errors[htmlFor] ? formik.errors[htmlFor] : '';
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (htmlFor === 'phoneNumber') {
      const regex = new RegExp(/^\+?[0-9]*$/);
      if (!regex.test(e.target.value)) return;
    }
    formik.setFieldValue(htmlFor, e.target.value);
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
        isError={!!isError && !!formik.touched[htmlFor]}
        onBlur={formik.handleBlur}
      />
      <p className={styles.errors}>
        {`${!!isError && !!formik.touched[htmlFor] ? isError : ''}`}
      </p>
    </div>
  );
};

export default FormInput;
