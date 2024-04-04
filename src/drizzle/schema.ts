import { relations } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  email: text('email').unique(),
  hash: text('hash'),
  firstName: text('first_name'),
  lastName: text('last_name'),
});

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const notes = pgTable('notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  authorId: integer('author_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
});

export const notesRelations = relations(notes, ({ one, many }) => ({
  author: one(users, {
    references: [users.id],
    fields: [notes.authorId],
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
  embedding: text('embedding'),
  embeddingState: embeddingStateEnum('pending'),
  noteId: integer('note_id').references(() => notes.id),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  note: one(notes, {
    references: [notes.id],
    fields: [documents.noteId],
  }),
}));
