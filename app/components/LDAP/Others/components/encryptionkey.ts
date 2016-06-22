import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'encryptionkey',
    templateUrl: './../templates/encryptionkey.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [],
    moduleId: module.id
})
export class EncryptionKey {
    constructor(http: Http){
    }
        
}