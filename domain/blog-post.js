export default class BlogPost {
    constructor(id,author,created_at,title,content) {
        this.id = id;
        this.author = author;
        this.created_at = created_at;
        this.title = title;
        this.content = content;
    }
}