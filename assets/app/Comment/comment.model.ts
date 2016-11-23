export class Comment {
    content: string;
    postId?: string;
    userId?: string;

    constructor(title: string, content: string, commentId?: string, userId?: string) {
        this.content = content;
        this.postId = commentId;
        this.userId = userId;
    }
}

