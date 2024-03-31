import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/*.ts',
  out: './drizzle/migrations/',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
