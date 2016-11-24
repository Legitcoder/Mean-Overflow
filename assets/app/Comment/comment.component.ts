import {Component, Input} from '@angular/core';
import {Comment} from "./comment.model";


@Component({
    selector: 'mean-comment',
    templateUrl: './comment.component.html'
})


export class CommentComponent{
    @Input() comment: Comment;
    private toggleDetails: boolean = false;

    constructor(){
    }

}