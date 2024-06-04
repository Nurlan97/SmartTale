interface IRequest {
  sub: 'Запрос о принятии заказа';
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
  sub: 'Приглашение в организацию';
  orgId: string;
  orgName: string;
  logo: string;
  invId: string;
}
interface IConfirm {
  sub: 'Подтвержден заказ';
  orderId: string;
  title: string;
  key: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  timestamp: string;
}

interface IStatus {
  sub: 'Статус заказа обновлен';
  employeeId: string; // belongs to whom made update
  employeeName: string;
  employeeAvatar: string;
  taskId: string;
  key: string;
  title: string;
  oldStatus: 'NEW';
  newStatus: 'IN_PROGRESS';
}
interface ISuspend {
  sub: 'Вас отстранили от заказа';
  orderId: string;
  title: string;
  key: string;
  image: string;
  status: 'CHECKING';
}
interface IOrderAppoint {
  sub: 'Вас назначили на заказ';
  orderId: string;
  title: string;
  key: string;
  image: string;
  status: 'CHECKING';
}

interface IRolesUpdatePersonal {
  sub: 'Ваша должность обновлена';
  posId: string;
  title: string;
}
interface IRolesUpdateOrganization {
  sub: 'Должность была обновлена';
  posId: string;
  title: string;
}
interface IRoleAdded {
  sub: 'Вы назначены на новую должность';
  posId: string;
  title: string;
  email: string; // ignore this property
}
export interface IMessage {
  notificationId: number;
  recipientId: number;
  recipientType: string;
  data:
    | IRequest
    | IInvite
    | IConfirm
    | IStatus
    | ISuspend
    | IOrderAppoint
    | IRolesUpdatePersonal
    | IRolesUpdateOrganization
    | IRoleAdded;
  timestamp: string;
  read: boolean;
  sent: boolean;
}
interface IHistory {
  content: IMessage[];
  hasNext: boolean;
}
