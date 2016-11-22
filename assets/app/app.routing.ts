import {Routes, RouterModule} from "@angular/router";
import {PostsComponent} from "./Post/posts.component";
import {PostDetailsComponent} from "./Post/post-details.component";
import {PostFormComponent} from "./Post/post-form.component";


const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/posts', pathMatch: 'full'},
    {path: 'posts', component: PostsComponent},
    {path: 'posts/:id', component: PostDetailsComponent},
    {path: 'posts/new', component: PostFormComponent}
];


export const routing = RouterModule.forRoot(APP_ROUTES);