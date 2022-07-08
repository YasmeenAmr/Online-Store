import app from '../../server';
import supertest from 'supertest';
import { Products, MY_Store_Pro } from '../../models/products_of_store';

const req = supertest(app);
describe('Testing product handler endpoint', () => {
  const product: Products = {
    product_name: 'lipstick',
    price: 40,
  };
  let product_id: number;
  it('Testing create product by endpoint so it should get status 200 ok ', async () => {
    await req
      .post('/product')
      .send(product)
      .expect(200)
      .then((res) => {
        product_id = res.body.id;
        product.id = product_id;
      });
  });
  it('Testing update endpoint so it should get status 200 ok ', async () => {
    await req.patch(`/product/${product_id}`).send(product).expect(200);
  });

  it('Testing index endpoint so it should get status 200 ok ', async () => {
    await req.get('/product').expect(200);
  });

  it('Testing show endpoint so it should get status 200 ok ', async () => {
    await req.get(`/product/${product_id}`).expect(200);
  });

  it('Testing delete endpoint so it should get status 200 ok ', async () => {
    await req
      .delete(`/user/${product_id}`)
      .send({ id: product_id })
      .expect(200);
  });
});
