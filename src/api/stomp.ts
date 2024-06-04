import { Client, Message } from '@stomp/stompjs';

import { userStore } from '../store';

const client = new Client({
  brokerURL: 'https://smart-tale-production.up.railway.app/ws',
  connectHeaders: {
    Authorization: `Bearer ${userStore.accessToken}`,
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
export default client;
