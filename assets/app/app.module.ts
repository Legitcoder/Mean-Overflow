import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import {PostComponent} from "./Post/post.component";
import {UserComponent} from "./User/user.component";
import {PostsComponent} from "./Post/posts.component";
import {PostFormComponent} from "./Post/post-form.component";
import {PostService} from "./Post/post.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {PostDetailsComponent} from "./Post/post-details.component";
import {LoginFormComponent} from "./User/login-form.component";
import {SignupFormComponent} from "./User/signup-form.component";
import {CommentsComponent} from "./Comment/comments.component";
import {CommentFormComponent} from "./Comment/comment-form.component";
import {CommentComponent} from "./Comment/comment.component";
import {CommentService} from "./Comment/comment.service";
import {UserService} from "./User/user.service.";


@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        UserComponent,
        PostsComponent,
        PostFormComponent,
        PostDetailsComponent,
        LoginFormComponent,
        SignupFormComponent,
        CommentsComponent,
        CommentFormComponent,
        CommentComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, routing, HttpModule],
    bootstrap: [AppComponent],
    providers: [PostService, CommentService, UserService]
})

export class AppModule {

}