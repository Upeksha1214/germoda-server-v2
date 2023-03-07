import IChatMessage from './chat-message.interface';
import IMeetingParticipant from './meeting-participant.interface';

export interface IMeeting {
  meetingId: string;
  meetingTitle: string;
  startTime: Date | string;
  endTime: Date | string;
  participants: Set<IMeetingParticipant>;
  messagesHistory: IChatMessage[];
  hostCamOn: boolean;
}
