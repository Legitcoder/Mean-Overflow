import {Component, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {User} from "./user.model";
@Component({
    selector: 'nav-bar',
    templateUrl: './user.component.html',
    styles: [`
        .navbar{
            background-color: #8b352b;
        }
        .navbar-brand{
            color: black;
        }
        btn-primary, .btn-danger {
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