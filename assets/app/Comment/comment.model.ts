export class Comment {
    content: string;
    postId?: string;
    commentId?: string;
    userId?: string;
    username?: string;

    constructor(content: string, postId?: string, commentId?: string, userId?: string, username?: string) {
        this.content = content;
        this.postId = postId;
        this.commentId = commentId;
        this.userId = userId;
        this.username = username;
    }
}

