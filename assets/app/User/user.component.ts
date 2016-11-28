import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {User} from "./user.model";
@Component({
    selector: 'nav-bar',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    private currentUser: User;

    constructor(private userService: UserService, private router: Router){}

    ngOnInit(){
    }

    onLogout(){
        this.userService.logout();
        this.router.navigateByUrl('/');
    }

    loggedIn(){
        return this.userService.loggedIn();
    }





}