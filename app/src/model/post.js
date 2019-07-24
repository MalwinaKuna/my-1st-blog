//funkcje
const connection = require('./connection'); // <--

class PostEntity { //encja, if id is not defined write null
    constructor(id, title, slug, content) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }
}
/**
 * let promise= new Promise((resolve, reject)=>{
 * function})
 * variable= await promise;
 */
async function savePost(post) {
    let promise = new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO posts (title,slug,content) VALUES ('${post.title}','${post.slug}','${post.content}');`,
            function(error, results, fields)  {
                if (error) {
                    reject(error);
                }
                console.log('The solution is: ', results);
                resolve(results.insertId);
            }
        );
    });

    post.id= await promise;
}

function updatePost(post) {
    connection.query(
        `UPDATE posts SET (title,content) values ('','') WHERE id= ${id};`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
        }
    )
}

function deletePost(post) {
    connection.query(
        `DELETE * from posts WHERE id= ${id};`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
        }
    )
}

function getPost(id) {
    connection.query(
        `SELECT * from posts WHERE id= ${id};`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
        }
    )
}

function getPosts() {
    connection.query(
        `SELECT * FROM posts;`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
            
        }
    )
}
// connection.query(
//     'SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });
module.exports = {
    PostEntity,
    savePost,
    updatePost,
    getPosts,
    getPost,
    deletePost
};