import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { PgClientModule } from './pgclient/pgclient.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    DocumentModule,
    DrizzleModule,
    PgClientModule,
  ],
})
export class AppModule {}
