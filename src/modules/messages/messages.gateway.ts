import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { FRONTEND_ENDPOINT } from 'src/constants/urls';
import { WsJwtGuard } from '../auth/auth-jwt.strategy';

@UseGuards(WsJwtGuard)
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

  @SubscribeMessage('client-send-message-to-server')
  async onChat(client, message) {
    const { meetingName, senderName, messageBody } = message;
    if (this.meetingsList[meetingName]) {
      this.meetingsList[meetingName].messagesHistory.push({
        senderName,
        messageBody,
      });
      this.server.emit('server-send-messages-to-clients', message);
    }
  }

  @SubscribeMessage('end-meeting')
  async onEndMeeting(client, message) {
    // TODO: delete meeting chat
    this.server.emit('server-send-end-meeting-message-to-clients', message);
  }

  @SubscribeMessage('client-connected-to-meeting')
  async onClientConnectToMeeting(client, message) {
    const { clientId, meetingRoomName } = message;
    console.log('A new client joined the meeting ' + meetingRoomName);

    if (!this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName] = {
        participants: [],
        messagesHistory: [],
      };
    }

    this.meetingsList[meetingRoomName].participants.push(clientId);

    this.server.emit('server-emit-new-client-joined', {
      newClientUUID: clientId,
    });
  }

  @SubscribeMessage('host-started-meeting')
  async onHostStartMeeting(client, message) {
    // verify host is an admin

    // get meeting name
    const { title, meetingId } = message;

    console.log(meetingId + ' started');

    this.meetingsList[meetingId] = {
      title,
      participants: [],
      messagesHistory: [],
    };
  }

  @SubscribeMessage('host-turned-on-camera')
  async onHostCamOn(client, meeting) {
    const { hostPeerId, meetingRoomName } = meeting;

    if (this.meetingsList && this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName]['hostCamOn'] = true;
      client.emit('server-sent-host-peerId-others', {
        hostPeerId,
        clientIds: this.meetingsList[meetingRoomName].participants,
      });
    }
  }

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
}
