import {Component, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {NgForm} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {CommentService} from "./comment.service";
import {Subscription} from "rxjs";
import {Response} from "@angular/http";


@Component({
    selector: 'mean-comment-form',
    templateUrl: './comment-form.component.html'
})
export class CommentFormComponent implements OnInit{
     subscription: Subscription;
     comment: Comment;
     postId;
     toggleForm: boolean = false;

    constructor(private commentService: CommentService, private route: ActivatedRoute){}

    onSubmit(form: NgForm){
        this.getPostId();
        if(this.comment){
            this.commentService.mountComment(true);
            this.comment.content = form.value.content;
            this.commentService.updateComment(this.comment).subscribe(
                (results) => console.log(results),
                (error) => console.log(error)
            );
        }
        else{
            this.commentService.mountComment(true);
            const comment = new Comment(form.value.content, this.postId);
            console.log(comment);
            this.commentService.addComment(comment).subscribe(
                data => console.log(data),
                error => console.log(error)
            );
        }
        this.onClear(form);
    }

    onClear(form: NgForm){
        form.resetForm();
    }



    ngOnInit(){
        this.commentService.commentIsEdit.subscribe(
            (comment: Comment) => {
                console.log(comment);
                this.comment = comment;
            }
        );

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