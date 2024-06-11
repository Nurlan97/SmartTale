import { Client } from '@stomp/stompjs';
import { makeAutoObservable, runInAction } from 'mobx';

import { IMessage } from '../api/interfaces-ws';
import { createClient } from '../api/stomp';
import { INotify } from '../components/Notify/Notify';
import { isTokenExpired } from '../utils/helpers';
import userStore from './userStore';

const defaultData: INotify[] = [
  {
    id: 1,
    type: 'accept',
    readed: true,
    first: 'Пошив юбок',
    second: 'Назгул',
    time: 'Вчера, 10 утра',
  },
  {
    id: 2,
    type: 'advice',
    readed: true,
    first: 'Пошив юбок',
    second: 'Назгул',
    time: 'Вчера, 10 утра',
  },
  {
    id: 3,
    type: 'status',
    readed: false,
    first: 'Пошив юбок',
    second: 'Назгул',
    time: 'Вчера, 10 утра',
  },
];
class notifyStore {
  notifications: INotify[] = defaultData;
  client: Client | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  connect = () => {
    console.log('notifystore connect');
    if (!isTokenExpired(userStore.accessToken)) {
      this.client = createClient(userStore.accessToken);
      // this.client.beforeConnect = () => {
      //   if (this.client) {
      //     this.client.connectHeaders = {
      //       Authorization: `Bearer ${userStore.accessToken}`,
      //     };
      //   }
      // };
      this.client.activate();
    }
  };
  markAsRead = (id: number) => {
    const index = this.notifications.findIndex((item) => item.id === id);
    this.notifications[index].readed = true;
  };
}

export default new notifyStore();
