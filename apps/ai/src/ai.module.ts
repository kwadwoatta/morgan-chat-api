import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { EmbeddingModule } from './embedding/embedding.module';

@Module({
  imports: [EmbeddingModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AiModule {}
