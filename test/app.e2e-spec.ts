import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { readFileSync } from 'fs';

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
      .expect(readFileSync('./html/index.html', 'utf-8'));
  });

  it('/dogs (GET)', () => {
    return request(app.getHttpServer())
      .get('/dogs/')
      .expect(200)
      .expect(readFileSync('./html/dogs/index.html', 'utf-8'));
  });

  it('/cats (GET)', () => {
    return request(app.getHttpServer())
      .get('/cats/')
      .expect(200)
      .expect(readFileSync('./html/cats/index.html', 'utf-8'));
  });

  it('404 Page (GET)', () => {
    return request(app.getHttpServer())
      .get('/does-not-exist')
      .expect(200)
      .expect(readFileSync('./html/404.html', 'utf-8'));
  });
});
