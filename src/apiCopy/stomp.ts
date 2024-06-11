import { Client, Message } from '@stomp/stompjs';

import { decodeJWT } from '../utils/helpers';

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
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    onConnect: (frame) => {
      console.log('connected');
      client.subscribe(`/user/${userId}/push`, (message) => {
        const notification = JSON.parse(message.body);
        console.log(notification);
      });
      if (orgId !== 0) {
        client.subscribe(`/org/${orgId}/push`, (message) => {
          const notification = JSON.parse(message.body);
          console.log(notification);
        });
      }
    },
  });

  return client;
};
