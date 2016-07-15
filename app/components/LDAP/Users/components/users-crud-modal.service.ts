import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { User, Users } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class UsersCRUDModalService {
    public action: string = "";
    
    public modalHeader: string = "";
    public modalHeaders = {
        new: "New User",
        edit: "Modify User"
    };
    
    public user = {
        edit: new User(),
        active: new User()
    };
    
    constructor(private ldapHttpService: LDAPHttpService){}
    
    public init(value: string){
        switch(value){
            case "new":
                this.modalHeader = this.modalHeaders[value];
                this.user.edit = new User();
                this.action = "new";
                break;
            case "edit":
                this.modalHeader = this.modalHeaders[value];
                this.user.edit.copy(this.user.active);
                this.action = "edit";
                break;
            case "delete":
                this.action = "delete";
                break;
            default:
                break;
        }
    }
    
    private selectedRow = new User();
    public selectRow(g: User){
        this.selectedRow.class = "";
        g.class = "active";
        this.selectedRow = g;
        this.user.active = g;
    }  
    
    public submit(self: Users){
        switch(this.action){
            case 'edit':
                this.ldapHttpService.putUser(this.user.edit)
                .subscribe( u => {
                    this.user.active.copy(u);
                });
                break;
            case 'new':
                let nuser : User = new User();
                nuser.copy(this.user.edit);
                nuser.setDistinguishedName();
                
                this.ldapHttpService.putUser(nuser)
                .subscribe( g => {
                    self.users.push(g);
                })
                break;
            case 'delete':
                let index = self.users.indexOf(this.user.active);
                if (index > -1){
                    this.ldapHttpService.deleteUser(this.user.active)
                    .subscribe( g => {
                        self.users = [
                            ...self.users.slice(0, index),
                            ...self.users.slice(index + 1, self.users.length)
                        ]
                    });
                }
                break;   
            default:
        }
    }
}