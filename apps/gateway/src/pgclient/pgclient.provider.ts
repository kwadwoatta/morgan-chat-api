import { Provider } from '@nestjs/common';
import { Client } from 'pg';

export const PgAsyncProvider = 'PgAsyncProvider';

export const PgClientProvider: Provider = {
  useFactory: () => {
    const client = new Client({
      connectionString: process.env.DB_URL,
    });

    return client;
  },
  provide: PgAsyncProvider,
};
