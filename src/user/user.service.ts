import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { users } from 'src/drizzle/schema';
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
