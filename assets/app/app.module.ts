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


@NgModule({
    declarations: [AppComponent, PostComponent, UserComponent, PostsComponent, PostFormComponent],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, routing, HttpModule],
    bootstrap: [AppComponent],
    providers: [PostService]
})

export class AppModule {

}