import BlogPostRepository from '../repositroy/blog-post-repository.js'
import BlogPostService from './blog-post-service.js'
import BlogPost from '../domain/blog-post.js'

// test('The posts is object with right keys', () => {
//     const postObject = new BlogPost('valaki','valami cím','valami content')
//     const testObject = new BlogPostService(new BlogPostRepository());

    

//     expect(Object.keys(postObject)).toEqual(Object.keys(testObject.getPosts()[0]))
// })

// test('The posts is Array ?', () => {
//     const testObject = new BlogPostService(new BlogPostRepository());

//     expect(testObject.getPosts()).toBeInstanceOf(Array)
// })

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