import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'apps/gateway/src/auth/decorator';
import { JwtGuard } from 'apps/gateway/src/auth/guard';
import { EditUserDto } from './dto';
import { User } from './entities';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
