import {Component, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post.model";
@Component({
    selector: 'mean-posts',
    templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
    private posts: Post[] = [];

    constructor(private postService: PostService){

    }

    ngOnInit(){
        this.postService.getPosts().subscribe(
            (posts: Post[]) => {
                this.posts = posts;
            }
        )
    }


}