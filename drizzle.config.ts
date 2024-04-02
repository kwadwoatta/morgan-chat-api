import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/*.ts',
  out: './db/migrations/',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
