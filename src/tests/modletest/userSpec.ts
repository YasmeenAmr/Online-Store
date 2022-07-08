import { Users, MY_Store } from '../../models/users_of_store';

const user = new MY_Store();
const user_test_case: Users = {
  first_name: 'yu-sang',
  last_name: 'choi',
  password: 'yu-12345',
};
let testuser: Users;
describe('Testing users of store modle,', () => {
  it('Testing creat method so it should add new user', async () => {
    testuser = await user.create(user_test_case);
    expect({
      first_name: testuser.first_name,
      last_name: testuser.last_name,
    }).toEqual({
      first_name: user_test_case.first_name,
      last_name: user_test_case.last_name,
    });
  });
  it('Testing update method so it should update user when geting new information', async () => {
    const update_testuser = await user.update(testuser);
    expect({
      id: testuser.id,
      first_name: testuser.first_name,
      last_name: testuser.last_name,
      password: testuser.password,
    }).toEqual({
      id: update_testuser.id,
      first_name: update_testuser.first_name,
      last_name: update_testuser.last_name,
      password: update_testuser.password,
    });
  });
  it('Testing index method so it Should get all user', async () => {
    const get_testuser = await user.index();
    expect(get_testuser).toContain(testuser);
  });
  it('Testing show method so it should get user by id', async () => {
    const show_testuser = await user.show(testuser.id as number);
    expect(show_testuser).toEqual(testuser);
  });
  it('Testing delete method so it should delete user by id ', async () => {
    const delete_user = await user.delete(testuser.id as number);
    expect(delete_user.id).toEqual(testuser.id);
  });
});
