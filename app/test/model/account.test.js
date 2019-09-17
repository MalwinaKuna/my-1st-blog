const userModel = require('../../src/model/accounts');

test ('add user', async ()=>{
    let user = new userModel.UserEntity(null, 'user', 'pass');
    await userModel.insertUser(user);

    expect(user.id).not.toBe(null);
})
