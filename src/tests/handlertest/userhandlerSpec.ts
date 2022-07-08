import { Users, MY_Store } from '../../models/users_of_store';
import app from '../../server';
import supertest from 'supertest';
import { JwtPayload, verify } from 'jsonwebtoken';

const store = new MY_Store();
const req = supertest(app);
describe('Testing user handler endpoint', () => {
  const user: Users = {
    first_name: 'filex',
    last_name: 'lee',
    password: 'ghghg333',
  };

  let user_token: string;
  const secret = process.env.MY_SECRET_TOKEN as string;
  let user_id: number;

  it('Testing create user by endpoint so it should get status 200 ok ', async () => {
    await req
      .post('/user')
      .send(user)
      .expect(200)
      .then((res) => {
        user_token = res.body;
        console.log('this is my token ', user_token);
        const decoding_user = verify(
          user_token as string,
          secret
        ) as JwtPayload;
        user_id = decoding_user.user.id;
        user.id = user_id;
      });
  });
  it('Testing update endpoint so it should get status 200 ok ', async () => {
    await req
      .patch(`/user/${user_id}`)
      .set('Authorization', `Bearer ${user_token}`)
      .send(user)
      .expect(200);
    console.log(user_token);
  });

  it('Testing index endpoint so it should get status 200 ok ', async () => {
    await req
      .get('/user')
      .set('Authorization', `Bearer ${user_token}`)
      .expect(200);
  });

  it('Testing show endpoint so it should get status 200 ok ', async () => {
    await req
      .get(`/user/${user_id}`)
      .set('Authorization', `Bearer ${user_token}`)
      .expect(200);
  });

  it('Testing delete endpoint so it should get status 200 ok ', async () => {
    await req
      .delete(`/user/${user_id}`)
      .set('Authorization', `Bearer ${user_token}`)
      .send({ id: user_id })
      .expect(200);
  });
});
