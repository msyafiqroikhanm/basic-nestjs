import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should can say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello')
      .query({
        name: 'Syafiq',
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Hello Syafiq');
  });

  it('should return ID', async () => {
    const result = await request(app.getHttpServer()).get(
      '/api/users/23102024',
    );

    expect(result.status).toBe(200);
    expect(result.text).toBe('GET ID 23102024');
  });

  it('should return GET NEST JS', async () => {
    const result = await request(app.getHttpServer()).get('/api/users/sample');

    expect(result.status).toBe(200);
    expect(result.text).toBe('GET NEST JS');
  });
});
