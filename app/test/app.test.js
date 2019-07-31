const postModel = require('../src/model/post');

test('add, update and delete post', async () => {

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
test('add, check and delete posts', async () => {

    let post1 = new postModel.PostEntity(null, 'first', '1ddgdrtffjdgqh1', 'text');
    let post2 = new postModel.PostEntity(null, 'second', 'ejfsdk5g', 'tgext text');
    let post3 = new postModel.PostEntity(null, 'third', 'dedddsfdjsfe3', 'texjt text text');

    await postModel.insertPost(post1);
    await postModel.insertPost(post2);
    await postModel.insertPost(post3);

    function comparePost(post1, post2) {
        if (post1.title === post2.title && post1.slug === post2.slug && post1.content === post2.content) {
            return true;
        } else {
            return false;
        }
    }
    let gettedPosts = await postModel.getPosts();
    let match = 0;

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
    expect(match).toEqual(3);
    await postModel.deletePost(post1.id);
    await postModel.deletePost(post2.id);
    await postModel.deletePost(post3.id);

 
})
