import UserService from '../service/user-service.js';

export default class UserLoginController {
    constructor(userService,sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    userLoginPage(req,res) {
        const {error} = req.query;
        res.render('login', {
            blogHeaderTitle : 'KoGe Blog Project',
            error: error
        })
    }

    adminPage(req,res) {
        res.render('admin', {
            blogHeaderTitle : 'KoGe Blog Project'
        })
    }

    loggingIn(req,res) {
        const {username,password} = req.body;
        const isValid = this.userService.validUser(username,password);
        if(isValid) {
            const session = this.sessionService.registrateSession(username);
            res.cookie(this.sessionService.AUTH_COOKIE,session.user).redirect('admin');
            return;
        }
        res.redirect('/login?error=credentials');
    }

    cookieAuth(req,res,next) {
        return this.sessionService.isValidSession(req,res,next);
    }

    logout(req,res) {
        const userSession = req.cookies.user
        this.sessionService.deleteSession(userSession)
        res.clearCookie(this.sessionService.AUTH_COOKIE)
        res.redirect('/login')
    }
}