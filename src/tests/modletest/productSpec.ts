import { Products, MY_Store_Pro } from '../../models/products_of_store';

const product = new MY_Store_Pro();
const product_test_case: Products = {
  product_name: 'nails',
  price: 50,
};
let testproduct: Products;
describe('Testing products of store modle,', () => {
  it('Testing creat method so it should add new user', async () => {
    testproduct = await product.create(product_test_case);
    expect({
      p_name: testproduct.product_name,
      price: testproduct.price,
    }).toEqual({
      p_name: product_test_case.product_name,
      price: product_test_case.price,
    });
  });
  it('Testing update method so it should update product when getting new information', async () => {
    const update_testproduct = await product.update(testproduct);
    expect({
      id: testproduct.id,
      p_name: testproduct.product_name,
      price: testproduct.price,
    }).toEqual({
      id: update_testproduct.id,
      p_name: update_testproduct.product_name,
      price: update_testproduct.price,
    });
  });
  it('Testing index method so it Should get all user', async () => {
    const get_testproduct = await product.index();
    expect(get_testproduct).toContain(testproduct);
  });
  it('Testing show method so it should get user by id', async () => {
    const show_testproduct = await product.show(testproduct.id as number);
    expect(show_testproduct).toEqual(testproduct);
  });
  it('Testing delete method so it should delete user by id ', async () => {
    const delete_product = await product.delete(testproduct.id as number);
    expect(delete_product.id).toEqual(testproduct.id);
  });
});
