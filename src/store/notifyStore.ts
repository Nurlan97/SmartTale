import { Client } from '@stomp/stompjs';
import { makeAutoObservable, runInAction } from 'mobx';

import { IMessageOrg, IMessageUser, Messages } from '../api/interfaces-ws';
import { createClient } from '../api/stomp';
import { isTokenExpired } from '../utils/helpers';
import userStore from './userStore';

class notifyStore {
  notifications: Array<IMessageOrg | IMessageUser> = [
    // {
    //   notificationId: 2,
    //   recipientId: 2,
    //   recipientType: 'USER',
    //   data: {
    //     sub: Messages.OrderRequest,
    //     orgName: 'Org name',
    //     code: '?code=_oTye7GlgWRgO3pe0orqiA',
    //     orderImg: '',
    //     orderId: '4',
    //     logo: '',
    //     title: 'Postman Order',
    //     orgId: '1',
    //   },
    //   timestamp: '2024-05-26T09:45:00.306547Z',
    //   read: false,
    //   sent: true,
    // },
    // {
    //   notificationId: 2,
    //   recipientId: 2,
    //   recipientType: 'USER',
    //   data: {
    //     sub: Messages.OrderConfirm, //Организация
    //     orderId: '2',
    //     title: 'string',
    //     key: 'string',
    //     authorId: 'string',
    //     authorName: 'User',
    //     authorAvatar: '',
    //   },
    //   timestamp: '2024-06-12T09:45:00.306547Z',
    //   read: false,
    //   sent: true,
    // },
    // {
    //   notificationId: 2,
    //   recipientId: 2,
    //   recipientType: 'USER',
    //   data: {
    //     email: '',
    //     sub: Messages.UserInvite, //Личные
    //     orgId: '',
    //     orgName: 'CompanyName',
    //     logo: '',
    //     invId: '',
    //   },
    //   timestamp: '2024-06-10T09:45:00.306547Z',
    //   read: true,
    //   sent: true,
    // },
  ];
  client: Client | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  connect = () => {
    console.log('notifystore connect');
    if (!isTokenExpired(userStore.accessToken) && !this.client) {
      this.client = createClient(userStore.accessToken);
      this.client.activate();
    }
  };
  addNotify = (notify: IMessageOrg | IMessageUser) => {
    this.notifications.push(notify);
  };
  markAsRead = (id: number) => {
    // const index = this.notifications.findIndex((item) => item.id === id);
    // this.notifications[index].readed = true;
  };
  get hasUnreaded() {
    return this.notifications.some((item) => !item.read);
  }
}

export default new notifyStore();
