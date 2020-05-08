export default class DbController {
    constructor(dbConnectService) {
        this.dbConnectService = dbConnectService;
    }
    getChangePath(req,res) {
        const { error } = req.query;
        res.render('dbpath', {
            blogHeaderTitle: 'KoGe Blog Project',
            error
        })
    }

    changePath(req,res) {
        const { name } = req.body;
        if(this.dbConnectService.changePathName(name)) {
            res.redirect('/admin');
            return;
        }

        res.redirect('/dbpath?error=invalidpath');
    }
}