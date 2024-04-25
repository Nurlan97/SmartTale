import * as Yup from 'yup';

export const initialValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
};

export interface ISubmitTypes {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
}

export const RegistrationSchema = Yup.object().shape({
  lastName: Yup.string().required('Обязательное поле для заполнения'),
  name: Yup.string().required('Обязательное поле для заполнения'),
  middleName: Yup.string().required('Обязательное поле для заполнения'),
  email: Yup.string()
    .required('Обязательное поле для заполнения')
    .email('Неправильный формат email адреса'),
});

export const formData = [
  {
    htmlFor: 'lastName',
    label: 'Фамилия*',
    placeholder: 'Введите фамилию',
    id: 'lastName',
  },
  {
    htmlFor: 'name',
    label: 'Имя*',
    placeholder: 'Введите имя',
    id: 'name',
  },
  {
    htmlFor: 'middleName',
    label: 'Отчество*',
    placeholder: 'Введите отчество',
    id: 'middleName',
  },
  {
    htmlFor: 'email',
    label: 'Email*',
    placeholder: 'Введите email',
    id: 'email',
  },
];
