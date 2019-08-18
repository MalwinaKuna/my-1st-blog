const request = require('sync-request');
const postModel = require('../src/model/post');

test('check if title is string type', async ()=>{
    let result = request('POST', 'http://localhost:8080/posts',{
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

test('check if title is string type', ()=>{
    let result = request('POST', 'http://localhost:8080/posts',{
        json: {
            title: 2,
            slug: '<string>',
            content: 3,
        }
    });
    expect(result.statusCode).toBe(400);
    let payload = JSON.parse(result.body);
    expect(payload.Errors).toEqual(["title is not a string type","content is not a string type"]);
});

