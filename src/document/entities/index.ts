import { InferSelectModel } from 'drizzle-orm';
import { documents } from 'src/drizzle/schema';

export type Document = InferSelectModel<typeof documents>;
