const postModel = require('./model/post');
const express = require('express');
const connection = require('./model/connection');
const app = express();
const bodyParser = require('body-parser');
const postValidation = require('./validation/post');
app.use(bodyParser.json());

app.delete('/posts/:id', async (req, res) => {

    if (isNaN(req.params.id)) {
        res.status(400).json({
            message: 'id must be a number'
        });
        return;
    }
    let postById = await postModel.getPost(req.params.id)
    if (postById === null) {
        res.status(404);
        res.end();
        return;
    }
    await postModel.deletePost(postById);
    res.status(204);
    res.end();
    return;
});

app.put('/posts/:id', async (req, res) => {

        if (isNaN(req.params.id)) {
            res.status(400).json({
                message: 'id must be a number'
            });
            return;
        }
        let postById = await postModel.getPost(req.params.id)
        if (postById === null) {
            res.status(404);
            res.end();
            return;
        }
        postById.title = await req.body.title;
        postById.slug = await req.body.slug;
        postById.content = await req.body.content;


        errorsArray = await postValidation.validatePost(postById);
        if (errorsArray.length > 0) {
            res.status(400);
            res.json({
                errors: errorsArray
            });
            return;
        }
        await postModel.updatePost(postById);
        res.status(200).json(await postById);
        return;eb22af094f6f76f6b930cc41f113797cc
});

app.get('/posts', async(req, res)=>{
            let posts = await postModel.getPosts();
            res.json(posts);
        });
app.get('/posts/:id', async (req, res) => {

    try {
        if (isNaN(req.params.id)) {
            res.status(400).json({
                message: 'id must be a number'
            });

            return;
        }
        let post = await postModel.getPost(req.params.id);
        if (post === null) {
            res.status(404);
            res.end();
            return;
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error.toString());
        res.status(500);
        res.end();
        return;
    }
});

app.post('/posts', async (req, res) => {

    let newPost = new postModel.PostEntity(null, req.body.title, req.body.slug, req.body.content);

    let errorsArray = await postValidation.validatePost(newPost);
    if (errorsArray.length > 0) {
        res.status(400);
        res.json({
            errors: errorsArray
        });
        return;
    }
    try {
        await postModel.insertPost(newPost);
        res.status(201);
        res.json(newPost);
    } catch (error) {
        console.error(error.toString());
        res.status(500);
        res.end();
        return;
    }
});




app.listen(8080, () => console.log('Listening on 8080'));
