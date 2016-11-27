import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {User} from "./user.model";


@Component({
    selector: 'mean-signup-form',
    templateUrl: './signup-form.component.html'
})

export class SignupFormComponent implements OnInit{
    myForm: FormGroup;

    constructor(private userService: UserService){}


    onSubmit(){
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.username);
        this.userService.signUp(user).subscribe(
            (result) => console.log(result),
            (error) => console.log(error)
        );
        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }



}