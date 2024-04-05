import { InferSelectModel } from 'drizzle-orm';
import { notebooks } from 'src/drizzle/schema';

export type Note = InferSelectModel<typeof notebooks>;
