import BlogPostRepository from '../repositroy/blog-post-repository.js'
import BlogPost from '../domain/blog-post.js'

export default class BlogPostService {
    constructor(BlogPostRepository,archiveObjectGenerator) {
        this.blogPostRepository = BlogPostRepository;
        this.archiveObjectGenerator = archiveObjectGenerator;
    }

    getPublishedPosts() {
        return this.blogPostRepository.getAllPublishedPosts();
    }

    getAllPosts() {
        return this.blogPostRepository.getAllPosts();
    }

    createNewPost(user, title, slug, content) {
        const mockId = 0;
        const mockTime = new Date();
        const isPublished = 1;
        const post = new BlogPost(mockId, user, mockTime, title, slug, content, isPublished);
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
                return;
            }
        }

        try {
            const post = await this.blogPostRepository.readPostBySlug(id);
            return post;
        } catch (e) {
            console.log(e);
        }
    }

    async getEditPost(id) {
        try {
            const post = await this.blogPostRepository.getEditPost(id);
            return post;
        }
        catch (e) {
            console.log(e);
        }
    }

    async updatePost(id,user,title,slug,content,update) {
        const postIsPublished = await this.blogPostRepository.postIsPublished(id);
        if(update === 'draft') {
            const draftTime = 'N/A';
            const isPublished = 0;
            const post = new BlogPost(+id,user,draftTime,title,slug,content,isPublished);
            this.blogPostRepository.updateDraftPost(post);
            return;
        }

        if(postIsPublished.isPublished) {
            const isPublished = 1;
            const post = new BlogPost(+id,user,postIsPublished.created_at,title,slug,content,isPublished)
            this.blogPostRepository.updatePublishedPost(post)
            return;
        }

        const mockTime = new Date();
        const isPub = 1;
        const post = new BlogPost(+id,user,mockTime,title,slug,content,isPub);
        this.blogPostRepository.updateToPublishPost(post);
    }

    createDraftPost(user,title,slug,content) {
        const mockId = 0;
        const noTime = 'N/A';
        const isPublished = 0;
        const post = new BlogPost(mockId, user, noTime, title, slug, content, isPublished);
        this.blogPostRepository.addNewDraft(post);
    }

    async archivedPosts() {
        const posts = await this.blogPostRepository.archivedPosts();
        const archiv = this.archiveObjectGenerator.generateArchive(posts);
        return archiv;
    }

    async searchPostContent(content) {
        const searchedPosts = await this.blogPostRepository.searchPostContent(content);
        return searchedPosts;
    }
}

