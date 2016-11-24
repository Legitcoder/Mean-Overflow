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
                console.log(response.json());
                response.json().obj.forEach((comment) =>
                    this.comments.push(new Comment(comment.content, comment._id, comment.postId, 'User Id')));
                return this.comments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getComment(commentId){
        return this.http.get('http://localhost:3000/comment/' + commentId)
            .map((response: Response) =>{
                const comment = new Comment(response.json().obj.content, response.json().obj._id, response.json().obj.postId, 'User Id');
                console.log(comment);
                this.comment = comment;
                return this.comment;
            })
            .catch((error: Response) => Observable.throw(error.json().obj));
    }







}