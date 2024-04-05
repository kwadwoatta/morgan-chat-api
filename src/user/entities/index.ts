import { InferDrizzleModel } from 'lib/drizzle.utils';

export type User = InferDrizzleModel<'users'>;
export type UserWithNotebooks = InferDrizzleModel<'users', { notebooks }>;
