import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PgClientAsyncProvider } from './pgclient.provider';

@Injectable()
export class PgClientService {
  constructor(@Inject(PgClientAsyncProvider) readonly client: Client) {}
}
