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
    if (post.title.length < 10) {
        error.push('title must be at least 10 characters long');
    }
    if (typeof post.slug !== 'string') {
        error.push('slug is not a string type');
    }
    if (typeof post.content !== 'string') {
        error.push('content is not a string type');
    }
    if( await postModel.isSlugExist(post)) {
        error.push('The slug already exists');
    }
   
    return error;
};

module.exports = {
    validatePost
};
