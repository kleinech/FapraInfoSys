import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { User, Users } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class ImportModalService {
    public file: string = "";
    
    public modalHeader: string = "";
    public modalHeaders = {
        default: "Import Users"
    };
    
    public user = {
        bulk: new Array<User>()
    };
    
    constructor(private ldapHttpService: LDAPHttpService){}
    
    public init(value: string){
        switch(value){
            default:
                while(this.user.bulk.length>0){
                    this.user.bulk.pop();
                }
                this.modalHeader = this.modalHeaders['default'];
                break;
        }
    }
    
    public submit(self: Users){
        this.user.bulk.forEach(user => {
            user.setDistinguishedName();
            
            this.ldapHttpService.putUser(user)
            .subscribe( u => {
                self.users.push(u);
            });
        });
    }
}