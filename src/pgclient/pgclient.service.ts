import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { PgAsyncProvider } from './pgclient.provider';

@Injectable()
export class PgClientService {
  constructor(@Inject(PgAsyncProvider) readonly client: Client) {}
}
