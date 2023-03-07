import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateNewParticipantRequestDTO from './dto/CreateNewParticipantRequestDTO';
import { ParticipantsService } from './participant.service';

@Controller('participants')
export class PartipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Get(':id')
  getParticipantById(@Param('id') id: string) {
    return this.participantsService.getMeetingParticipant(id);
  }

  @Post()
  createParticipantForMeeting(
    @Body() createParticipantForMeetingDto: CreateNewParticipantRequestDTO,
  ) {
    return this.participantsService.createMeetingParticipant(
      createParticipantForMeetingDto,
    );
  }
}
