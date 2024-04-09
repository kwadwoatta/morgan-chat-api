import { IsUUID } from 'class-validator';

export class NotebookIdParam {
  @IsUUID()
  notebookId: string;
}
