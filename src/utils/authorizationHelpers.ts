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

export enum Authorities {
  CREATE_ORDER = 1,
  CREATE_POSITION = 2,
  UPDATE_POSITION = 4,
  INVITE_EMPLOYEE = 8,
  ASSIGN_EMPLOYEES = 16,
  UPDATE_STATUS_TO_CHECKING = 32,
  UPDATE_STATUS_FROM_CHECKING = 64,
  DELETE_ORDER = 128,
  DELETE_EMPLOYEE = 256,
  DELETE_POSITION = 512,
}
export type Roles = keyof typeof Authorities;
export function getRolesFromMask(authorities: number): Roles[] {
  const roles: Roles[] = [];
  for (const authority in Authorities) {
    const key = Authorities[authority];
    if (Number(authority) & authorities) {
      roles.push(key as Roles);
    }
  }
  return roles;
}
