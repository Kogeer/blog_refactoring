export default class DbConnectService {
    constructor(blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }

    changePathName(name) {
        if(this.blogPostRepository.changePathName(name)) {
            return true;
        }
        return false;
    }
}