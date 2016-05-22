import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'filterandsettings',
    templateUrl: 'app/templates/filterandsettings.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: []
})
export class FilterAndSettings {
    constructor(http: Http){
    }
        
}