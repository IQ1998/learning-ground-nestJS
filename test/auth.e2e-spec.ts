import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import dataPreparerAccount from './helper/data-preparer.account';
import { mainConfig } from '../src/mainConfig';
import { ACCOUNT_STATUS, cookieKey } from '../src/account/account.constant';

const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = v[1]
        ? decodeURIComponent(v[1].trim())
        : true;
      return acc;
    }, {});

describe.only('Authentication flow (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mainConfig(app);
    await app.init();
  });

  it('/account/login (POST)', async () => {
    // // Wrong password
    // const response = await request(app.getHttpServer())
    //   .post('/api/account/login')
    //   .send({
    //     userName: 'IQ1998',
    //     password: 'deptrai1234',
    //   })
    //   .set('Accept', 'application/json')
    //   .set('ContentType', 'application/json')
    //   .expect('Content-Type', /json/);
    // expect(response.status).toEqual(400);
    // expect(response.body.message).toBeDefined();
    // expect(response.body.message).toEqual('Username or password is incorrect');
    // // Non existent user
    // const response2 = await request(app.getHttpServer())
    //   .post('/api/account/login')
    //   .send({
    //     userName: 'wakandaaaaahhhhggggg',
    //     password: 'deptrai1234',
    //   })
    //   .set('Accept', 'application/json')
    //   .set('ContentType', 'application/json')
    //   .expect('Content-Type', /json/);
    // expect(response2.body).toEqual({
    //   statusCode: 400,
    //   message: 'Username or password is incorrect',
    // });
    // // Inactive user
    // await dataPreparerAccount.givenFollowingAccountExist(app, {
    //   userName: 'IQ000',
    //   ldapID: 'iq000@andeptrai.com',
    //   password: 'deptrai123',
    //   fullName: 'An HanSung Inactive',
    //   fromDepartmentId: 'b79398c6-bed9-43dc-9ffc-629c93a7dd17',
    //   status: ACCOUNT_STATUS.INACTIVE,
    // });

    // const response3 = await request(app.getHttpServer())
    //   .post('/api/account/login')
    //   .send({
    //     userName: 'IQ000',
    //     password: 'deptrai123',
    //   })
    //   .set('Accept', 'application/json')
    //   .set('ContentType', 'application/json')
    //   .expect('Content-Type', /json/);
    // expect(response3.body).toEqual({
    //   statusCode: 401,
    //   message: 'Account is locked',
    // });

    const response4 = await request(app.getHttpServer())
      .post('/api/account/login')
      .send({
        userName: 'IQ1998',
        password: 'deptrai123',
      })
      .set('Accept', 'application/json')
      .set('ContentType', 'application/json')
      .expect('Content-Type', /json/);

    expect(response4.body).toEqual({
      ok: 1,
    });
    const cookieResult = parseCookie(response4.headers['set-cookie'][0]);
    expect(cookieResult[cookieKey]).toBeDefined();
  });
});
