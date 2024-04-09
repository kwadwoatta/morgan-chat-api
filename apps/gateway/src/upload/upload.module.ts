import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: Number.parseInt(process.env.UPLOAD_RATE_TTL),
        limit: Number.parseInt(process.env.UPLOAD_RATE_LIMIT),
      },
    ]),
  ],
  providers: [UploadService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  controllers: [UploadController],
})
export class UploadModule {}
