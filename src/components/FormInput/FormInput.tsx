import { FormikProps } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

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
};

const FormInput = observer(({ htmlFor, label, placeholder, id, formik }: FormType) => {
  const isError = !!formik.errors[htmlFor];
  // const [emailValue, setEmailValue] = useState('');
  // const emailValue = formik.values[htmlFor];
  // const debouncedValue = debounce(emailValue, 1000);
  // if (formik.values[htmlFor] === 'email') {
  //   userStore.fetchAvailableEmail(formik.values[htmlFor]);
  // }

  // const debouncedFetchAvailableEmail = debounce(userStore.fetchAvailableEmail, 1000);
  // const fetchAvailableEmail = userStore.fetchAvailableEmail(formik.values[htmlFor]);
  const [availableEmail, setAvailableEmail] = useState<boolean | undefined>(undefined);

  const debounceSearch = useDebounce((search: string) => {
    if (search === '') return;
    userStore.fetchAvailableEmail(search).then((data) => {
      setAvailableEmail(data);
    });
  });

  return (
    <div>
      <label htmlFor={htmlFor} className={styles.lastName}>
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={formik.values[htmlFor]}
        onChange={(e) => {
          if (htmlFor === 'phoneNumber') {
            const regex = new RegExp(/^[0-9]*$/);
            if (!regex.test(e.target.value)) return;
          }
          formik.setFieldValue(htmlFor, e.target.value);
          if (htmlFor === 'email') {
            debounceSearch(e.target.value);
            // debounce(userStore.fetchAvailableEmail(e.target.value), 1000);
          }
        }}
        border={true}
        id={id}
        isError={isError}
      />
      <p className={styles.errors}>
        {isError ? formik.errors[htmlFor] : ' '}
        {htmlFor === 'email' &&
          availableEmail !== undefined &&
          (availableEmail ? '' : 'Данный email занят другим пользователем!')}
      </p>
    </div>
  );
});

export default FormInput;
// function debounce(fetchAvailableEmail: Promise<void>, p0: number) {
//   throw new Error('Function not implemented.');
// }
// // eslint-disable-next-line @typescript-eslint/ban-types
// function debounce(func: Function, delay: number) {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }
