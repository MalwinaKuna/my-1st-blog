const userModel = require('../../src/model/account');
let username = 'user2';

test('add user', async () => {
    let user = new userModel.UserEntity(null, username, 'pass');
    await userModel.insertUser(user);

    expect(user.id).not.toBe(null);
    await userModel.deleteUser(username);
})
