const mysql = require('mysql'); 
const post = require('./post');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '43306',
    user: 'root',
    password: 'Secret123',
    database: 'new_schema_23_07'
});
//post.getPosts();
   connection.query(
        `SELECT * FROM new_schema_23_07.posts;`,
           (error, results, fields) => {
               if (error) throw error;
               console.log('The solution is: ', results);
           }
       )
connection.end();
//getPosts();
