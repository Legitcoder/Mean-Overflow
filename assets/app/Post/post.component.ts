import {Component, Input} from '@angular/core';
import {Post} from "./post.model";


@Component({
    selector: 'mean-post',
    templateUrl: './post.component.html',
    styles: [
        `ul{
            list-style: none;
        }`
    ]
})


export class PostComponent {
    @Input() post: Post;

}