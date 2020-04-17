import UserService from '../service/user-service.js';

export default class UserLoginController {
    constructor(userService) {
        this.userService = userService;
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
            res.redirect('admin');
            return;
        }
        res.redirect('/login?error=credentials');
    }

    logout(req,res) {
        res.redirect('login')
    }
}