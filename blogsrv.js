import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import BlogPostController from './controller/blog-post-controller.js';
import BlogPostService from './service/blog-post-service.js';
import BlogPostRepository from './repositroy/blog-post-repository.js';
import UserLoginController from './controller/user-login-controller.js';
import UserService from './service/user-service.js';
import SessionService from './service/session-service.js';
import cookieParser from 'cookie-parser'

const app = express();
const port = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const __dirname = path.resolve(); //return the absolute path of the current working directory
app.use(express.static(path.join(__dirname, '/public')));

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const blogPostRepository = new BlogPostRepository();
const blogPostService = new BlogPostService(blogPostRepository);
const blogPostController = new BlogPostController(blogPostService);
const userService = new UserService();
const sessionService = new SessionService();
const userLoginController = new UserLoginController(userService,sessionService);

const cookieAuthentication = userLoginController.cookieAuth.bind(userLoginController);

app.get('/', blogPostController.indexPage.bind(blogPostController));
app.get('/login', userLoginController.userLoginPage.bind(userLoginController));
app.post('/login', userLoginController.loggingIn.bind(userLoginController));
app.get('/admin', cookieAuthentication, userLoginController.adminPage.bind(userLoginController));
app.get('/logout', userLoginController.logout.bind(userLoginController));
app.get('/newpost', cookieAuthentication, blogPostController.newPostPage);
app.post('/newpost', cookieAuthentication, blogPostController.createNewPost.bind(blogPostController));
app.get('/posts/:id', blogPostController.readPost.bind(blogPostController));

app.listen(port, () => {
    blogPostRepository.createDatabase();
    console.log(`Example app listening at http://localhost:${port}`);
});