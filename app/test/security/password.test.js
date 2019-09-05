const password = require('../../src/security/password');

test('password is correct', () => {
    let gettedHash = password.hashPassword('pass');
    let checkingPassword = password.isPaswwordCorrect('pass', gettedHash);
    expect(checkingPassword).toBe(true);
})

test('password is incorrect', () => {
    let gettedHash = password.hashPassword('pass');
    let checkingPassword = password.isPaswwordCorrect('pass', 'przykladowyHash');
    expect(checkingPassword).toBe(false);
})
