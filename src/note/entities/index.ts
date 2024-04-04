import { InferSelectModel } from 'drizzle-orm';
import { notes } from 'src/drizzle/schema';

export type Note = InferSelectModel<typeof notes>;
