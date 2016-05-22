import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'groups',
    templateUrl: 'app/templates/groups.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: []
})
export class Groups {
    private groups = [];
    constructor(http: Http){
    }
        
}