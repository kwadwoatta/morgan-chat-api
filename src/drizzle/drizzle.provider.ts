import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { PgClientService } from 'src/pgclient/pgclient.service';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [PgClientService],
  useFactory: async ({ client }: PgClientService) => {
    await client.connect();
    const db = drizzle(client, { schema });
    return db;
  },
};
