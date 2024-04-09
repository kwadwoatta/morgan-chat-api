import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'apps/gateway/src/drizzle/drizzle.service';
import { users } from 'apps/gateway/src/drizzle/schema';
import { eq } from 'drizzle-orm';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private drizzle: DrizzleService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const user = (
      await this.drizzle.db
        .update(users)
        .set({
          ...dto,
        })
        .where(eq(users.id, userId))
        .returning()
    )[0];

    delete user.hash;
    return user;
  }
}
