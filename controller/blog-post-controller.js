import BlogPostService from '../service/blog-post-service.js'

export default class BlogPostController {
    constructor(blogPostService) {
        this.blogPostService = blogPostService
    }

    showPosts(req,res) {
        const postsOnIndex = this.blogPostService.getPosts();
        res.render('index', {
            blogHeaderTitle : 'KoGe Blog Project',
            posts: postsOnIndex
        })
    }
}