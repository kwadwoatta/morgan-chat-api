import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../drizzle/schema';
import { DrizzleAsyncProvider } from './drizzle.provider';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    readonly db: PostgresJsDatabase<typeof schema>,
  ) {}
}
