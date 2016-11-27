export class Post {
    title: string;
    content: string;
    postId?: string;
    userId?: string;
    username: string

    constructor(title: string, content: string, postId?: string, userId?: string, username?: string) {
        this.title = title;
        this.content = content;
        this.postId = postId;
        this.userId = userId;
        this.username = username;
    }
}