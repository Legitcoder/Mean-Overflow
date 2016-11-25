import {Component, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post.model";


@Component({
    selector: 'mean-posts',
    templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
    private posts: Post[] = [];
    togglePostForm: boolean = false;

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
        this.postService.postIsEdit.subscribe(
            (post: Post) => {
                for(var i = 0; i<=this.posts.length-1; i++){
                    if(this.posts[i].postId === post.postId){
                        this.posts[i] = post;
                    }
                }
            }
        )

        this.postService.postIsAppend.subscribe(
            (status: boolean) => {
                this.togglePostForm = !this.togglePostForm;
            }
        );
    }


}