const userModel = require('../../src/model/account');

test('add user', async () => {
    let user = new userModel.UserEntity(null, 'user2', 'pass');
    await userModel.insertUser(user);

    expect(user.id).not.toBe(null);
    await userModel.deleteUser(user);
})
