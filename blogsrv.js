import express from 'express'
const app = express()
const port = 3000

import exphbs from 'express-handlebars'
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

import path from 'path';
const __dirname = path.resolve(); //return the absolute path of the current working directory
app.use(express.static(path.join(__dirname, '/public')));

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
import bodyParser from 'body-parser'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import BlogPostController from './controller/blog-post-controller.js';
import BlogPostService from './service/blog-post-service.js';
import BlogPostRepository from './repositroy/blog-post-repository.js';
const blogPostRepository = new BlogPostRepository();
const blogPostService = new BlogPostService(blogPostRepository);
const blogPostController = new BlogPostController(blogPostService);


app.get('/', blogPostController.showPosts.bind(blogPostController))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))