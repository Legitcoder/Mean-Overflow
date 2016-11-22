import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
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
        console.log(this.posts);
        this.postService.getPosts().subscribe(
            (posts: Post[]) => {
                this.posts = posts;
                console.log(posts);
            }
        )
    }


}