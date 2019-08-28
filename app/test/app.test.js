const request = require('sync-request');
const postModel = require('../src/model/post');

test('check if post was added', async () => {

    let result = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '<string>911',
            slug: '<string>',
            content: '<string>',
        }
    });
    expect(result.statusCode).toBe(201);
    let payload = JSON.parse(result.body);
    await postModel.deletePost(payload);
});


test('check if title is string type', () => {
    let result = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: 2,
            slug: '<string>',
            content: 3,
        }
    });
    expect(result.statusCode).toBe(400);
});


test('check if the status code is right when the slug is not unique', async () => {
    let result = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '1qwqwwwwwwwwwwwwwwwww',
            slug: '2',
            content: '3'
        }
    });
    let payload = JSON.parse(result.body);

    let result1 = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '1wwwwwwwwwwwwwwwwwwwww',
            slug: '2',
            content: '3'
        }
    });

    expect(result1.statusCode).toBe(400);
    await postModel.deletePost(payload);
})

test('when post id is string', async () => {
    let result = request('GET', `http://localhost:8080/posts/<string>`);
    expect(result.statusCode).toBe(400);
    let payload = JSON.parse(result.body);
    expect(await payload.message).toEqual('id must be a number');
})

test('when id exists', async () => {
    let newPost = new postModel.PostEntity(null, 'title', 'slug', 'content');
    await postModel.insertPost(newPost);
    
    let result = request('GET', `http://localhost:8080/posts/${newPost.id}`);
    expect(await result.statusCode).toBe(200);
    let payload = JSON.parse(result.body);
    expect(await payload.id).toEqual(newPost.id);

    await postModel.deletePost(newPost);
})

test('test status when post is correctly updated', async () => {
    let newPost = new postModel.PostEntity(null, 'test title', 'slug test ', 'test content');
    await postModel.insertPost(newPost);
    
    let result = request('PUT', `http://localhost:8080/posts/${newPost.id}`, {
        json: {
            title: '1test1test1test1test1test',
            slug: 'slug-slug-slug-slug',
            content: '3'
        }});
    expect(await result.statusCode).toBe(200);
    
    await postModel.deletePost(newPost);
})

test('test status when title post is too short', async () => {
    let newPost = new postModel.PostEntity(null, 'test title', 'slug test ', 'test content');
    await postModel.insertPost(newPost);
    
    let result = request('PUT', `http://localhost:8080/posts/${newPost.id}`, {
        json: {
            title: '1t',
            slug: 'slug-slug-slug-slug',
            content: '3'
        }});
    expect(await result.statusCode).toBe(400);
    
    await postModel.deletePost(newPost);
})

test('test status when slug is not unique', async () => {
    let newPost = new postModel.PostEntity(null, 'test title', 'slug test ', 'test content');
    await postModel.insertPost(newPost);
    
    let result = request('PUT', `http://localhost:8080/posts/${newPost.id}`, {
        json: {
            title: '1testetesttest',
            slug: 'slug test',
            content: '3'
        }});
    expect(await result.statusCode).toBe(400);
    
    await postModel.deletePost(newPost);
})

