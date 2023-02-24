import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { FRONTEND_ENDPOINT } from 'src/constants/urls';
import {
  WsJwtGuard,
  WsJwtGuardAdminAndStudent,
  WsJwtGuardStudent,
} from '../auth/auth-jwt.strategy';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', FRONTEND_ENDPOINT],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @WebSocketServer() server;
  users = 0;
  async handleConnection() {
    // A client has connected
    this.users++;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }

  meetingsList = {};

  @UseGuards(WsJwtGuardAdminAndStudent)
  @SubscribeMessage('client-send-message-to-server')
  async onChat(client, message) {
    const { meetingName, senderName, messageBody } = message;
    if (this.meetingsList[meetingName]) {
      this.meetingsList[meetingName].messagesHistory.push({
        senderName,
        messageBody,
      });
      console.log(this.meetingsList);
      this.server.emit('server-send-messages-to-clients', message);
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('end-meeting')
  async onEndMeeting(client, message) {
    // TODO: delete meeting chat
    this.server.emit('server-send-end-meeting-message-to-clients', message);
  }

  @UseGuards(WsJwtGuardAdminAndStudent)
  @SubscribeMessage('client-connected-to-meeting')
  async onClientConnectToMeeting(client, message) {
    const { clientId, meetingRoomName } = message;
    console.log('A new client joined the meeting ' + meetingRoomName);

    if (!this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName] = {
        participants: new Set(),
        messagesHistory: [],
      };
    }

    this.meetingsList[meetingRoomName].participants.add(clientId);

    this.server.emit('server-emit-new-client-joined', {
      newClientUUID: clientId,
    });

    client.emit('server-ack-client-joining', {
      messageHistory: this.meetingsList[meetingRoomName].messagesHistory,
    });
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('host-started-meeting')
  async onHostStartMeeting(client, message) {
    // get meeting name
    const { title, meetingId, hostPeerId } = message;

    console.log(meetingId + ' started');

    this.meetingsList[meetingId] = {
      title,
      hostPeerId,
      participants: new Set(),
      messagesHistory: [],
    };
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('host-turned-on-camera')
  async onHostCamOn(client, meeting) {
    const { hostPeerId, meetingRoomName } = meeting;

    if (this.meetingsList && this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName]['hostCamOn'] = true;
      client.emit('server-sent-host-peerId-others', {
        hostPeerId,
        clientIds: Array.from(this.meetingsList[meetingRoomName].participants),
      });
    }
  }

  @UseGuards(WsJwtGuardStudent)
  @SubscribeMessage('student-turned-on-camera')
  async onClientStartCam(client, message) {
    const { hostPeerId, meetingRoomName } = message;

    if (
      this.meetingsList &&
      this.meetingsList[meetingRoomName] &&
      !this.meetingsList[meetingRoomName].hostCamOn
    ) {
      console.log('student wants to turn on stream');
    }
  }

  @UseGuards(WsJwtGuardStudent)
  @SubscribeMessage('student-joined-meeting')
  async onStudentJoinMeeting(client, message) {
    const { studentPeerId, meetingId } = message;
    console.log('A new student joined the meeting ' + meetingId);
    if (this.meetingsList[meetingId]) {
      this.meetingsList[meetingId].participants.add(studentPeerId);
    }

    this.server.emit('server-emit-new-client-joined', {
      newClientUUID: studentPeerId,
    });
  }
}
