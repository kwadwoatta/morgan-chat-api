export interface QueueEmbedJob {
  file: Express.Multer.File;
  userId: string;
  notebookId: string;
  documentId: string;
}
