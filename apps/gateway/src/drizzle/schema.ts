import { relations } from 'drizzle-orm';
import {
  customType,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  email: text('email').unique().notNull(),
  name: text('name'),
  hash: text('hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
});

export const userRelations = relations(users, ({ many }) => ({
  notebooks: many(notebooks),
}));

export const notebooks = pgTable('notebooks', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  name: text('name'),
  description: text('description'),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
});

export const notebooksRelations = relations(notebooks, ({ one, many }) => ({
  author: one(users, {
    references: [users.id],
    fields: [notebooks.authorId],
  }),
  documents: many(documents),
}));

export const embeddingStateEnum = pgEnum('embedding_state', [
  'pending',
  'success',
  'failure',
]);

export const vector = customType<{
  data: number[];
  driverData: string;
  config: { dimension: number };
  default: false;
}>({
  dataType(config) {
    return `vector(${config?.dimension ?? 768})`;
  },
  toDriver(value: number[]): string {
    return JSON.stringify(value);
  },
  fromDriver(value: string): number[] {
    return JSON.parse(value);
  },
});

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  name: text('name'),
  embeddingState: embeddingStateEnum('pending').notNull(),
  notebookId: uuid('notebook_id')
    .notNull()
    .references(() => notebooks.id, { onDelete: 'cascade' }),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  note: one(notebooks, {
    references: [notebooks.id],
    fields: [documents.notebookId],
  }),
}));

export const embeddings = pgTable('embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  embedding: vector('embedding', { dimension: 768 }),
  content: text('content'),
  metadata: jsonb('metadata'),
  documentId: uuid('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
});

export const embeddingsRelations = relations(embeddings, ({ one }) => ({
  document: one(documents, {
    references: [documents.id],
    fields: [embeddings.documentId],
  }),
}));
