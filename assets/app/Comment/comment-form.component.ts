import {Component, OnInit} from '@angular/core';
import {Comment} from "./comment.model";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
    selector: 'mean-post-form',
    templateUrl: './post-form.component.html',
    inputs: ['post']
})
export class CommentFormComponent implements OnInit{


    ngOnInit(){

    }
}