export default class BlogPost {
    constructor(id, author, created_at, title, slug, content) {
        this.id = id;
        this.author = author;
        this.created_at = created_at;
        this.title = title;
        this.slug = slug;
        this.content = content;
    }
}