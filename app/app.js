const post = require('./src/model/post');
const express = require('express');
const connection = require('./src/model/connection');
const app = express();
post.getPosts();
//post.getPost(21);
//post.deletePost(20);
// post.deletePosts();
//post.updatePost(72,'another content 6669');
////--------> to add new post
// (async()=>{
//     const insertPost1= new post.PostEntity(null,'first','slug-1','grumpy content');
//     await post.insertPost(insertPost1);
//     connection.end();
//     console.log('x'+insertPost1.id);
// })();
////--------> 
connection.end();