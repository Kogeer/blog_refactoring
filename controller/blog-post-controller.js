import BlogPostService from '../service/blog-post-service.js'

export default class BlogPostController {
    constructor(blogPostService) {
        this.blogPostService = blogPostService
    }

    async indexPage(req, res) {
        const postsOnIndex = await this.blogPostService.getPosts();
        res.render('index', {
            blogHeaderTitle: 'KoGe Blog Project',
            posts: postsOnIndex
        })
    }

    newPostPage(req, res) {
        res.render('newpost', {
            blogHeaderTitle: 'KoGe Blog Project'
        });
    }

    createNewPost(req, res) {
        const { title, slug, content } = req.body;
        const { user } = req.session;
        const missInputs = {};
        const validSlug = slug.split(' ').join('-');

        if (!title) {
            missInputs.title = 'Title is required'
        }
        if (!content) {
            missInputs.content = 'Content is required'
        }
        if (!slug) {
            missInputs.slug = 'Slug is required'
        }
        if (validSlug && !validSlug.match(/^[0-9a-z.\-]+$/)) {
            console.log('Rossz is')
            missInputs.slug = 'Invalid slug, only alphanumeric characters without accents!'
        }

        if (Object.keys(missInputs).length) {
            res.render('newpost', {
                blogHeaderTitle: 'KoGe Blog Project',
                error: missInputs
            })
            return;
        }

        this.blogPostService.createNewPost(user, title, validSlug, content);

        res.redirect('admin');
    }

    async readPost(req, res) {
        const { id } = req.params;
        const post = await this.blogPostService.readPost(id);

        if (!post) {
            res.redirect('/');
            return;
        }

        res.render('readpost', {
            blogHeaderTitle: 'KoGe Blog Project',
            post
        })
    }

    async adminPostsList(req,res) {
        const postsOnAdmin = await this.blogPostService.getPosts();
        res.render('adminpostslist', {
            blogHeaderTitle: 'KoGe Blog Project',
            posts: postsOnAdmin
        })
    }

    async getEditPost(req,res) {
        const {id} = req.params;
        const post = await this.blogPostService.readPost(id);
        if(!post) {
            res.redirect('/');
            return;
        }

        res.render('editpost', {
            blogHeaderTitle: 'KoGe Blog Project',
            post
        })
    }

    async updatePost(req,res) {
        const { title, slug, content } = req.body;
        const {id} = req.params;
        const { user } = req.session;
        const missInputs = {};
        const validSlug = slug.replace(/\s/, '-')

        if (!title) {
            missInputs.title = 'Title is required'
        }
        if (!content) {
            missInputs.content = 'Content is required'
        }
        if (!slug) {
            missInputs.slug = 'Slug is required'
        }
        if (validSlug && !validSlug.match(/^[0-9a-z.\-]+$/)) {
            missInputs.slug = 'Invalid slug, only alphanumeric characters without accents!'
        }

        if (Object.keys(missInputs).length) {
            res.render('editpost', {
                blogHeaderTitle: 'KoGe Blog Project',
                error: missInputs
            })
            return;
        }

        this.blogPostService.updatePost(id, user, title, validSlug, content);

        res.redirect('/admin');
    }
}