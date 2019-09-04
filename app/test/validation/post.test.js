const postModel = require('../../src/model/post');
const validation = require('../../src/validation/post');

test('check the validation: no errors', async () => {
    let post = new postModel.PostEntity(null, 'titletitletitle', 'slug', 'content');

    let result = await validation.validatePost(post);
    expect(result).toEqual([]);
})

test('check the validation: title is not a string type', async () => {
    let post = new postModel.PostEntity(null, 2, 'slug', 'content');

    let result = await validation.validatePost(post);
    expect(result).toContain('title is not a string type');
})

test('check the validation: polish signs in slug', async () => {
    let post = new postModel.PostEntity(null, '222222222222222', 'ą', 'content');

    let result = await validation.validatePost(post);
    expect(result).toContain('Slug can not contain polish signs');
})

test('check the validation: content is not a string type', async () => {
    let post = new postModel.PostEntity(null, 'titletitletitle', 'slug', 2);

    let result = await validation.validatePost(post);
    expect(result).toContain('content is not a string type');
})
test('check the validation: slug already exists', async () => {
    let post = new postModel.PostEntity(
        null,
        'first ttitletitleest title',
        'test slug',
        'test content 1'
    );
    postModel.insertPost(post);

    let testPost = new postModel.PostEntity(null, 'secondtitletitle test title', 'test slug', 'test content 2');

    let result = await validation.validatePost(testPost);
    expect(result).toContain('The slug already exists');

    await postModel.deletePost(post);
})

test('check the validation: title is too short', async () => {
    let post = new postModel.PostEntity(null, 's', 'slug', 'content');

    let result = await validation.validatePost(post);
    expect(result).toContain('title must be at least 4 characters long');
})

test('check the validation: slug has forbidden signs', async () => {
    let word = 'ąęź';

    let result = await validation.hasForbiddenSigns(word);
    expect(result).toBe(true);
})

test('check the validation: slug is not a string type', async () => {
    expect(() => validation.hasForbiddenSigns(99)).toThrow('slug has to be a string');
})