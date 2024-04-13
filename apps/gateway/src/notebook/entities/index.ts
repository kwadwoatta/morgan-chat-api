import { notebooks } from 'apps/gateway/src/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Notebook = InferSelectModel<typeof notebooks>;
