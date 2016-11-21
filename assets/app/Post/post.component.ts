import {Component, Input} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";


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

    constructor(private postService: PostService){

    }

    onEdit(){
        this.postService.editPost(this.post);
    }

    onDelete(){
        this.postService.deletePost(this.post);
    }

}