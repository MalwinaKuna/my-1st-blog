const express = require('express');
const app = express();
const mysql = require('mysql'); 
const post = require('./src/model/post');
const connection = mysql.createConnection({
    host: 'localhost',
    port: '43306',
    user: 'root',
    password: 'Secret123',
    database: 'new_schema_23_07'
});
connection.query(
    post.getPosts(),
  //post.savePost(),
  //`SELECT * FROM new_schema_23_07.posts;`,
    (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results);
    }
);
connection.end();
//  let writePost = (null, 'Bla bla', 'bla-bla', 'hahahahahahah');
//  savePost(writePost);
getPosts();