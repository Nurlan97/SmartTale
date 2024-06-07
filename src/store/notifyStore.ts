import { makeAutoObservable } from 'mobx';

import { IMessage } from '../api/interfaces-ws';
import stompClient from '../api/ws';
import { INotify } from '../components/Notify/Notify';
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
  constructor() {
    makeAutoObservable(this);
  }
  connect = () => {
    if (userStore.accessToken) {
      stompClient.connect(
        { Authorization: `Bearer ${userStore.accessToken}` },
        (frame) => {
          const decodedToken = JSON.parse(atob(userStore.accessToken.split('.')[1]));
          const userId = decodedToken.userId;
          const orgId = decodedToken.orgId;

          stompClient.subscribe(`/user/${userId}/push`, (message) => {
            const notification = JSON.parse(message.body);
            console.log(notification);
          });
          if (orgId > 0) {
            stompClient.subscribe(`/org/${orgId}/push`, (message) => {
              const notification = JSON.parse(message.body);
              console.log(notification);
            });
          }
        },
      );
    }
  };

  markAsRead = (id: number) => {
    const index = this.notifications.findIndex((item) => item.id === id);
    this.notifications[index].readed = true;
  };
}

export default new notifyStore();
