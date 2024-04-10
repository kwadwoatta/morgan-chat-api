"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentsRelations = exports.documents = exports.vector = exports.embeddingStateEnum = exports.notebooksRelations = exports.notebooks = exports.userRelations = exports.users = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    name: (0, pg_core_1.text)('name'),
    hash: (0, pg_core_1.text)('hash'),
    firstName: (0, pg_core_1.text)('first_name'),
    lastName: (0, pg_core_1.text)('last_name'),
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        notebooks: many(exports.notebooks),
    });
});
exports.notebooks = (0, pg_core_1.pgTable)('notebooks', {
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)('name'),
    description: (0, pg_core_1.text)('description'),
    authorId: (0, pg_core_1.uuid)('author_id')
        .notNull()
        .references(function () { return exports.users.id; }, {
        onDelete: 'cascade',
    }),
});
exports.notebooksRelations = (0, drizzle_orm_1.relations)(exports.notebooks, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        author: one(exports.users, {
            references: [exports.users.id],
            fields: [exports.notebooks.authorId],
        }),
        documents: many(exports.documents),
    });
});
exports.embeddingStateEnum = (0, pg_core_1.pgEnum)('embedding_state', [
    'pending',
    'success',
    'failure',
]);
exports.vector = (0, pg_core_1.customType)({
    dataType: function (config) {
        var _a;
        return "vector(".concat((_a = config === null || config === void 0 ? void 0 : config.dimension) !== null && _a !== void 0 ? _a : 768, ")");
    },
    toDriver: function (value) {
        return JSON.stringify(value);
    },
    fromDriver: function (value) {
        return JSON.parse(value);
    },
});
exports.documents = (0, pg_core_1.pgTable)('documents', {
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    name: (0, pg_core_1.text)('name'),
    // thumbnailLink: text('thumbnail_link'),
    embedding: (0, exports.vector)('embedding', { dimension: 768 }).notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    embeddingState: (0, exports.embeddingStateEnum)('pending').notNull(),
    notebookId: (0, pg_core_1.uuid)('notebook_id')
        .notNull()
        .references(function () { return exports.notebooks.id; }),
});
exports.documentsRelations = (0, drizzle_orm_1.relations)(exports.documents, function (_a) {
    var one = _a.one;
    return ({
        note: one(exports.notebooks, {
            references: [exports.notebooks.id],
            fields: [exports.documents.notebookId],
        }),
    });
});
