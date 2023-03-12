import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(
      '🚀 ~ file: socket.gateway.ts:23 ~ SocketGateway ~ identity ~ data:',
      data,
    );
    return data;
  }

  @SubscribeMessage('throw-exception')
  throwException(): void {
    throw new WsException('Intentionally throw exception.');
  }

  @SubscribeMessage('progress')
  handleEvent(@MessageBody() data: unknown): WsResponse<unknown> {
    const event = 'events';
    return { event, data };
  }

  @SubscribeMessage('progress-bar')
  async progressBar(client: Socket, data: string): Promise<void> {
    let beginProcess = 0;
    const intervalId = setInterval(() => {
      client.emit('progress-bar', beginProcess);
      beginProcess += 20;
      if (beginProcess === 100) clearInterval(intervalId);
    }, 1000);
  }
}
