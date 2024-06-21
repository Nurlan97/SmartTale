import { OrderDto } from './data-contracts';

export enum Messages {
  OrderRequest = 'Запрос о принятии заказа',
  UserInvite = 'Приглашение в организацию',
  OrderConfirm = 'Подтвержден заказ',
  OrderStatusUpdate = 'Статус заказа обновлен',
  OrderSuspend = 'Вас отстранили от заказа',
  OrderAppoint = 'Вас назначили на заказ',
  RolesUpdatePersonal = 'Ваша должность изменена',
  RolesUpdateOrganization = 'Должность изменена',
  RolesAppointOrganization = 'Вы назначены на новую должность',
}

interface IRequest {
  sub: Messages.OrderRequest; //Личные
  orgName: string;
  code: string;
  orderImg: string;
  orderId: string;
  logo: string;
  title: string;
  orgId: string;
}

interface IInvite {
  email: string;
  sub: Messages.UserInvite; //Личные
  orgId: string;
  orgName: string;
  logo: string;
  invId: string;
}
interface IConfirm {
  sub: Messages.OrderConfirm; //Организация
  orderId: string;
  title: string;
  key: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
}

interface IStatus {
  sub: Messages.OrderStatusUpdate; //Организация
  employeeId: string; // belongs to whom made update
  employeeName: string;
  employeeAvatar: string;
  taskId: string;
  key: string;
  title: string;
  oldStatus: OrderDto['status'];
  newStatus: OrderDto['status'];
}
interface ISuspend {
  sub: Messages.OrderSuspend; //Личные
  orderId: string;
  title: string;
  key: string;
  image: string;
  status: OrderDto['status'];
}
interface IOrderAppoint {
  sub: Messages.OrderAppoint; //Личные
  orderId: string;
  title: string;
  key: string;
  image: string;
  status: OrderDto['status'];
}

interface IRolesUpdatePersonal {
  sub: Messages.RolesUpdatePersonal; //Личные
  posId: string;
  title: string;
}
interface IRolesUpdateOrganization {
  sub: Messages.RolesUpdateOrganization; //Организация
  posId: string;
  title: string;
}
interface IRolesAppointOrganization {
  sub: Messages.RolesAppointOrganization; //Организация
  posId: string;
  title: string;
  email: string; // ignore this property
}

// interface IRequest {
//   sub: 'Запрос о принятии заказа'; //Личные
//   orgName: string;
//   code: string;
//   orderImg: string;
//   orderId: string;
//   logo: string;
//   title: string;
//   orgId: string;
// }

// interface IInvite {
//   email: string;
//   sub: 'Приглашение в организацию'; //Личные
//   orgId: string;
//   orgName: string;
//   logo: string;
//   invId: string;
// }
// interface IConfirm {
//   sub: 'Подтвержден заказ'; //Организация
//   orderId: string;
//   title: string;
//   key: string;
//   authorId: string;
//   authorName: string;
//   authorAvatar: string;
//   timestamp: string;
// }

// interface IStatus {
//   sub: 'Статус заказа обновлен'; //Организация
//   employeeId: string; // belongs to whom made update
//   employeeName: string;
//   employeeAvatar: string;
//   taskId: string;
//   key: string;
//   title: string;
//   oldStatus: 'NEW';
//   newStatus: 'IN_PROGRESS';
// }
// interface ISuspend {
//   sub: 'Вас отстранили от заказа'; //Личные
//   orderId: string;
//   title: string;
//   key: string;
//   image: string;
//   status: 'CHECKING';
// }
// interface IOrderAppoint {
//   sub: 'Вас назначили на заказ'; //Личные
//   orderId: string;
//   title: string;
//   key: string;
//   image: string;
//   status: 'CHECKING';
// }

// interface IRolesUpdatePersonal {
//   sub: 'Ваша должность обновлена'; //Личные
//   posId: string;
//   title: string;
// }
// interface IRolesUpdateOrganization {
//   sub: 'Должность была обновлена'; //Организация
//   posId: string;
//   title: string;
// }
// interface IRolesAppointOrganization {
//   sub: 'Вы назначены на новую должность'; //Организация
//   posId: string;
//   title: string;
//   email: string; // ignore this property
// }
export interface IMessageUser {
  notificationId: number;
  recipientId: number;
  recipientType: string;
  data: IRequest | IInvite | ISuspend | IOrderAppoint | IRolesUpdatePersonal;
  timestamp: string;
  read: boolean;
  sent: boolean;
}
export interface IMessageOrg {
  notificationId: number;
  recipientId: number;
  recipientType: string;
  data: IConfirm | IStatus | IRolesUpdateOrganization | IRolesAppointOrganization;
  timestamp: string;
  read: boolean;
  sent: boolean;
}
export interface IHistoryUser {
  content: IMessageUser[];
  hasNext: boolean;
}

export interface IHistoryOrg {
  content: IMessageOrg[];
  hasNext: boolean;
}
