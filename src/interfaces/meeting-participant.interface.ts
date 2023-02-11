export default interface MeetingParticipant {
  name: string;
  meetingId: string;
  settings: {
    muted: boolean;
    cameraOff: boolean;
  };
}
