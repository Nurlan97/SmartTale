import * as Yup from 'yup';

export const initialValues = {
  email: '',
};

export interface ISubmitTypes {
  email: string;
}

export const AuthorizationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Обязательное поле для заполнения')
    .email('Неправильный формат email адреса'),
});

export const formData = [
  {
    htmlFor: 'email',
    label: 'Почта*',
    placeholder: 'Введите email',
    id: 'email',
  },
];
