import BlogPostService from '../service/blog-post-service.js'
import PostInputsValidation from '../utils/post-inputs-validation.js'

export default class BlogPostController {
    constructor(blogPostService,postInputsValidation) {
        this.blogPostService = blogPostService;
        this.postInputsValidation = postInputsValidation
    }

    async indexPage(req, res) {
        const postsOnIndex = await this.blogPostService.getPublishedPosts();
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
        const validSlug = slug.split(' ').join('-');
        console.log(validSlug);
        const missInputs = this.postInputsValidation.inputsValidation(title,slug,content,validSlug);

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
        const postsOnAdmin = await this.blogPostService.getAllPosts();
        res.render('adminpostslist', {
            blogHeaderTitle: 'KoGe Blog Project',
            posts: postsOnAdmin
        })
    }

    async getEditPost(req,res) {
        const {id} = req.params;
        const post = await this.blogPostService.getEditPost(id);
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
        const { update } = req.query;
        const { user } = req.session;
        const validSlug = slug.replace(/\s/, '-')
        const missInputs = this.postInputsValidation.inputsValidation(title,slug,content,validSlug);

        if (Object.keys(missInputs).length) {
            res.render('editpost', {
                blogHeaderTitle: 'KoGe Blog Project',
                error: missInputs
            })
            return;
        }

        this.blogPostService.updatePost(id, user, title, validSlug, content, update);

        res.redirect('/admin');
    }

    createDraftPost(req,res) {
        const { title, slug, content } = req.body;
        const { user } = req.session;
        const validSlug = slug.split(' ').join('-');
        const missInputs = this.postInputsValidation.inputsValidation(title,slug,content,validSlug);

        if (Object.keys(missInputs).length) {
            res.render('newpost', {
                blogHeaderTitle: 'KoGe Blog Project',
                error: missInputs
            })
            return;
        }

        this.blogPostService.createDraftPost(user, title, validSlug, content);

        res.redirect('/admin');
    }
}