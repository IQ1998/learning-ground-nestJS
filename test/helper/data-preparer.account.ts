import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Should implment this into a class, adding cleanup function as needed
const givenFollowingAccountExist = (app: INestApplication, payload) =>
  new Promise((resolve, reject) => {
    request(app.getHttpServer())
      .post('/api/account')
      .send(payload)
      .set('Accept', 'application/json')
      .set('ContentType', 'application/json')
      .then((res) => {
        if (res.status >= 400) {
          console.log(res.error);
          reject(res.error);
        }
        resolve(res);
      })
      .catch((err) => reject(err));
  });

export default {
  givenFollowingAccountExist,
};
