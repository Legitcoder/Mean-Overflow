import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Comment} from "./comment.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'


@Injectable()
export class CommentService{
    private comments: Comment[] = [];
    commentIsEdit = new EventEmitter<Comment>();
    commentIsMount = new EventEmitter<boolean>();
    private comment: Comment;

    constructor(private http: Http){}


    addComment(comment){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(comment);
        return this.http.post('http://localhost:3000/comment', body, {headers: headers})
            .map((response: Response) =>{
                const result = response.json().obj;
                console.log(result);
                const comment = new Comment(result.content, result.postId, result._id, 'User Id');
                this.comments.push(comment);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getComments(postId){
        this.comments = [];
        return this.http.get('http://localhost:3000/comment/' + postId)
            .map((response: Response) =>{
                console.log(response.json().obj);
                response.json().obj.forEach((comment) =>
                    this.comments.push(new Comment(comment.content, comment.post._id, comment._id, 'User Id')));
                return this.comments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editComment(comment){
        this.commentIsEdit.emit(comment);
    }

    mountComment(status){
        this.commentIsMount.emit(status);
    }

    updateComment(comment){
        const headers = new Headers({'Content-Type' : 'application/json'});
        const body = JSON.stringify(comment);
        return this.http.patch('http://localhost:3000/comment/' + comment.commentId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    // getComment(commentId){
    //     return this.http.get('http://localhost:3000/comment/' + commentId)
    //         .map((response: Response) =>{
    //             const comment = new Comment(response.json().obj.content, response.json().obj._id, response.json().obj.postId, 'User Id');
    //             console.log(comment);
    //             this.comment = comment;
    //             return this.comment;
    //         })
    //         .catch((error: Response) => Observable.throw(error.json().obj));
    // }


    deleteComment(comment){
        this.comments.splice(this.comments.indexOf(comment), 1);
        console.log(comment);
        return this.http.delete('http://localhost:3000/comment/' + comment.commentId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }







}