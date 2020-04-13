import BlogPost from '../domain/blog-post.js'

const posts = [
    {
        author: 'admin',
        title: 'Ducati V4',
        content: 'The new Ducati is unbeleivable!'
    },
    {
        author: 'admin',
        title: 'Café racers',
        content: 'The café racers are the most designed motors!'
    }
]

export default class BlogPostRepository {
    /**
     * Return blog posts with domain object
     */
    getAllPosts() {
        const posts = [
            {
                author: 'admin',
                title: 'Ducati V4',
                content: 'The new Ducati is unbeleivable!'
            },
            {
                author: 'admin',
                title: 'Café racers',
                content: 'The café racers are the most designed motors!'
            }
        ]
        
        const blogPosts = posts.map(post => {
            return new BlogPost(post.author,post.title,post.content)
        })

        return blogPosts;
    }
}
