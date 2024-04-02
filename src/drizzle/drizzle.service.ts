import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from './drizzle.provider';
import * as schema from './schema';

@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async cleanDB() {
    this.db.transaction(async (tx) => {
      await tx.delete(schema.users);
      await tx.delete(schema.documents);
      await tx.delete(schema.notes);
    });
  }
}
