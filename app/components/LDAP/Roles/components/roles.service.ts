import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Principal, Roles, Role, Permission } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service';
import { InfoModalService } from './info-modal.service';

@Injectable()
export class RolesService {
    public roles: Roles;
    
    public roleHeaders: Array<Header> = new Array<Header>(
        new Header("Role", "30%", "roleName"),
        new Header("Explicit", "15%", "explicit"),
        new Header("Inherit", "15%", "inherit"),
        new Header(" ", "2%", "info")
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
    
    constructor(private ldapHttpService: LDAPHttpService,
        private infoModalService: InfoModalService){}
    
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
                
        this.roles.roles.forEach(role => {
            if(role.owners.some(dn => {
                return dn == p.distinguishedName;
            })){
                role.explicit.value = true;
            }else{
                role.explicit.value = false;
            }
        });
        this.getPrincipalRoles(p);
        this.roles.roles = this.roles.roles;
    }
    
    public getPrincipalRoles(p: Principal){
        switch(this.groupOrUser){
                case "users": 
                    this.ldapHttpService.getUserRoles(p)
                    .subscribe( 
                        roles => {
                            console.log(roles);
                            this.setInherit(roles);
                        },
                        error => this.setInherit(new Array<Role>())
                    );
                    break;
                case "groups":
                    this.ldapHttpService.getGroupRoles(p)
                    .subscribe( 
                        roles => {
                            console.log(roles);
                            this.setInherit(roles);
                        },
                        error => this.setInherit(new Array<Role>())
                    );
                    break;
                default:
                    break;
            }
    }
    
    public setInherit(roles:Array<Role>){
        this.roles.roles.forEach(role => {
            roles.forEach(r => {
                if(role.distinguishedName == r.distinguishedName && !role.explicit.value){
                    role.inherit.value = true;
                } else {
                    role.inherit.value = false;
                }
            })
        });
        this.setInfoModalPermissions(roles);
    }
    
    public setInfoModalPermissions(roles:Array<Role>){
        this.infoModalService.permissions = new Array<Permission>();
        roles.forEach(r => {
            r.permissions.forEach(p => {
                let index = this.infoModalService.permissions.indexOf(p);if (index < 0){
                    this.infoModalService.permissions.push(p);        
                } 
            }); 
        });
    }
    
    public resetAndSearch(){
        this.principal.offset = 0;
        this.principal.limit = 50;
        this.principal.changed = false;
        while(this.roles.principals.length>0){
            this.roles.principals.pop();
        }
        this.principalHeaders[0] = new Header(this.groupOrUser.substring(0,1).toUpperCase() + this.groupOrUser.substring(1), "50%", "displayName");
        this.search();
        this.roles.roles = this.enrich(this.roles.roles);
    }
    
    public scrollDown(){
        this.principal.offset = this.principal.offset += this.principal.limit;
        this.principal.changed = false;
        this.search();
    }
    
    public showDetail(p:Principal){
        let self: RolesService = this["self"] ? this["self"] : this;
        self.infoModalService.init(self.groupOrUser);
        self.infoModalService.open();
        console.log(p);
    }
    
    public showRoleDetail(r: Role){
        let self: RolesService = this["self"] ? this["self"] : this;
        self.infoModalService.init("roles");
        self.setInfoModalPermissions(new Array<Role>(r));
        self.infoModalService.open();
        console.log(r);
    }
    
    public changeRole(r:Role, tag:any){
        let self: RolesService = this["self"] ? this["self"] : this;
        if(self.principal.active.class == "active"){
            let index = r.owners.indexOf(self.principal.active.distinguishedName);
            let nrole: Role = new Role();
            nrole.copy(r); 
            if(index > -1){
                nrole.owners = [
                    ...nrole.owners.slice(0, index),
                    ...nrole.owners.slice(index + 1, nrole.owners.length)
                ]
            } else {
                nrole.owners.push(self.principal.active.distinguishedName);
            }
            self.ldapHttpService.putRole(nrole)
            .subscribe( role => {
                r.copy(role);
            });
        }
    }
    
    public search(){
        if(!this.principal.changed){
            this.principal.changed = true;
            switch(this.groupOrUser){
                case "groups": 
                    this.ldapHttpService.getGroups(this.principal.offset,this.principal.limit,this.principal.query)
                    .subscribe(groups => {
                        let ps: Array<Principal> = new Array<Principal>();
                        groups.forEach(group => {
                            let p: Principal = new Principal(group.displayName, group.distinguishedName);
                            p.info = {
                                type: "infoButton",
                                click: this.showDetail,
                                self: this
                            } 
                            ps.push(p);
                        });
                        this.roles.principals = ps;
                    });
                    break;
                case "users":
                    this.ldapHttpService.getUsers(this.principal.offset,this.principal.limit,this.principal.query)
                    .subscribe(users => {
                        let ps: Array<Principal> = new Array<Principal>();
                        users.forEach(user => {
                            let p: Principal =  new Principal(user.displayName, user.distinguishedName)
                            p.info = {
                                type: "infoButton",
                                click: this.showDetail,
                                self: this
                            } 
                            ps.push(p);
                        });
                        this.roles.principals = ps;
                    });
                    break;
                default:
                    break;
            }
        } 
    }
    
    public enrich(roles:Array<Role>): Array<Role>{
        roles.forEach(role => this.enrichRole(role));
        return roles;
    }
    
    public enrichRole(role: Role){
        role.info = {
            type: "infoButton",
            click: this.showRoleDetail, 
            self: this
        }
        role.inherit = {
            type: "checkbox",
            value: false,
            click: this.changeRole,
            active: false, 
            self: this
        }
        role.explicit = {
            type: "checkbox",
            value: false,
            click: this.changeRole,
            active: true, 
            self: this
        } 
    }
    
}