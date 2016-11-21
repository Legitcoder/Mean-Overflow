import { Component } from '@angular/core';
import {Post} from "./post.model";
import {NgForm} from "@angular/forms";
import {PostService} from "./post.service";

@Component({
    selector: 'mean-post-form',
    templateUrl: './post-form.component.html'
})
export class PostFormComponent {
    toggleForm: boolean = false;
    post: Post = null;

    constructor(private postService: PostService){}

    clickToggleForm(){
        this.toggleForm = !this.toggleForm;
    }

    onSubmit(form: NgForm){
        const post = new Post(form.value.title, form.value.content);
        this.postService.addPost(post).subscribe(
            data => console.log(data),
            error => console.log(error)
        );
        form.resetForm();
    }



}