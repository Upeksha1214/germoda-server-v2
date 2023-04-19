import { CacheModule, Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [CacheModule.register()],
  providers: [MessagesGateway],
})
export class MessagesModule {}
