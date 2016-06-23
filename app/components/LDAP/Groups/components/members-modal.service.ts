import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { CRUDModalService } from './crud-modal.service';

import { Groups, Group, User } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class MembersModalService {
    public changed = false;
    public groupOrUser: string = "users";
    public options: Array<any> = new Array<any>( 
        {
            val: "users",
            name: "Users"   
        },
        {
            val: "groups",
            name: "Groups"
        });
        
    public gOuChange(){
        this.scroll.offset = 0;
        this.scroll.limit = 25;
        this.changed = false;
        while(this.data.length>0){
            this.data.pop();
        }
    }
    
    public scrollDown(){
        this.scroll.offset = this.scroll.offset += this.scroll.limit;
        this.scroll.limit = 5;
        this.changed = false;
        this.search();
    }
        
    public query: string = "";
    
    public tableHeaders = new Array(
        new Header("Display Name", "10%", "displayName"),
        new Header("Distinguished Name", "20%", "distinguishedName")
    );
    
    public scroll = {
        offset: 0,
        limit: 25
    }
    
    public data: Array<User> = new Array<User>();
    search(){
        if(!this.changed){
            this.changed = true;
            switch(this.groupOrUser){
                case "groups": 
                    this.ldapHttpService.getGroups(this.scroll.offset,this.scroll.limit,this.query)
                    .subscribe(groups => {
                        groups.forEach(group => this.data.push(group));
                        
                    });
                    break;
                case "users":
                    this.ldapHttpService.getUsers(this.scroll.offset,this.scroll.limit,this.query)
                    .subscribe(users => {
                        users.forEach(user => this.data.push(user));
                    });
                    break;
            }
        } 
    }
    
    resetAndSearch(){
        while(this.data.length>0){
            this.data.pop();
        }
        this.changed = false;
        this.scroll.limit = 25;
        this.scroll.offset = 0;
        this.search();
    }
    
    private selectedRow = new User();
    public selectRow(u: User){
        this.selectedRow.class = "";
        u.class = "active";
        this.selectedRow = u;
    }
    
    constructor(private ldapHttpService: LDAPHttpService){}
}