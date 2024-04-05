import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { execSync } from 'child_process';
import { AuthDto } from 'src/auth/dto';
import { CreateNotebookDto } from 'src/notebook/dto';
import { PgClientService } from 'src/pgclient/pgclient.service';

describe(`AppController (e2e)`, () => {
  let app: INestApplication;
  let pg: PgClientService;
  let drizzle: DrizzleService;
  let token: string;
  let notebookId: string;
  let documentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    pg = app.get(PgClientService);
    drizzle = app.get(DrizzleService);
    await drizzle.cleanDB();
  });

  afterAll(async () => {
    await pg.client.end();
    await app.close();
    execSync(`docker compose rm test-db -s -f -v`);
  });

  describe(`Auth`, () => {
    const dto: AuthDto = {
      email: `one@two.com`,
      password: `123`,
    };

    describe(`Signup`, () => {
      it(`should throw if email is empty`, () => {
        return request(app.getHttpServer())
          .post(`/auth/signup`)
          .send({ password: dto.password })
          .expect(400);
      });

      it(`should signup`, () => {
        return request(app.getHttpServer())
          .post(`/auth/signup`)
          .send(dto)
          .expect(201)
          .then((res) => {
            expect(res);
            token = res.body.access_token;
          });
      });
    });

    describe(`Login`, () => {
      it(`should throw if email is empty`, () => {
        return request(app.getHttpServer())
          .post(`/auth/login`)
          .send({ password: dto.password })
          .expect(400);
      });

      it(`should throw if password is empty`, () => {
        return request(app.getHttpServer())
          .post(`/auth/login`)
          .send({ email: dto.email })
          .expect(400);
      });

      it(`should login`, async () => {
        const res = await request(app.getHttpServer())
          .post(`/auth/login`)
          .send(dto)
          .expect(200);

        expect(res);
        token = res.body.access_token;
      });
    });
  });

  describe(`Notebook`, () => {
    describe(`Create`, () => {
      const dto: CreateNotebookDto = {
        name: `Notebook 1`,
      };

      it(`should throw if name is empty`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send({ description: dto.description })
          .expect(400);
      });

      it(`should create notebook with name and description`, async () => {
        const res = await request(app.getHttpServer())
          .post(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send(dto)
          .expect(201);

        expect(res);
        const newNotebook = res.body[0];
        expect(newNotebook);
        expect(newNotebook.id).toBeDefined();
        expect(newNotebook.id).toMatch(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
        );

        notebookId = newNotebook.id;
      });

      it(`should create notebook with only name`, async () => {
        const res = await request(app.getHttpServer())
          .post(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send(dto)
          .expect(201);

        expect(res);
        const newNotebook = res.body[0];
        expect(newNotebook);
        expect(newNotebook.id).toBeDefined();
        expect(newNotebook.id).toMatch(
          /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
        );

        notebookId = newNotebook.id;
      });
    });

    describe(`Read`, () => {
      it(`should throw if jwt is empty`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks`)
          .send()
          .expect(401);
      });

      it(`should throw if unknown notebookId is provided`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });

      it(`should read all notebooks`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });

      it(`should read notebook with notebook_id`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks/:${notebookId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });
    });

    describe(`Update`, () => {
      const dto: CreateNotebookDto = {
        name: `Notebook 2`,
        description: `Description 2`,
      };

      it(`should throw if notebook_id is empty`, () => {
        return request(app.getHttpServer())
          .patch(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(400);
      });

      it(`should update notebook with notebook_id and name`, () => {
        return request(app.getHttpServer())
          .patch(`/notebooks/:${notebookId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send({ name: dto.name })
          .expect(200);
      });

      it(`should update notebook with notebook_id and description`, () => {
        return request(app.getHttpServer())
          .patch(`/notebooks/:${notebookId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send({ description: dto.description })
          .expect(200);
      });
    });

    describe(`Delete`, () => {
      it(`should throw if notebook_id is empty`, () => {
        return request(app.getHttpServer())
          .delete(`/notebooks`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(400);
      });

      it(`should delete with notebook_id`, () => {
        return request(app.getHttpServer())
          .delete(`/notebooks/:${notebookId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });
    });
  });

  describe(`Document`, () => {
    describe(`Create`, () => {
      it(`should throw if name is empty`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks/:${notebookId}/documents`)
          .set(`Authorization`, `Bearer ${token}`)
          .attach('files', './pdf.pdf')
          .send()
          .expect(400);
      });

      it(`should throw if attached file is not a pdf`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks/:${notebookId}/documents`)
          .set(`Authorization`, `Bearer ${token}`)
          .attach('files', './not-a-pdf.txt')
          .send()
          .expect(400);
      });

      it(`should create notebook with name and description`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks/:${notebookId}/documents`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(201);
      });

      it(`should create notebook with name, description, and multiple PDF files`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks/:${notebookId}/documents`)
          .set(`Authorization`, `Bearer ${token}`)
          .attach('files', './pdf1.pdf')
          .attach('files', './pdf2.pdf')
          .send()
          .expect(201);
      });

      it(`should create notebook with only name`, () => {
        return request(app.getHttpServer())
          .post(`/notebooks/:${notebookId}/documents`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });
    });

    describe(`Read`, () => {
      it(`should throw if name is empty`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(400);
      });

      it(`should create notebook with name and description`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(201);
      });

      it(`should create notebook with only name`, () => {
        return request(app.getHttpServer())
          .get(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });
    });

    describe(`Delete`, () => {
      it(`should throw if name is empty`, () => {
        return request(app.getHttpServer())
          .delete(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(400);
      });

      it(`should create notebook with name and description`, () => {
        return request(app.getHttpServer())
          .delete(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(201);
      });

      it(`should create notebook with only name`, () => {
        return request(app.getHttpServer())
          .delete(`/notebooks/:${notebookId}/documents/:${documentId}`)
          .set(`Authorization`, `Bearer ${token}`)
          .send()
          .expect(200);
      });
    });
  });
});
