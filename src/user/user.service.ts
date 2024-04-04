import { Injectable } from '@nestjs/common';
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
          id: userId,
          ...dto,
        })
        .returning()
    )[0];

    delete user.hash;
    return user;
  }
}
