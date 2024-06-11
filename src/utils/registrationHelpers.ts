import * as Yup from 'yup';

export const initialValues = {
  lastName: '',
  firstName: '',
  middleName: '',
  email: '',
  phoneNumber: '',
};

export interface ISubmitTypes {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
}

export const RegistrationSchema = Yup.object().shape({
  lastName: Yup.string().required('Обязательное поле для заполнения'),
  firstName: Yup.string().required('Обязательное поле для заполнения'),
  middleName: Yup.string().required('Обязательное поле для заполнения'),
  email: Yup.string()
    .email('Неправильный формат email адреса')
    .required('Обязательное поле для заполнения'),
  phoneNumber: Yup.string().required('Обязательное поле для заполнения'),
});

export const formData = [
  {
    htmlFor: 'email',
    label: 'Email*',
    placeholder: 'Введите email',
    id: 'email',
    stage: 1,
  },
  {
    htmlFor: 'lastName',
    label: 'Фамилия*',
    placeholder: 'Введите фамилию',
    id: 'lastName',
    stage: 2,
  },
  {
    htmlFor: 'firstName',
    label: 'Имя*',
    placeholder: 'Введите имя',
    id: 'firstName',
    stage: 2,
  },
  {
    htmlFor: 'middleName',
    label: 'Отчество*',
    placeholder: 'Введите отчество',
    id: 'middleName',
    stage: 2,
  },
  {
    htmlFor: 'phoneNumber',
    label: 'Телефон*',
    placeholder: 'Введите номер телефона',
    id: 'phoneNumber',
    stage: 1,
  },
];
