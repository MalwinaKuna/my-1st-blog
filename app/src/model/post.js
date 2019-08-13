const connection = require('./connection');
class PostEntity {
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} slug 
     * @param {string} content 
     */
    constructor(id, title, slug, content) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }
}
/** 
 * @param {PostEntity} post
 * @returns {Promise<undefind>}
 * @throws {MysqlError}
 */
async function insertPost(post) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO posts (title,slug,content) VALUES ('${post.title}','${post.slug}','${post.content}');`,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(results.insertId);
            }
        );
    })
    post.id = await promise;
}
/** 
 * @returns {Promise<PostEntity[]>} 
 * @throws {MysqlError} error
 */
async function getPosts() {
    let promise = [];
    promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts;`,
            (error, results, fields) => {
                if (error) reject(error);
                let posts = [];
                for (let i = 0; i < results.length; i++) {
                    posts.push(new PostEntity(results[i].id, results[i].title, results[i].slug, results[i].content)); //?
                }
                resolve(posts);
            }
        );
    })
    return promise;
}
/** 
 * @param {number} id
 * @returns {Promise<PostEntity>} 
 * @throws {MysqlError} error
 */
async function getPost(id) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts WHERE id='${id}';`,
            (error, results, fields) => {
                if (error) reject(error);
                let post = new PostEntity(results[0].id, results[0].title, results[0].slug, results[0].content);
                resolve(post);
            }
        );
    })
    return promise;
}
/** 
 * @param {PostEntity} post
 * @returns {Promise<boolean>}- it depends on if the entity was deleted or not
 */
async function deletePost(post) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM posts WHERE id='${post.id}';`,
            (error, results, fields) => {
                if (error) resolve(false);
                if (results.affectedRows > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );

    })
    return promise;
}
/** 
 * @param {PostEntity} post
 * @returns {Promise<undefined>} - we don't want to return anything in this promise 
 * @throws {MysqlError} error
 */
async function updatePost(post) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `UPDATE posts SET title='${post.title}', slug='${post.slug}', content='${post.content}' WHERE id='${post.id}'`,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(undefined);
            }
        );
    })
    return promise;
}
module.exports = {
    insertPost,
    getPosts,
    getPost,
    deletePost,
    PostEntity,
    updatePost
}