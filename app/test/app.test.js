const request = require('sync-request');
const postModel = require('../src/model/post');


test('check if post was added', async () => {

    let result = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '<string>',
            slug: '<string>',
            content: '<string>',
        }
    });
    expect(result.statusCode).toBe(201);
    let payload = JSON.parse(result.body);
    expect(typeof payload.id).toBe('number');
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
    let payload = JSON.parse(result.body);
    expect(payload.errors).toEqual(["title is not a string type", "content is not a string type"]);
});


test('check are the error and status code rigth when the slug is not unique', async () => {
    let result = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '1',
            slug: '2',
            content: '3'
        }
    });
    let payload = JSON.parse(result.body);
    
    let result1 = request('POST', 'http://localhost:8080/posts', {
        json: {
            title: '1',
            slug: '2',
            content: '3'
        }
    });

    expect(result1.statusCode).toBe(400);
    let payload1 = JSON.parse(result1.body);
    expect(payload1.errors).toEqual(['The slug already exists']);
    await postModel.deletePost(payload);
})
