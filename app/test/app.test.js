const postModel = require('../src/model/post');
test('check', async () => {
    let post = new postModel.PostEntity(null, 'title', 'fsssssssss6', 'content1');
    await postModel.insertPost(post);
    expect(post.id).not.toBe(null);
    let gettedPost = await postModel.getPost(post.id);
    expect(gettedPost.title).toBe(post.title);
    expect(gettedPost).toEqual(post);
    post.title = 'tytul2';
    post.slug = 'slug23';
    post.content = 'new content';
    await postModel.updatePost(post);
    let gettedPost2 = await postModel.getPost(post.id);
    expect(gettedPost2.title).toBe('tytul2');
    expect(gettedPost2.slug).toBe('slug23');
    expect(gettedPost2.content).toBe('new content');
    expect(await postModel.deletePost(post.id)).toBe(true);
    expect(await postModel.deletePost(post.id)).toBe(false);
})
test('getPosts', async () => {
    // Arrange dodac 3 posty
    let post1 = new postModel.PostEntity(null, 'first', '1dgfjdgqh1', 'text');
    let post2 = new postModel.PostEntity(null, 'second', 'ejk5g', 'tgext text');
    let post3 = new postModel.PostEntity(null, 'third', 'deddjsfe3', 'texjt text text');
    await postModel.insertPost(post1);
    await postModel.insertPost(post2);
    await postModel.insertPost(post3);
    expect(post1.id).not.toBe(null);
    expect(post2.id).not.toBe(null);
    expect(post3.id).not.toBe(null);
    // Act wyswietlic
    let match = 0;

    function comparePost(post1, post2) {
        if (post1.title === post2.title && post1.slug === post2.slug && post1.content === post2.content) {
            return true;
        } else {
            return false;
        }
    }
    let gettedPosts = await postModel.getPostsS();
    for (let i = 0; i < gettedPosts.length; i++) {
        expect(gettedPosts[i] instanceof postModel.PostEntity).toBeTruthy();

        if (comparePost(gettedPosts[i], post1)) {
            match++;
        }
        if (comparePost(gettedPosts[i], post2)) {
            match++;
        }
        if (comparePost(gettedPosts[i], post3)) {
            match++;
        }
    }
    // Assert usunac
    expect(await postModel.deletePost(post1.id)).toBe(true);
    expect(await postModel.deletePost(post2.id)).toBe(true);
    expect(await postModel.deletePost(post3.id)).toBe(true);
    expect(match).toEqual(3);
})