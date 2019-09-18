const md5 = require('js-md5');

/**
 * @param {string} plain
 * @returns {string}
 */
function hashPassword(plain) {
    let hash = md5(plain);
    return hash;
}

/**
 *
 * @param {string} plain
 * @param {string} hash
 * @returns {boolean}
 */
function isPaswwordCorrect(plain, hash) {

    const plainPass = hashPassword(plain);

    return plainPass === hash;
}

module.exports = {
    hashPassword
}
