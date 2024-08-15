import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserMessageRequest } from '@modules/user/interface/adapters/request/create-user-message.request';
import { CreateUserMessageCommand } from '@modules/user/application/commands/create-user-message.command';

@WebSocketGateway(3001, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private readonly commandBus: CommandBus) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: CreateUserMessageRequest): void {
    this.server.emit('message', message);

    this.commandBus
      .execute(
        new CreateUserMessageCommand({
          chatId: message.chatId,
          content: message.content,
          senderId: message.senderId,
          timestamp: message.timestamp,
        }),
      )
      .then();
  }
}
