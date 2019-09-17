const userModel = require('../../src/model/accounts');

test ('add user', async ()=>{
    let user = new userModel.UserEntity(null, 'user2', 'pass');
    await userModel.insertUser(user);

    expect(user.id).not.toBe(null);
    await userModel.deleteUser(user);


})

test ('get users', async ()=>{
    let newUser1 = new userModel.UserEntity(null,'user3','somePass');
    await userModel.insertUser(newUser1);
    let allUsers = [];
    allUsers = await userModel.getUsers();
    expect(await allUsers).toContainEqual(newUser1);
    await userModel.deleteUser(newUser1);

})
