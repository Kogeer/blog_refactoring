export default class SessionService {
    constructor() {
        this.session = []
        this.AUTH_COOKIE = 'authcookie'
    }

    registrateSession(username) {
        const session = {user:username};
        this.session.push(session);
        return session;
    }

    isValidSession(req,res,next) {
        const sessionIsValid = this.session.find(s => {
            if(s.user === req.cookies.authcookie) {
                return s;
            }
        })

        if(!sessionIsValid) {
            res.redirect('login');
            return false;
        }
        req.session = sessionIsValid;
        next();
        return true;
    }

    deleteSession(userSession) {
        this.session.filter(s => s.user !== userSession)
        return true;
    }
}