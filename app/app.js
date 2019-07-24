const express = require('express');
const app = express();
const mysql = require('mysql'); 
const post = require('./src/model/post');
const connection= require('./src/model/connection');

(async () =>{
    const post1= new post.PostEntity(null,'title','title1','contentcontent');

    await post.savePost(post1);
    connection.end();
    console.log('x'+post1.id);
})();




/**
 * let promise= new Promise((resolve, reject)=>{
 * function})
 * variable= await promise;
 * 
 * 
 * (async () =>{
 * ...
 * await function
 * 
 * })();
 * 
 * 
 */