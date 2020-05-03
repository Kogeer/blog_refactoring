import BlogPostRepository from '../repositroy/blog-post-repository.js'
import BlogPost from '../domain/blog-post.js'

export default class BlogPostService {
    constructor(BlogPostRepository) {
        this.blogPostRepository = BlogPostRepository
    }

    /**
     * return Blog Posts in Array
     */
    getPosts() {
        return this.blogPostRepository.getAllPosts();
    }

    createNewPost(user,title,content) {
        const mockId = 0;
        const mockTime = new Date();
        const post = new BlogPost(mockId,user,mockTime,title,content);
        this.blogPostRepository.publishNewPost(post)
    }
    
    async readPost(id) {
        try {
            const post = await this.blogPostRepository.readPost(id)
            return post;
        }
        catch(e) {
            console.log(e)
        }
    }
}

