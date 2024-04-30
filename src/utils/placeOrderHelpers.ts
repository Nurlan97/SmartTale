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
export const sizesSchema = Yup.object().shape({
  sizes: Yup.string()
    .min(5, 'В поле размеры необходимо использовать от 5 до 250 символов')
    .max(250, 'В поле размеры необходимо использовать от 5 до 250 символов'),
});

export const dateSchema = Yup.object().shape({
  deadline: Yup.date().min(
    new Date(Date.now() + 1000 * 60 * 60 * 24),
    'Срок выполнения должен быть минимум на 1 день дальше текущего дня',
  ),
});
