import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '../../drizzle/schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const client = new Client({
      connectionString: config.get('DB_URL'),
    });

    await client.connect();
    const db = drizzle(client, { schema });
    return db;
  },
};
