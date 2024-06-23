import { Client } from '@stomp/stompjs';
import { makeAutoObservable, runInAction } from 'mobx';

import { IMessageOrg, IMessageUser, Messages } from '../api/interfaces-ws';
import { createClient, sendMessage } from '../api/stomp';
import { isTokenExpired } from '../utils/helpers';
import userStore from './userStore';

class notifyStore {
  notifications: Array<IMessageOrg | IMessageUser> = [];
  client: Client | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
  }
  connect = () => {
    if (!isTokenExpired(userStore.accessToken) && !this.client) {
      this.client = createClient(userStore.accessToken);
      this.client.activate();
    }
  };
  addNotify = (notify: IMessageOrg | IMessageUser) => {
    if (
      this.notifications.findIndex(
        (message) => message.notificationId === notify.notificationId,
      ) !== -1
    )
      return;
    this.notifications.push(notify);
  };
  markAsRead = (id: number) => {
    if (this.client) {
      sendMessage(this.client, String(id), '/app/notifications/markAsRead');
      runInAction(() => {
        const index = this.notifications.findIndex((item) => item.notificationId === id);
        if (index !== -1) {
          this.notifications[index].read = true;
        }
      });
    }
  };
  markAllReaded = () => {
    this.notifications.forEach((item) => {
      if (item.read === false) {
        this.markAsRead(item.notificationId);
        item.read = true;
      }
    });
  };
  get hasUnreaded() {
    return this.notifications.some((item) => !item.read);
  }
}

export default new notifyStore();
