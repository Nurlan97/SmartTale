import * as Yup from 'yup';

export const titleSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Минимум 5 символов названия')
    .max(1000, 'Не более 1000 символов названия')
    .required('Требуется заполнить название'),
});
export const descriptionSchema = Yup.object().shape({
  description: Yup.string()
    .min(5, 'Минимум 5 символов описания')
    .max(1000, 'Не более 1000 символов описания')
    .required('Требуется заполнить описание'),
});
export const dateSchema = Yup.object().shape({
  deadline: Yup.date().min(
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
  phoneNumber: Yup.string()
    .required('Обязательное поле для заполнения')
    .email('Неправильный формат email адреса'),
});
export const positionSchema = Yup.object().shape({
  positionId: Yup.number().test(
    'selectTest',
    'Выберите должность',
    (value) => value !== -1,
  ),
});
