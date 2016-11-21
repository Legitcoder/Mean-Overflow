import {Component, OnInit} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'mean-post-details',
    templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit {
    private subscription: Subscription;
    private postId: Post;
    private selectedPost;

    constructor(private postService: PostService, private route: ActivatedRoute){

    }

    ngOnInit(){
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.postId = params['id'];
                this.postService.getPost(this.postId).subscribe(
                    post => this.selectedPost = post,
                    error => console.log(error)
                );
            }
        );
    }



    onEdit(){
        this.postService.editPost(this.selectedPost);
    }

    onDelete(){
        this.postService.deletePost(this.selectedPost).subscribe(
            result => console.log(result),
            error => console.log(error)
        )
    }


}