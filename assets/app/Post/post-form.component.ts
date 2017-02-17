import {Component, OnInit, AfterContentChecked, AfterViewChecked} from '@angular/core';
import {Post} from "./post.model";
import {NgForm} from "@angular/forms";
import {PostService} from "./post.service";
import {Router} from "@angular/router";


@Component({
    selector: 'mean-post-form',
    templateUrl: './post-form.component.html',
    inputs: ['post'],
    styles: [`
        .btn-primary, .btn-danger {
        color: #fdfdfd;
        background-color: #8b352b;
        border-color: #000000; 
}
        .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open>.dropdown-toggle.btn-primary {
        color: #000000;
        background-color: #7e8080;
        border-color: #000000;
        }
`]
})
export class PostFormComponent implements OnInit{
    toggleForm: boolean = false;
    post: Post;
    content;
    title;

    constructor(private postService: PostService, private router: Router){
    }


    onSubmit(form: NgForm){
        this.postService.appendPost(false);
        if(this.post){
            console.log(this.post);
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
                console.log(post);
                this.post = post;
            }
        )
    }


    onClear(form: NgForm){

        form.resetForm();
    }






}