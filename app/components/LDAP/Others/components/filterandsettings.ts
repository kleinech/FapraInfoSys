import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'filterandsettings',
    templateUrl: './../templates/filterandsettings.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [],
    moduleId: module.id
})
export class FilterAndSettings {
    constructor(http: Http){
    }
        
}