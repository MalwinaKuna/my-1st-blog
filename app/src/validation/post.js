const postModel = require('../model/post');

/**
 * @param {PostEntity} post
 * @returns {string[]}
 */
const validatePost =async function (post) {
    const error = [];

    if (typeof post.title !== 'string') {
        error.push('title is not a string type');
    }
    if (post.title.length < 4) {
        error.push('title must be at least 4 characters long');
    }
    if (typeof post.slug !== 'string') {
        error.push('slug is not a string type');
    }
    if (typeof post.content !== 'string') {
        error.push('content is not a string type');
    }
    if ( await postModel.isSlugExist(post)) {
        error.push('The slug already exists');
    }
    try {
        if (hasForbiddenSigns(post.slug)) {
            error.push('Slug can not contain polish signs');
        }
    } catch (err) {}
    return error;
};
/**
 * @param {string} slug 
 * @returns {boolean} 
 * @throws {Error}
 */
function hasForbiddenSigns(slug) {
    if (typeof slug !== 'string') {
        throw new Error('slug has to be a string');
    }
    let checkSigns = slug.split('');
    for (let i = 0; i < checkSigns.length; i++) {
        if (checkSigns[i] === 'ą' || checkSigns[i] === 'ę' || checkSigns[i] === 'ć' || checkSigns[i] === 'ó' || checkSigns[i] === 'ź' || checkSigns[i] === 'ż') {
            return true;
        }
    }
    return false;
}

module.exports = {
    validatePost,
    hasForbiddenSigns
};
