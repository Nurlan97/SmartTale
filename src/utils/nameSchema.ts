import * as Yup from 'yup';

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Минимум 5 символов названия')
    .max(1000, 'Не более 1000 символов названия')
    .required('Требуется заполнить название'),
});
