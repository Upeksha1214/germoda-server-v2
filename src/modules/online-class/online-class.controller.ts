import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OnlineClassService } from './online-class.service';
import { CreateOnlineClassDto } from './dto/create-online-class.dto';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';

@Controller('api/online-class')
export class OnlineClassController {
  constructor(private readonly onlineClassService: OnlineClassService) {}

  @Post()
  create(@Body() createOnlineClassDto: CreateOnlineClassDto) {
    return this.onlineClassService.create(createOnlineClassDto);
  }

  @Get()
  findAll() {
    return this.onlineClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineClassService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOnlineClassDto: UpdateOnlineClassDto,
  ) {
    return this.onlineClassService.update(id, updateOnlineClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineClassService.remove(id);
  }
}
