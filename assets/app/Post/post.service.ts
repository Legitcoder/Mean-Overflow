import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Post} from "./post.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'


@Injectable()
export class PostService{
    private posts: Post[] = [];
    postIsEdit = new EventEmitter<Post>();
    postIsAppend = new EventEmitter<Boolean>();
    private post: Post;

    constructor(private http: Http){}

    addPost(post){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(post);
        return this.http.post('http://localhost:3000/post', body, {headers: headers})
            .map((response: Response) =>{
                const result = response.json().obj;
                console.log(result);
                const post = new Post(result.title, result.content, result._id, 'User Id');
                this.posts.push(post);
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getPost(postId){
        return this.http.get('http://localhost:3000/post/' + postId)
            .map((response: Response) =>{
                const post = new Post(response.json().obj.title, response.json().obj.content, response.json().obj._id );
                console.log(post);
                this.post = post;
                return this.post;
            })
            .catch((error: Response) => Observable.throw(error.json().obj));
    }


    getPosts(){
        this.posts = [];
        return this.http.get('http://localhost:3000/post')
            .map((response: Response) =>{
                response.json().obj.forEach((post) =>
                    this.posts.push(new Post(post.title, post.content, post._id, 'User Id')));
                return this.posts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    updatePost(post: Post){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(post);
        console.log(post);
        return this.http.patch('http://localhost:3000/post/' + post.postId , body, {headers: headers})
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
        console.log(post);
        this.posts.splice(this.posts.indexOf(post), 1);
        return this.http.delete('http://localhost:3000/post/' + post.postId)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }


}