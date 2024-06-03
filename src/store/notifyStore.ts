import { makeAutoObservable } from 'mobx';

import { INotify } from '../components/Notify/Notify';

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
  markAsRead = (id: number) => {
    const index = this.notifications.findIndex((item) => item.id === id);
    this.notifications[index].readed = true;
  };
}

export default new notifyStore();
