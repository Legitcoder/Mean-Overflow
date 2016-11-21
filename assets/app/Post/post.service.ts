import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx';
import {Post} from "./post.model";


@Injectable()
export class PostService{
    private posts: Post[] = [];

    constructor(private http: Http){}

    addPost(post){
        const headers = new Headers({'Content-Type': 'application/json'});
        const body = JSON.stringify(post);
        return this.http.post('http://localhost:3000/post', body, {headers: headers})
            .map((response: Response) =>{
                const result = response.json().obj;
                const post = new Post(result.title, result.content, result._id, 'User Id');
                this.posts.push(post);
            });

    }


    getPosts(){
        return this.http.get('http://localhost:3000/post')
            .map((response: Response) =>{
                response.json().obj.forEach((post) =>
                    this.posts.push(new Post(post.title, post.content, post._id, 'User Id')));
                return this.posts;
            });
    }


}