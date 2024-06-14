import { Client } from '@stomp/stompjs';

import { notifyStore, userStore } from '../store';
import { decodeJWT } from '../utils/helpers';
import { IMessageOrg, IMessageUser } from './interfaces-ws';

export const createClient = (token: string) => {
  const decodedToken = decodeJWT(token);
  const userId = decodedToken.userId;
  const orgId = decodedToken.orgId;
  const client = new Client({
    brokerURL: 'https://smart-tale-production.up.railway.app/ws',
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 20000,

    onConnect: (frame) => {
      console.log('connected');
      client.subscribe(`/user/${userId}/push`, (message) => {
        const notification: IMessageUser = JSON.parse(message.body);
        notifyStore.addNotify(notification);
      });
      if (orgId !== 0) {
        client.subscribe(`/org/${orgId}/push`, (message) => {
          const notification: IMessageOrg = JSON.parse(message.body);
          notifyStore.addNotify(notification);
        });
      }
    },
    onDisconnect: (frame) => {
      client.connectHeaders = { Authorization: `Bearer ${userStore.getToken}` };
    },
  });

  return client;
};
