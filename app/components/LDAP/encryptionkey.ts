import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
    selector: 'encryptionkey',
    templateUrl: 'app/templates/encryptionkey.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: []
})
export class EncryptionKey {
    constructor(http: Http){
    }
        
}