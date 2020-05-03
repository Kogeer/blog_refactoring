import BlogPost from '../domain/blog-post.js'
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('blogposts.db');

export default class BlogPostRepository {

    createDatabase() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(20), created_at VARCHAR(20), title TEXT, slug TEXT, content TEXT)");
        })
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.all("SELECT * FROM posts ORDER BY created_at DESC", function (err, posts) {
                    if (err) {
                        reject(err)
                    }
                    // console.log(posts);
                    const thePosts = posts.map(post => {
                        return new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content);
                    })
                    resolve(thePosts)
                });
            })
        })
    }

    publishNewPost(post) {
        db.serialize(function () {
            db.run("INSERT INTO posts (author,created_at,title,slug,content) VALUES (?,datetime('now','localtime'),?,?,?)",
                [post.author, post.title, post.slug, post.content]);
        })
    }

    readPostById(id) {
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.get("SELECT * FROM posts WHERE id = ?", id, function (err, post) {
                    if (err) {
                        reject(err);
                    }

                    if (post !== undefined) {
                        console.log(post)
                        const blogPost = new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content)
                        resolve(blogPost);
                    }

                    reject(new Error('No post with id'))
                })
            })
        })
    }

    readPostBySlug(slug) {
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.get("SELECT * FROM posts WHERE slug = ?", slug, function (err, post) {
                    if (err) {
                        reject(err);
                    }

                    if (post !== undefined) {
                        console.log(post)
                        const blogPost = new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content)
                        resolve(blogPost);
                    }

                    reject(new Error('No post with slug'))
                })
            })
        })
    }

}
