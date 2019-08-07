const post = require('./src/model/post');
const express= require('express');
const connection=require('./src/model/connection');

 post.getPost(3);
connection.end();


