import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {CommentService} from "./comment.service";


@Component({
    selector: 'mean-comment',
    templateUrl: './comment.component.html',
    styles: [
        `ul{
            list-style: none;
        }`
    ]
})


export class CommentComponent implements OnInit{
    @Input() comment: Comment;
    private showComment: boolean = true;

    constructor(private commentService: CommentService){
    }

    onDelete(){
        this.commentService.deleteComment(this.comment).subscribe(
            (data) => console.log(data),
            (error) => console.log(error)
        );
    }

    ngOnInit(){
        this.commentService.commentIsMount.subscribe(
            (status: boolean) => this.showComment = true
        );
    }

    onEdit(){
        this.commentService.editComment(this.comment);
    }


    belongsToUser(){
        return localStorage.getItem('userId') == this.comment.userId;
    }


}