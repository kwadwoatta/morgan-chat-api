import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { NotebookModule } from './notebook/notebook.module';
import { PgClientModule } from './pgclient/pgclient.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    DrizzleModule,
    PgClientModule,
    UploadModule,
    DocumentModule,
    NotebookModule,
    RouterModule.register([
      {
        path: 'notebooks',
        module: NotebookModule,

        children: [
          {
            path: 'notebooks/:notebookId/documents',
            module: DocumentModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
