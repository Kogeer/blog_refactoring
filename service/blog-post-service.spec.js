import BlogPostService from './blog-post-service.js'

describe('BlogPostService', () => {
    describe('getPosts', () => {

        it('should return list of blogposts from service', () => {
            // AAA: arrange act assert

            // arrange
            const expected = [
                {author:'Somebody',title:'Some title', content:'Some content'},
                {author:'Somebody',title:'Some title', content:'Some content'},
                {author:'Somebody',title:'Some title', content:'Some content'}
            ]
            const mockRepo = {
                getAllPosts: () => expected
            }
            const blogPostService = new BlogPostService(mockRepo)

            // act
            const actual = blogPostService.getPosts()

            // assert
            expect(actual).toEqual(expected)
        })
    })
})