import { InferDrizzleModel } from 'lib/drizzle.utils';

export type User = InferDrizzleModel<'users'>;
export type UserWithPosts = InferDrizzleModel<'users', { notes }>;
