import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'roles',
    templateUrl: './../templates/roles.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [],
    moduleId: module.id
})
export class Roles {
    private roles = [];
    constructor(private http: Http){
    }
        
}