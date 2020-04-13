import BlogPostRepository from './blog-post-repository.js'

describe('BlogPostRepository', () => {
    describe('getAllPosts', () => {

        it('should return list of BlogPost objects in Array', () => {
            // AAA: arrange act assert

            // arrange
            const expected = [
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
            const blogPostRepository = new BlogPostRepository()

            // act
            const actual = blogPostRepository.getAllPosts()

            // assert
            expect(actual).toEqual(expected)
        })
    })
})