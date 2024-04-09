import { InferDrizzleModel } from 'apps/gateway/lib/drizzle.utils';

export type User = InferDrizzleModel<'users'>;
// export type UserWithNotebooks = InferDrizzleModel<'users', { notebooks }>;
