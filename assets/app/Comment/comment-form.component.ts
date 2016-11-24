import {Component, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {CommentService} from "./comment.service";
import {Subscription} from "rxjs";


@Component({
    selector: 'mean-comment-form',
    templateUrl: './comment-form.component.html'
})
export class CommentFormComponent implements OnInit{
    private subscription: Subscription;
    private comment: Comment;
    private postId;

    constructor(private commentService: CommentService, private route: ActivatedRoute){}

    onSubmit(form: NgForm){
        this.getPostId();
        if(this.comment){

        }
        else{
            const comment = new Comment(form.value.content, this.postId);
            console.log(comment);
            this.commentService.addComment(comment).subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        }
    }



    ngOnInit(){
    }

    getPostId(){
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.postId = params['id'];
                console.log(this.postId);
            }
        );
    }
}