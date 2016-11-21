import {Component, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {NgForm} from "@angular/forms";
import {PostService} from "./post.service";


@Component({
    selector: 'mean-post-form',
    templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit{
    toggleForm: boolean = false;
    post: Post;

    constructor(private postService: PostService){}

    clickToggleForm(){
        this.toggleForm = !this.toggleForm;
    }

    onSubmit(form: NgForm){
        if(this.post){
            this.post.title = form.value.title;
            this.post.content = form.value.content;
            this.postService.updatePost(this.post).subscribe(
                (result) => console.log(result),
                (error) => console.log(error)
            )
            this.post = null;
        }
        else{
        const post = new Post(form.value.title, form.value.content);
        this.postService.addPost(post).subscribe(
            data => console.log(data),
            error => console.log(error)
        );}
        this.onClear(form);
    }


    ngOnInit(){
        this.postService.postIsEdit.subscribe(
            (post: Post) => {
                this.post = post;
            }
        )
    }


    onClear(form: NgForm){
        this.post = null;
        form.resetForm();
    }






}