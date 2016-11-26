import { Component } from '@angular/core';
import {UserService} from "./user.service.";
import {Router} from "@angular/router";
@Component({
    selector: 'nav-bar',
    templateUrl: './user.component.html'
})
export class UserComponent {

    constructor(private userService: UserService, private router: Router){}

    onLogout(){
        this.userService.logout();
        this.router.navigateByUrl('/');
    }

    loggedIn(){
        return this.userService.loggedIn();
    }





}