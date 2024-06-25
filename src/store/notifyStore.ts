import { Client } from '@stomp/stompjs';
import { makeAutoObservable, runInAction } from 'mobx';

import { IMessageOrg, IMessageUser, Messages } from '../api/interfaces-ws';
import { createClient, sendMessage } from '../api/stomp';
import { isTokenExpired } from '../utils/helpers';
import userStore from './userStore';

class notifyStore {
  notifications: Array<IMessageOrg | IMessageUser> = [];
  client: Client | undefined = undefined;
  hasNext = false;
  isLoading = false;
  page = 0;
  size = 8;
  unreadedCount = 0;
  constructor() {
    makeAutoObservable(this);
  }
  connect = () => {
    if (!isTokenExpired(userStore.accessToken) && !this.client) {
      this.client = createClient(userStore.accessToken);
      this.client.activate();
    }
  };
  getHistory = () => {
    if (this.isLoading || !this.hasNext) return;
    console.log('getHistory');
    if (this.client) {
      this.isLoading = true;
      sendMessage(
        this.client,
        {
          userId: userStore.userId,
          organizationId: userStore.orgId ? userStore.orgId : 0,
          page: this.page,
          size: this.size,
        },
        '/app/notifications/history',
      );
    }
  };
  stopLoading = () => {
    this.isLoading = false;
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
    return !!this.unreadedCount || this.notifications.some((item) => !item.read);
  }
}

export default new notifyStore();
