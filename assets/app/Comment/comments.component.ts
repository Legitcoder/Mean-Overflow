import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {CommentService} from "./comment.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'mean-comments',
    templateUrl: './comments.component.html'
})


export class CommentsComponent implements OnInit{
    private subscription: Subscription;
    private comments: Comment[];
    private postId;


    constructor(private commentService: CommentService, private route: ActivatedRoute){}




    ngOnInit(){
        this.getPostId();
        console.log("goes here");
        this.commentService.getComments(this.postId).subscribe(
            (comments: Comment[]) => {
                this.comments = comments;
                console.log(comments);
            }
        );
    }

    getPostId(){
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.postId = params['id'];
            }
        );
    }





}