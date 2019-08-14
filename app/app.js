const post = require('./src/model/post');
const express = require('express');
const connection = require('./src/model/connection');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
    let title = req.body.title;
    let slug = req.body.slug;
    let content = req.body.content;

    if (typeof title == 'string' && typeof slug == 'string' && typeof title == 'string') {
        res.status(201);
        res.json({
            title: title,
            slug: slug,
            content: content
        })
    }
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
    }
    res.end();
});

app.listen(8080, () => console.log('Listening on 8080'));
connection.end();