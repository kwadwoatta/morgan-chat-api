import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  email: text('email').unique().notNull(),
  hash: text('hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
});

export const userRelations = relations(users, ({ many }) => ({
  notebooks: many(notebooks),
}));

export const notebooks = pgTable('notebooks', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
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

export const documents = pgTable('documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  storageLink: text('storage_link'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  embedding: text('embedding').notNull(),
  embeddingState: embeddingStateEnum('pending').notNull(),
  notebookId: uuid('notebook_id')
    .notNull()
    .references(() => notebooks.id),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  note: one(notebooks, {
    references: [notebooks.id],
    fields: [documents.notebookId],
  }),
}));
