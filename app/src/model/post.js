//funkcje

class PostEntity { //encja, if id is not defined write null
    constructor(id, title, slug, content) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }
}

function savePost(post) {
    connection.query(
        `INSERT INTO posts (title,content) VALUES (${title},${content});`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
        }
    );
}

function updatePost(post) {
    connection.query(
        `UPDATE post SET (title,content) values ('','') WHERE id= ${id};`,
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
        `SELECT * from new_schema_23_07.posts WHERE id= ${id};`,
        (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results);
        }
    )
}

function getPosts() {
    connection.query(
        `SELECT * FROM new_schema_23_07.posts`, (error, results, fields) => {
            if (error, results, fields)
                console.log('The solution is: ', results);
        }
    )
}

module.exports = {
    PostEntity,
    savePost,
    updatePost,
    getPosts,
    getPost,
    deletePost
};