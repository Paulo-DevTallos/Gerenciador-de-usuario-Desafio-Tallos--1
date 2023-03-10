import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway(3005, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  //create messages
  @SubscribeMessage('createChat')
  async create(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.create(createChatDto, client.id);

    this.server.emit('message', message);

    return message;
  }

  //find all messages
  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  //join user room
  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    const enterUser = this.chatService.identify(name, client.id);

    console.log(client.id);
    this.server.emit('join-room', enterUser);
    client.broadcast.emit('joined-room', enterUser);

    return enterUser;
  }

  @SubscribeMessage('leave-room')
  leavingRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    const outterRoom = this.chatService.leaveRoom(name, client.id);
    console.log(outterRoom);
  }
  /*@SubscribeMessage('leave-room')
  leavingRoom(room: string, client: Socket) {
    console.log('usuario esta deixando a sala', room);
    client.emit('left-room', room);
  }*/
}
