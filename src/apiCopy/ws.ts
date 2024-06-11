// import SockJS from 'sockjs-client';
import sockjs from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';

const ws = new sockjs('https://smart-tale-production.up.railway.app/ws');

const stompClient = Stomp.over(ws);

export default stompClient;
