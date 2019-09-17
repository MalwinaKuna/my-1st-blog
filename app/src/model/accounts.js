const connection = require('./connection');

class UserEntity {
    /**
     *
     * @param {number} id
     * @param {string} username
     * @param {string} password
     */

    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

async function insertUser(accounts) {
    let promise = new Promise((resolve, reject) => {
        connection.quer(
            `INSERT INTO users (username, password) VALUES ('${accounts.username}', '${accounts.password}');`,
            (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.insertId);
            }
        );
    })
    accounts.id = await promise;
}

module.exports = {
    UserEntity,
    insertUser
}
