import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Role, Roles, Permission } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service';
import { RolesCRUDModalService } from './roles-crud-modal.service';

@Injectable()
export class PermissionsCRUDModalService {
    public action: string = "";
    
    public modalHeader: string = "";
    public modalHeaders = {
        new: "New Permission",
        edit: "Modify Permission"
    };
    
    public permission = {
        edit: new Permission(),
        active: new Permission()
    };
        
    constructor(private ldapHttpService: LDAPHttpService,
        private rolesCrudModalService: RolesCRUDModalService){}
    
    public init(value: string){
        switch(value){
            case "new":
                this.modalHeader = this.modalHeaders[value];
                this.permission.edit = new Permission();
                this.action = "new";
                break;
            case "edit":
                this.modalHeader = this.modalHeaders[value];
                this.permission.edit.copy(this.permission.active);
                this.action = "edit";
                break;
            case "delete":
                this.action = "delete";
                break;
            default:
                break;
        }
    }
    
    public selectPermissionRow(g: Permission){
        this.permission.active.class = "";
        g.class = "active";
        this.permission.active = g;
    }
    
    public submit(){
        switch(this.action){
            case 'edit':
                this.permission.active.copy(this.permission.edit);
                break;
            case 'new':
                let npermission : Permission = new Permission();
                npermission.copy(this.permission.edit);
                this.rolesCrudModalService.addPermission(npermission);
                break;
            case 'delete':
                this.rolesCrudModalService.removePermission(this.permission.active);
                break;
            default:
        }
    }
}