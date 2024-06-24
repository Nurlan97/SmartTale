import * as Yup from 'yup';

export const titleSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Требуется заполнить название, минимум 5 симовлов')
    .max(250, 'Требуется заполнить название, максимум 250 символов')
    .required('Требуется заполнить название, от 5 до 250 символов'),
});
export const descriptionSchema = Yup.object().shape({
  description: Yup.string()
    .min(5, 'Требуется заполнить описание, миниуму 5 символов')
    .max(1000, 'Требуется заполнить описание, максимум 1000 символов')
    .required('Требуется заполнить описание, от 5 до 1000 символов'),
});
export const quantitySchema = Yup.object().shape({
  quantity: Yup.number().min(1, 'Укажите количество'),
});

export const deadlineSchema = Yup.object().shape({
  deadline: Yup.date().min(
    new Date(Date.now() + 1000 * 60 * 60 * 24),
    'Срок выполнения должен быть минимум на 1 день дальше текущего дня',
  ),
});
export const applicationDeadlineSchema = Yup.object().shape({
  applicationDeadline: Yup.date().min(
    new Date(Date.now() + 1000 * 60 * 60 * 24),
    'Срок выполнения должен быть минимум на 1 день дальше текущего дня',
  ),
});
export const fullNameSchema = Yup.object().shape({
  lastName: Yup.string().required('Обязательное поле для заполнения'),
  firstName: Yup.string().required('Обязательное поле для заполнения'),
  middleName: Yup.string().required('Обязательное поле для заполнения'),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required('Обязательное поле для заполнения')
    .email('Неправильный формат email адреса'),
});
export const phoneNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Обязательное поле для заполнения'),
});
export const positionSchema = Yup.object().shape({
  positionId: Yup.number().min(0, 'Выберите должность'),
});

export const locationSchema = Yup.object().shape({
  location: Yup.string().required('Заполните регион'),
});
