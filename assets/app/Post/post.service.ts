import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Post} from "./post.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'


@Injectable()
export class PostService{
     posts: Post[] = [];
    postIsEdit = new EventEmitter<Post>();
    postIsAppend = new EventEmitter<Boolean>();
     post: Post;

    constructor(private http: Http){}

    addPost(post){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(post);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://mean-overflow.herokuapp.com/post' + token, body, {headers: headers})
            .map((response: Response) =>{
                const result = response.json().obj;
                const post = new Post(result.title, result.content, result._id, result.user._id, result.user.username);
                this.posts.push(post);
                return post;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getPost(postId){
        return this.http.get('http://mean-overflow.herokuapp.com/post/' + postId)
            .map((response: Response) =>{
                const post = new Post(response.json().obj.title, response.json().obj.content, response.json().obj._id, response.json().obj.user._id, response.json().obj.user.username );
                this.post = post;
                return this.post;
            })
            .catch((error: Response) => Observable.throw(error.json().obj));
    }


    getPosts(){
        this.posts = [];
        return this.http.get('http://mean-overflow.herokuapp.com/post')
            .map((response: Response) =>{
                response.json().obj.forEach((post) =>
                    this.posts.push(new Post(post.title, post.content, post._id, post.user._id, post.user.username)));
                return this.posts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updatePost(post: Post){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(post);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://mean-overflow.herokuapp.com/post/' + post.postId + token , body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    appendPost(toggle: boolean){
        this.postIsAppend.emit(toggle);
    }

    editPost(post: Post){
        this.postIsEdit.emit(post);
    }

    deletePost(post: Post){
        this.posts.splice(this.posts.indexOf(post), 1);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.delete('http://mean-overflow.herokuapp.com/post/' + post.postId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }


}