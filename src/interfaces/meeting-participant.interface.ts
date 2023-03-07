export default interface IMeetingParticipant {
  name?: string;
  meetingId: string;
  settings?: {
    video: boolean;
    mic: boolean;
    allowedVideo: boolean;
  };
  peerId: string;
}
