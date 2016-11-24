export class Comment {
    content: string;
    postId?: string;
    commentId?: string;
    userId?: string;

    constructor(content: string, postId?: string, commentId?: string, userId?: string) {
        this.content = content;
        this.postId = postId;
        this.commentId = commentId;
        this.userId = userId;
    }
}

