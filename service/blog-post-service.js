import BlogPostRepository from '../repositroy/blog-post-repository.js'
import BlogPost from '../domain/blog-post.js'

export default class BlogPostService {
    constructor(BlogPostRepository) {
        this.blogPostRepository = BlogPostRepository
    }

    getPosts() {
        return this.blogPostRepository.getAllPosts();
    }

    createNewPost(user, title, slug, content) {
        const mockId = 0;
        const mockTime = new Date();
        const post = new BlogPost(mockId, user, mockTime, title, slug, content);
        this.blogPostRepository.publishNewPost(post);
    }

    async readPost(id) {
        if (!isNaN(id)) {
            try {
                const post = await this.blogPostRepository.readPostById(id);
                return post;
            }
            catch (e) {
                console.log(e);
            }
        }

        try {
            const post = await this.blogPostRepository.readPostBySlug(id);
            return post;
        } catch (e) {
            console.log(e);
        }
    }

    updatePost(id,user,title,slug,content) {
        const mockTime = new Date();
        const post = new BlogPost(+id,user,mockTime,title,slug,content);
        this.blogPostRepository.updatePost(post);
    }
}

