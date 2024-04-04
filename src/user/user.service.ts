import { Injectable } from '@nestjs/common';
import { type InferSelectModel } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/drizzle/schema';
import { EditUserDto } from './dto';

export type User = InferSelectModel<typeof users>;

@Injectable()
export class UserService {
  constructor(private drizzle: DrizzleService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = (
      await this.drizzle.db
        .update(users)
        .set({
          id: userId,
          ...dto,
        })
        .returning()
    )[0];

    delete user.hash;

    return user;
  }
}
