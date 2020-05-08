import BlogPost from '../domain/blog-post.js'
import sqlite3 from 'sqlite3'
import fs from 'fs'
let dbpath = '';
let db = new sqlite3.Database(dbpath);

export default class BlogPostRepository {
    constructor(dbConnectService) {
        this.dbConnectService = dbConnectService;
    }

    createDatabase() {
        db.serialize(function () {
            db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author VARCHAR(20), created_at VARCHAR(20), title TEXT, slug TEXT, content TEXT, isPublished INTEGER)");
        })
    }

    getAllPublishedPosts() {
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.all("SELECT * FROM posts WHERE isPublished = 1 ORDER BY created_at DESC", function (err, posts) {
                    if (err) {
                        reject(err)
                    }

                    const indexPosts = posts.map(post => {
                        return new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content, post.isPublished);
                    })
                    resolve(indexPosts)
                });
            })
        })
    }

    getAllPosts() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all("SELECT * FROM posts ORDER BY created_at DESC", function (err,posts) {
                    if(err) {
                        reject(err)
                    }

                    const thePosts = posts.map(post => {
                        return new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content, post.isPublished);
                    })
                    resolve(thePosts);
                })
            })
        })
    }

    publishNewPost(post) {
        db.serialize(function () {
            db.run("INSERT INTO posts (author,created_at,title,slug,content,isPublished) VALUES (?,datetime('now','localtime'),?,?,?,?)",
                [post.author, post.title, post.slug, post.content, post.isPublished]);
        })
    }

    addNewDraft(post) {
        db.serialize(function() {
            db.run("INSERT INTO posts (author,created_at,title,slug,content,isPublished) VALUES (?,?,?,?,?,?)",
            [post.author,post.created_at,post.title,post.slug,post.content,post.isPublished])
        })
    }

    readPostById(id) {
        return new Promise((resolve, reject) => {
            db.serialize(function () {
                db.get("SELECT * FROM posts WHERE id = ? and isPublished = 1", id, function (err, post) {
                    if (err) {
                        reject(err);
                    }

                    if (post !== undefined) {
                        const blogPost = new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content, post.isPublished);
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
                db.get("SELECT * FROM posts WHERE slug = ? and isPublished = 1", slug, function (err, post) {
                    if (err) {
                        reject(err);
                    }

                    if (post !== undefined) {
                        const blogPost = new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content, post.isPublished);
                        resolve(blogPost);
                    }
                    
                    reject(new Error('No post with slug'))
                })
            })
        })
    }

    getEditPost(id) {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.get("SELECT * FROM posts WHERE id = ?", id, function(err,post) {
                    if(err) {
                        reject(err);
                    }

                    if(post !== undefined) {
                        const blogPost = new BlogPost(post.id,post.author,post.created_at,post.title,post.slug,post.content,post.isPublished);
                        resolve(blogPost);
                    }

                    reject(new Error('No editable post with id'));
                })
            })
        })
    }

    updatePublishedPost(post) {
        db.serialize(function() {
            db.run("UPDATE posts SET created_at = ?, title = ?, slug = ?, content = ?, isPublished = ? WHERE id = ?",
            [post.created_at,post.title,post.slug,post.content,post.isPublished,post.id])
        })
    }

    updateToPublishPost(post) {
        db.serialize(function() {
            db.run("UPDATE posts SET created_at = datetime('now','localtime'), title = ?, slug = ?, content = ?, isPublished = ? WHERE id = ?",
            [post.title,post.slug,post.content,post.isPublished,post.id])
        })
    }

    updateDraftPost(post) {
        db.serialize(function() {
            db.run("UPDATE posts SET created_at = ?, title = ?, slug = ?, content = ?, isPublished = ? WHERE id = ?", 
            [post.created_at,post.title,post.slug,post.content,post.isPublished,post.id])
        })
    }

    postIsPublished(id) {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.get("SELECT isPublished, created_at FROM posts WHERE id = ?", id, function (err,isPublished) {
                    if(err) {
                        resolve(err)
                    }
                    resolve(isPublished);
                })
            })
        })
    }

    archivedPosts() {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all("SELECT id,title,created_at FROM posts WHERE isPublished = 1 ORDER BY created_at DESC", function(err,posts) {
                    if(err) {
                        reject(err);
                    }
                    resolve(posts)
                })
            })
        })
    }

    searchPostContent(content) {
        return new Promise((resolve,reject) => {
            db.serialize(function() {
                db.all(`SELECT * FROM posts WHERE title LIKE "%${content}%" OR content LIKE "%${content}%" ORDER BY created_at DESC`,function(err,posts) {
                    if(err) {
                        reject(err);
                    }

                    const searchedPosts = posts.map(post => {
                        return new BlogPost(post.id, post.author, post.created_at, post.title, post.slug, post.content, post.isPublished);
                    })
                    resolve(searchedPosts);
                })
            })
        })
    }

    changePathName(name) {
        if(fs.existsSync(name)) {
            db.close();
            dbpath = `./${name}`;
            db = new sqlite3.Database(name);
            return true;
        }
        return false;
    }
}
