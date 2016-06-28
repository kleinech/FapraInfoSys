import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Principal, Roles, Role } from './../../shared/index'
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class RolesService {
    public roles: Roles;
    
     public roleHeaders: Array<Header> = new Array<Header>(
        new Header("Role", "30%", "roleName"),
        new Header("Explicit", "10%", "explicit"),
        new Header("Inherit", "10%", "inherit"),
        new Header("Info", "10%", "info")
    );
    
    public groupOrUser: string = "users";
    public options: Array<any> = new Array<any>( 
        { val: "users", name: "Users" },
        { val: "groups", name: "Groups" }
    )
    
    public principalHeaders: Array<Header> = new Array<Header>(
        new Header(this.groupOrUser.substring(0,1).toUpperCase() + this.groupOrUser.substring(1), "50%", "displayName"),
        new Header(" ", "2%", "info")
    );
    
    public query: string = "";
    public limit: number = 50;
    public offset: number = 0;
    
    constructor(private ldapHttpService: LDAPHttpService){}
    
    public principal = {
        active: new Principal(),
        query: "",
        offset: 0,
        limit: 25,
        changed: false,        
    } 
    public selectPrincipalRow(p: Principal){
        this.principal.active.class = "";
        p.class = "active";
        this.principal.active = p;
    }
    
    public resetAndSearch(){
        this.principal.offset = 0;
        this.principal.limit = 25;
        this.principal.changed = false;
        while(this.roles.principals.length>0){
            this.roles.principals.pop();
        }
        this.search();
    }
    
    public scrollDown(){
        this.principal.offset = this.principal.offset += this.principal.limit;
        this.principal.changed = false;
        this.search();
    }
    
    public showDetail(){
        
    }
    
    public search(){
        if(!this.principal.changed){
            this.principal.changed = true;
            switch(this.groupOrUser){
                case "groups": 
                    this.ldapHttpService.getGroups(this.principal.offset,this.principal.limit,this.principal.query)
                    .subscribe(groups => {
                        groups.forEach(group => {
                            let p: Principal = new Principal(group.displayName, group.distinguishedName);
                            p.info = {
                                type: "infoButton",
                                click: this.showDetail(),
                            } 
                            this.roles.principals.push(p);
                        });
                    });
                    break;
                case "users":
                    this.ldapHttpService.getUsers(this.principal.offset,this.principal.limit,this.principal.query)
                    .subscribe(users => {
                        users.forEach(user => {
                            let p: Principal =  new Principal(user.displayName, user.distinguishedName)
                            p.info = {
                                type: "infoButton",
                                click: this.showDetail(),
                            } 
                            this.roles.principals.push(p);
                        });
                    });
                    break;
                default:
                    break;
            }
        } 
    }
    
}