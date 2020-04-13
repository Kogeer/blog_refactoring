import BlogPostRepository from '../repositroy/blog-post-repository.js'

export default class BlogPostService {
    constructor(BlogPostRepository) {
        this.blogPostRepository = BlogPostRepository
    }

    /**
     * return Blog Posts in Array
     */
    getPosts() {
        // happy path
        // test outputs
        // branch
        // thrown error
        // test input
        // code coverage (line coverage, branch coverage, function coverage)

        return this.blogPostRepository.getAllPosts();
    }
}

