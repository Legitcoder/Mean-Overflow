import {Component, Input} from '@angular/core';
import {Comment} from "./comment.model";


@Component({
    selector: 'mean-comment',
    templateUrl: './comment.component.html',
    styles: [
        `ul{
            list-style: none;
        }`
    ]
})


export class PostComponent{
    @Input() comment: Comment;

    constructor(){
    }

}