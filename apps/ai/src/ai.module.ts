import { Module } from '@nestjs/common';
import { EmbeddingModule } from './embedding/embedding.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [EmbeddingModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AiModule {}
