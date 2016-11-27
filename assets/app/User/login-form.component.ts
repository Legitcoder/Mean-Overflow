import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {User} from "./user.model";
import {Router} from "@angular/router";


@Component({
    selector: 'mean-login-form',
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit{
    myForm: FormGroup;

    constructor(private userService: UserService, private router: Router){}

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.userService.signIn(user).subscribe(
            (data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigateByUrl('/');
            },
            (error) => console.log(error)
        );
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }


}