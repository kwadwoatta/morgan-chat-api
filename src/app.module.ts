import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { NoteModule } from './note/note.module';
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
    NoteModule,
    RouterModule.register([
      {
        path: 'notes',
        module: NoteModule,

        children: [
          {
            path: 'notes/:noteId/documents',
            module: DocumentModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
