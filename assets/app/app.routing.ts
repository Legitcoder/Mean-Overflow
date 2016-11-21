import {Routes, RouterModule} from "@angular/router";
import {PostsComponent} from "./Post/posts.component";


const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/posts', pathMatch: 'full'},
    {path: 'posts', component: PostsComponent}
];


export const routing = RouterModule.forRoot(APP_ROUTES);