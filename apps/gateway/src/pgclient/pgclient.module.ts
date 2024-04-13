import { Global, Module } from '@nestjs/common';
import { PgClientProvider } from './pgclient.provider';
import { PgClientService } from './pgclient.service';

@Global()
@Module({
  providers: [PgClientProvider, PgClientService],
  exports: [PgClientService],
})
export class PgClientModule {}
