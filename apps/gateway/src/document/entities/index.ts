import { documents } from 'apps/gateway/src/drizzle/schema';
import { InferSelectModel } from 'drizzle-orm';

export type Document = InferSelectModel<typeof documents>;
