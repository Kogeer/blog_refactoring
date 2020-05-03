import BlogPostService from '../service/blog-post-service.js'

export default class BlogPostController {
    constructor(blogPostService) {
        this.blogPostService = blogPostService
    }

    async indexPage(req,res) {
        const postsOnIndex = await this.blogPostService.getPosts();
        res.render('index', {
            blogHeaderTitle : 'KoGe Blog Project',
            posts: postsOnIndex
        })
    }

    newPostPage(req,res) {
        res.render('newpost', {
            blogHeaderTitle: 'KoGe Blog Project'
        });
    }

    createNewPost(req,res) {
        const {title,content} = req.body;
        const {user} = req.session;
        const missInputs = {};

        if(!title) {
            missInputs.title = 'Title is required'
        }
        if(!content) {
            missInputs.content = 'Content is required'
        }

        if(Object.keys(missInputs).length) {
            res.render('newpost', {
                blogHeaderTitle: 'KoGe Blog Project',
                error: missInputs
            })
            return;
        }

        this.blogPostService.createNewPost(user,title,content);
        
        res.redirect('admin');
    }

    async readPost(req,res) {
        const {id} = req.params;
        const post = await this.blogPostService.readPost(id);

        if(!post) {
            res.redirect('/');
            return;
        }
        
        res.render('readpost', {
            blogHeaderTitle: 'KoGe Blog Project',
            post
        })
    }
}