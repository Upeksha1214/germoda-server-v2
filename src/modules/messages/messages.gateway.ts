import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: true,
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
    this.server.emit('server-send-messages-to-clients', message);
  }

  @SubscribeMessage('end-meeting')
  async onEndMeeting(client, message) {
    // delete meeting chat
    this.server.emit('server-send-end-meeting-message-to-clients', message);
  }

  @SubscribeMessage('client-connected-to-meeting')
  async onClientConnectToMeeting(client, message) {
    console.log('A new client joined the meeting');
    const { clientId, meetingRoomName } = message;

    if (!this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName] = { participants: [] };
    }

    this.meetingsList[meetingRoomName].participants.push(clientId);

    this.server.emit('server-emit-new-client-joined', {
      newClientUUID: clientId,
    });
  }

  @SubscribeMessage('host-turned-on-camera')
  async onHostCamOn(client, meeting) {
    const { hostPeerId, meetingRoomName } = meeting;

    if (this.meetingsList && this.meetingsList[meetingRoomName]) {
      this.meetingsList[meetingRoomName]['hostCamOn'] = true;
      this.server.broadcast.emit('server-sent-host-peer-others', {
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
