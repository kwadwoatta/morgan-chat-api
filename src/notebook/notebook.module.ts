import { Module } from '@nestjs/common';
import { NotebookController } from './notebook.controller';
import { NotebookService } from './notebook.service';

@Module({
  providers: [NotebookService],
  controllers: [NotebookController],
})
export class NoteModule {}
