import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number.parseInt(process.env.REDIS_PORT),
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 1,
      },
    }),
  ],
})
export class AppModule {}
