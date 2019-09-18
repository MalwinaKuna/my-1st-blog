/**
 * @param {UserEntity} user
 * @returns {string[]}
 */
const validatePass = async function (user) {
    let error = [];

    if (user.password.length < 6) {
        error.push('password must be at least 6 characters long');
    }
    try {
        if (hasSpecialSigns(user.password)) {
            error.push('password must contain special signs');
        }
    } catch (err) {}
    return error;
};
/**
 * @param {string} password
 * @returns {boolean}
 * @throws {Error}
 */
function hasSpecialSigns(password) {

    let checkSigns = password.split('');
    for (let i = 0; i < checkSigns.length; i++) {
        if (checkSigns[i] === '!' || checkSigns[i] === '@' || checkSigns[i] === '#' || checkSigns[i] === '$' || checkSigns[i] === '%' || checkSigns[i] === '^' || checkSigns[i] === '&' || checkSigns[i] === '*') {
            return false;
        }
    }
    return true;
}

module.exports = {
    validatePass,
    hasSpecialSigns
};
