import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';

import { useDebounce } from '../../hooks/useDebounce';
import { userStore } from '../../store';
import Input from '../../UI/Input/Input';
import styles from './FormInput.module.scss';

type FormType = {
  htmlFor: string;
  label: string;
  placeholder: string;
  id: string;
  formik: FormikProps<any>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormInput = observer(
  ({ htmlFor, label, placeholder, id, formik, setError }: FormType) => {
    const isError = !!formik.errors[htmlFor];
    const [availableEmail, setAvailableEmail] = useState<boolean | undefined>(undefined);
    const [touched, setTouched] = useState(false);

    const debounceSearch = useDebounce((search: string) => {
      if (search === '') return;
      if (search.includes('@' && '.com')) {
        userStore.fetchAvailableEmail(search).then((data) => {
          setAvailableEmail(data);
        });
      }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (htmlFor === 'phoneNumber') {
        const regex = new RegExp(/^\+?[0-9]*$/);
        if (!regex.test(e.target.value)) return;
      }
      formik.setFieldValue(htmlFor, e.target.value);
      if (htmlFor === 'email') {
        debounceSearch(e.target.value);
      }
      if (!formik.touched[htmlFor]) {
        setTouched(true);
      }
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
          isError={isError}
        />
        <p className={styles.errors}>
          {isError && touched ? formik.errors[htmlFor] : ' '}
          {isError && setError(true)}
          {!isError && setError(false)}
          {htmlFor === 'email' &&
            availableEmail !== undefined &&
            (availableEmail ? '' : 'Данный email занят другим пользователем!')}
        </p>
      </div>
    );
  },
);

export default FormInput;
