const post = require('./model/post');
const express = require('express');
const connection = require('./model/connection');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/posts', async (req, res) => {
    let title = req.body.title;
    let slug = req.body.slug;
    let content = req.body.content;

    const error = [];
    if (typeof title !== 'string') {
        error.push('title is not a string type');
    }
    if (typeof slug !== 'string') {
        error.push('slug is not a string type');
    }
    if (typeof content !== 'string') {
        error.push('content is not a string type');
    }
    if (error.length > 0) {
        res.status(400);
        res.json({
            Errors: error
        });
        return;
    }
    isSlugUnique = await post.isSlugExist(slug);
    if (isSlugUnique) {
        res.status(400);
        res.json({
            Error: 'The slug already exists'
        });
    }
    let addPost = new post.PostEntity(null, title, slug, content);

    try {
        await post.insertPost(addPost);

        res.status(201);
        res.json(addPost);
    } catch (error) {
        console.error(error.toString());
        res.status(500);
        res.end();
    }
});

app.listen(8080, () => console.log('Listening on 8080'));