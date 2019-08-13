const request = require('sync-request');

test('check if title is string type', ()=>{
    let result = request('POST', 'http://localhost:8080/posts',{
        json: {
            title: '<string>',
            slug: '<string>',
            content: '<string>',
        }
    });
    expect(result.statusCode).toBe(201);
    let payload = JSON.parse(result.body);
    expect(payload.title).toBe("<string>");
    expect(payload.slug).toBe("<string>");
    expect(payload.content).toBe("<string>");
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
