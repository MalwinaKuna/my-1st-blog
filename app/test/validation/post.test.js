const request = require('sync-request');
const postModel = require('../../src/model/post');
const validation = require('../../src/validation/post');

test('check the validation: title is not a string type', async()=> {
    let newPost = new postModel.PostEntity(null, 'title', 'slug', 'content');
    await postModel.insertPost(newPost);

    let resultUpdate = request('PUT', `http://localhost:8080/posts/${newPost.id}`, {
        json: {
            title: 2,
            slug: '2',
            content: '3'
        }
    });
    let payload1 = JSON.parse(resultUpdate.body);
    expect(payload1.errors).toContainEqual('title is not a string type');

    await postModel.deletePost(newPost);
})
