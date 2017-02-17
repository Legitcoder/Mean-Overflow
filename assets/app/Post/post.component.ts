import {Component, Input, AfterContentInit, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";


@Component({
    selector: 'mean-post',
    templateUrl: './post.component.html',
    styles: [
        `ul{
            list-style: none;
        }

        h3{
        color: black;
        }
        `
    ]
})


export class PostComponent{
    @Input() post: Post;

    constructor(private postService: PostService){
    }

}