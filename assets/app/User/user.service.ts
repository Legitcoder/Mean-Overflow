import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {User} from "./user.model";
import 'rxjs/Rx'
import {Observable} from "rxjs";





@Injectable()
export class UserService{
    constructor(private http: Http){}

    signUp(user: User){
        var body = JSON.stringify(user);
        var headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }


    signIn(user: User){
        var body = JSON.stringify(user);
        var headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout(){
        localStorage.clear();
    }

    loggedIn(){
        return localStorage.getItem('token') !== null;
    }
}