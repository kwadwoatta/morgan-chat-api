import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { users } from 'drizzle/schema';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private drizzle: DrizzleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.drizzle.db.query.users
      .findFirst({ where: eq(users.id, payload.sub) })
      .execute();

    delete user.hash;
    return user;
  }
}
