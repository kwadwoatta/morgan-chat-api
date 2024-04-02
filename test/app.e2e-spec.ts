import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { execSync } from 'child_process';
import { AuthDto } from 'src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let drizzle: DrizzleService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    drizzle = app.get(DrizzleService);
    await drizzle.cleanDB();
  });

  afterAll(async () => {
    await app.close();
    execSync('docker compose rm test-db -s -f -v');
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'p@test.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should signup', () => {
        return request(app.getHttpServer())
          .post('/auth/signup')
          .send(dto)
          .expect(201);
      });
    });

    describe('Signin', () => {
      it('should signin', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send(dto)
          .expect(200);
      });
    });
  });
});
