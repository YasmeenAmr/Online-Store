import { Orders, MY_Store_Ord } from '../../models/orders_of_store';
import { Users, MY_Store } from '../../models/users_of_store';

const users = new MY_Store();
const order = new MY_Store_Ord();
const order_test_case: Orders = {
  status: 'active',
  myuser_id: 0,
};
let testorder: Orders;
describe('Testing orders of store modle,', () => {
  beforeAll(async () => {
    const user = await users.create({
      first_name: 'sang',
      last_name: 'min',
      password: 'mi-12345',
    });
    if (user.id) order_test_case.myuser_id = user.id;
  });
  it('Testing creat method so it should add new order', async () => {
    testorder = await order.create(order_test_case);
    expect({
      status: testorder.status,
    }).toEqual({
      status: order_test_case.status,
    });
  });
  it('Testing update method so it should update order when geting new information', async () => {
    const update_testorder = await order.update(testorder);
    expect({
      id: testorder.id,
      status: testorder.status,
      myuser_id: testorder.myuser_id,
    }).toEqual({
      id: update_testorder.id,
      status: update_testorder.status,
      myuser_id: update_testorder.myuser_id,
    });
  });
  it('Testing index method so it Should get all orders', async () => {
    const get_testorder = await order.index();
    expect(get_testorder).toContain(testorder);
  });
  it('Testing show method so it should get order by id', async () => {
    const show_testorder = await order.show(testorder.id as number);
    expect(show_testorder).toEqual(testorder);
  });
  it('Testing delete method so it should delete order by id ', async () => {
    const delete_order = await order.delete(testorder.id as number);
    expect(delete_order.id).toEqual(testorder.id);
  });
});
