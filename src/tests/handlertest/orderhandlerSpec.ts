import app from '../../server';
import supertest from 'supertest';
import { Orders, MY_Store_Ord } from '../../models/orders_of_store';
import { JwtPayload, verify } from 'jsonwebtoken';

const req = supertest(app);
describe('Testing order handler endpoin', () => {
  const order: Orders = {
    status: 'active',
    myuser_id: 0,
  };

  let order_id: number;
  let user_id: number;
  let product_id: number;
  let order_token: string;
  const secret = process.env.MY_SECRET_TOKEN as string;

  beforeAll(async () => {
    await req
      .post('/user')
      .send({
        first_name: 'amany',
        last_name: 'monmo',
        password: 'kjkjkj',
      })
      .expect(200)
      .then((res) => {
        order_token = res.body;
        const decoding_order = verify(
          order_token as string,
          secret
        ) as JwtPayload;
        user_id = decoding_order.user.userId;
        order.myuser_id = user_id;
        console.log('this my user id ', user_id);
      });
      
  });

  it('Testing create order by endpoint so it should get status 200 ok ', async () => {
    await req
      .post('/order')
      .send(order)
      .set('Authorization', `Bearer ${order_token}`)
      .expect(200)
      .then((res) => {
        order_id = res.body.id;
        order.id = order_id;
        console.log('this is my order id ', order_id);
      });
  });
  it('Testing update endpoint so it should get status 200 ok ', async () => {
    await req
      .patch(`/order/${order_id}`)
      .set('Authorization', `Bearer ${order_token}`)
      .send(order)
      .expect(200);
  });

  it('Testing index endpoint so it should get status 200 ok ', async () => {
    await req
      .get('/order')
      .set('Authorization', `Bearer ${order_token}`)
      .expect(200);
  });

  it('Testing show endpoint so it should get status 200 ok ', async () => {
    await req
      .get(`/order/${order_id}`)
      .set('Authorization', `Bearer ${order_token}`)
      .expect(200);
  });

  it('Testing delete endpoint so it should get status 200 ok ', async () => {
    await req
      .delete(`/order/${order_id}`)
      .set('Authorization', `Bearer ${order_token}`)
      .send({ id: order_id })
      .expect(200);
  });
  
});
