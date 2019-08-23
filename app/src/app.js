const postModel = require('./model/post');
const express = require('express');
const connection = require('./model/connection');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.put('/posts/:id', async (req, res) => {

    try {
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
        
        const error = [];
        if (typeof postById.title !== 'string') {
            error.push('title is not a string type');
        }
        if (typeof postById.slug !== 'string') {
            error.push('slug is not a string type');
        }
        if (typeof postById.content !== 'string') {
            error.push('content is not a string type');
        }

        if (await postModel.isSlugExist(postById)) {

            error.push('The slug already exists');
        }
        if (error.length > 0) {
            res.status(400);
            res.json({
                errors: error
            });
            return;
        }
        await postModel.updatePost(postById);
        res.status(200).json(await postById);
        return;
    } catch (error) {
        console.error(error.toString());
        res.status(500);
        res.end();
        return;
    }
});
app.get('/posts', async (req, res) => {
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

    const error = [];
    if (typeof newPost.title !== 'string') {
        error.push('title is not a string type');
    }
    if (typeof newPost.slug !== 'string') {
        error.push('slug is not a string type');
    }
    if (typeof newPost.content !== 'string') {
        error.push('content is not a string type');
    }

    if (await postModel.isSlugExist(newPost)) {

        error.push('The slug already exists');
    }
    if (error.length > 0) {
        res.status(400);
        res.json({
            errors: error
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