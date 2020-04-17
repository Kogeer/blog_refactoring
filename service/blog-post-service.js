import BlogPostRepository from '../repositroy/blog-post-repository.js'

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
}

