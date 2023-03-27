import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { BlockMongooseModule } from 'src/schemas/block.schema';

@Module({
  imports:[BlockMongooseModule],
  controllers: [BlocksController],
  providers: [BlocksService]
})
export class BlocksModule {}
