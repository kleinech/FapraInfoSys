import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Role, Roles, Permission } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'
import { RolesService } from './roles.service';

@Injectable()
export class RolesCRUDModalService {
    public action: string = "";
    
    public modalHeader: string = "";
    public modalHeaders = {
        new: "New Role",
        edit: "Modify Role"
    };
    
    public role = {
        edit: new Role(),
        active: new Role()
    };
    
    public tableHeaders = new Array(
        new Header("Permission", "width: 10%", "text")
    );
    
    constructor(private ldapHttpService: LDAPHttpService,
        private rolesService: RolesService){}
    
    public init(value: string){
        switch(value){
            case "new":
                this.modalHeader = this.modalHeaders[value];
                this.role.edit = new Role();
                this.action = "new";
                break;
            case "edit":
                this.modalHeader = this.modalHeaders[value];
                this.role.edit.copy(this.role.active);
                this.action = "edit";
                break;
            case "delete":
                this.action = "delete";
                break;
            default:
                break;
        }
    }
    
    public selectRoleRow(g: Role){
        this.role.active.class = "";
        g.class = "active";
        this.role.active = g;
    }
    
    public removePermission(p: Permission){
        let index = this.role.edit.permissions.indexOf(p);
        if (index > -1){
            this.role.edit.permissions = [
                ...this.role.edit.permissions.slice(0, index),
                ...this.role.edit.permissions.slice(index + 1, this.role.edit.permissions.length)
            ];
        }
    }
    
    public addPermission(p: Permission){
        let permission = new Permission();
        permission.copy(p);
        this.role.edit.permissions.push(permission);
    }
    
    public submit(self: Roles){
        switch(this.action){
            case 'edit':
                this.ldapHttpService.putRole(this.role.edit)
                .subscribe( u => {
                    this.role.active.copy(u);
                });
                break;
            case 'new':
                let nrole : Role = new Role();
                nrole.copy(this.role.edit);
                nrole.setDistinguishedName();
                
                this.ldapHttpService.putRole(nrole)
                .subscribe( g => {
                    this.rolesService.enrichRole(g);
                    self.roles.push(g);
                })
                break;
            case 'delete':
                let index = self.roles.indexOf(this.role.active);
                if (index > -1){
                    this.ldapHttpService.deleteRole(this.role.active)
                    .subscribe( g => {
                        self.roles = [
                            ...self.roles.slice(0, index),
                            ...self.roles.slice(index + 1, self.roles.length)
                        ]
                    });
                }
                break;
            default:
        }
    }
    
    public scrollDown(){}
}