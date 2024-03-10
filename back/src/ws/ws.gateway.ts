import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WSGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  events() {
    return 1;
  }
}
