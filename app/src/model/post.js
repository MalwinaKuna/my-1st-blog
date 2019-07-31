const connection = require('./connection'); // <--
class PostEntity {
    constructor(id, title, slug, content) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }
}
async function insertPost(post) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO posts (title,slug,content) VALUES ('${post.title}','${post.slug}','${post.content}');`,
            (error, results, fields) => {
                if (error) reject(error);
                console.log('The solution is ', results);
                resolve(results.insertId);
            }
        );
    })
    post.id = await promise;
}
async function getPosts() {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts;`,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(console.log('The solution is ', results));
            }
        );
    })
    return promise;
}
async function getPostsS() {
    let promise = [];
    promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts;`,
            (error, results, fields) => {
                if (error) reject(error);
                //resolve(console.log('The solution is ', results));
                let posts = [];
                //to do
                for (let i = 0; i < results.length; i++) {
                    posts.push(new PostEntity(results[i].id, results[i].title, results[i].slug, results[i].content)); //?
                }
                resolve(posts);
            }
        );
    })
    return promise;
}
async function getPost(id) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM posts WHERE id='${id}';`,
            (error, results, fields) => {
                if (error) reject(error);
                console.log('The solution is ', results);
                let post = new PostEntity(results[0].id, results[0].title, results[0].slug, results[0].content);
                resolve(post);
            }
        );
    })
    return promise;
}
async function deletePost(id) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM posts WHERE id='${id}';`,
            (error, results, fields) => {
                if (error) resolve(false);
                console.log('The solution is ', results);
                if (results.affectedRows > 0)
                    resolve(true);
                else {
                    resolve(false);
                }
            }
        );

    })
    return promise;
}

function deletePosts() {
    connection.query(
        `DELETE FROM posts;`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is ', results);
        }
    );
}
async function updatePost(post) {
    let promise = new Promise((resolve, reject) => {

        connection.query(
            `UPDATE posts SET title='${post.title}', slug='${post.slug}', content='${post.content}' WHERE id='${post.id}'`,
            (error, results, fields) => {
                if (error) reject(error);
                resolve(console.log('The solution is ', results));
            }
        );
    })
    return promise;
}
module.exports = {
    insertPost,
    getPosts,
    getPostsS,
    getPost,
    deletePost,
    deletePosts,
    PostEntity,
    updatePost
}