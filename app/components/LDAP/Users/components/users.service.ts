import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { User } from './user';
import { Users } from './users';

import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class UsersService {
    public changed = false;
    public self: Users;
    
    public headers: Array<Header> = new Array<Header>(
        new Header("Short Name (User Name)", "10%", "loginName"),
        new Header("Display Name", "10%", "displayName"),
        new Header("Email", "10%", "email"),
        new Header("Distinguished Name", "20%", "distinguishedName")
    );
    
    public query: string = "";
    public limit: number = 50;
    public offset: number = 0;
    
    public scrollDown(){
        this.offset += this.limit;
        this.limit = 5;
        this.changed = false;
        this.search(this.self.users);
    }
    
    public search(users: Array<User>){
        if(!this.changed){
            this.changed = true;
            this.ldapHttpService.getUsers(this.offset,this.limit,this.query)
                .subscribe(items => {
                    items.forEach(user => users.push(user));
                });   
        }
    }
    
    constructor(private ldapHttpService: LDAPHttpService){}
}