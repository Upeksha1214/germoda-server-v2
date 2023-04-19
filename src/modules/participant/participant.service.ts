import { Injectable } from '@nestjs/common';
import MeetingParticipant from '../../interfaces/meeting-participant.interface';
import CreateNewParticipantRequestDTO from './dto/CreateNewParticipantRequestDTO';

@Injectable()
export class ParticipantsService {
  getMeetingParticipant(participantId: string): MeetingParticipant {
    return null;
  }

  createMeetingParticipant(
    createParticipantRequest: CreateNewParticipantRequestDTO,
  ): MeetingParticipant {
    return null;
  }
}
