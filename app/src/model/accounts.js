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
 * @param {UserEntity} post
 * @returns {Promise<boolean>}- it depends on if the entity was deleted or not
 */
async function deleteUser(accounts) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM users WHERE id='${accounts.id}';`,
            (error, results, fields) => {
                if (error) resolve(false);
                if (results.affectedRows > 0) {
                    resolve(true);
                    return;
                } else {
                    resolve(false);
                    return;
                }
            }
        );

    })
    return promise;
}

module.exports = {
    UserEntity,
    insertUser,
    deleteUser
}
