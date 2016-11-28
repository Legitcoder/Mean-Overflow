import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Comment} from "./comment.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'


@Injectable()
export class CommentService{
     comments: Comment[] = [];
    commentIsEdit = new EventEmitter<Comment>();
    commentIsMount = new EventEmitter<boolean>();
     comment: Comment;

    constructor(private http: Http){}


    addComment(comment){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(comment);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('https://mean-overflow-2.herokuapp.com/comment' + token, body, {headers: headers})
            .map((response: Response) =>{
                const result = response.json().obj;
                console.log(result);
                const comment = new Comment(result.content, result.postId, result._id, result.user._id, result.user.username);
                this.comments.push(comment);
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getComments(postId){
        this.comments = [];
        return this.http.get('https://mean-overflow-2.herokuapp.com/comment/' + postId)
            .map((response: Response) =>{
                console.log(response.json().obj);
                response.json().obj.forEach((comment) =>
                    this.comments.push(new Comment(comment.content, comment.post._id, comment._id, comment.user._id, comment.user.username)));
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
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('https://mean-overflow-2.herokuapp.com/comment/' + comment.commentId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }



    deleteComment(comment){
        this.comments.splice(this.comments.indexOf(comment), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('https://mean-overflow-2.herokuapp.com/comment/' + comment.commentId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }







}