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
/**
 * @param {PostEntity} post
 * @returns {Promise<undefind>}
 * @throws {MysqlError}
 */
async function insertUser(accounts) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
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

/**
 * @returns {Promise<PostEntity[]>}
 * @throws {MysqlError}
 */
async function getUsers() {
    let promise = [];
    promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM users;`,
            (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                let users = [];
                for (let i = 0; i < results.length; i++) {
                    users.push(new PostEntity(results[i].id, results[i].title, results[i].slug, results[i].content)); //?
                }
                resolve(users);
            }
        );
    })
    return promise;
}

module.exports = {
    UserEntity,
    insertUser,
    getUsers
}
