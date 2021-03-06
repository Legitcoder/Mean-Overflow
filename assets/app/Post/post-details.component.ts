import {Component, OnInit, OnDestroy} from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'mean-post-details',
    templateUrl: './post-details.component.html'
})
export class PostDetailsComponent implements OnInit, OnDestroy {
     subscription: Subscription;
     postId: Post;
     selectedPost;
     toggleForm: boolean = false;
     toggleDetails: boolean = false;

    constructor(private postService: PostService, private route: ActivatedRoute, private router: Router){

    }

    ngOnInit(){
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.postId = params['id'];
                console.log(this.postId);
                this.postService.getPost(this.postId).subscribe(
                    post => this.selectedPost = post,
                    error => console.log(error)
                );
            }
        );
        this.postService.postIsAppend.subscribe(
            (bool: boolean) => {
                this.toggleDetails = bool;
            }
        )
    }



    onEdit(){
        this.postService.editPost(this.selectedPost);
    }

    onDelete(){
        this.postService.deletePost(this.selectedPost).subscribe(
            result => console.log(result),
            error => console.log(error)
        )
        this.router.navigate(['/posts']);
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    belongsToUser(){
        return localStorage.getItem('userId') == this.selectedPost.userId;
    }



}