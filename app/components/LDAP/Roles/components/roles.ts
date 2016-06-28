import { Component, ViewChild } from '@angular/core'

import { RolesCRUDModalService } from './roles-crud-modal.service'
import { RolesService } from './roles.service';
import { Role } from './role';

import { LDAPHttpService } from './../../shared/services/ldap-http.service'

import { User, Users, Group, Groups, Principal } from './../../shared/index';

import { MODAL_DIRECTIVES, ModalDialog } from './../../../ModalWindow/index';
import { TABLE_DIRECTIVES, Header } from './../../../Table/index';
import { MENUBAR_DIRECTIVES } from './../../../MenuBar/index';

@Component({
    selector: 'roles',
    templateUrl: './../templates/roles.tpl.html',
    directives: [MODAL_DIRECTIVES, TABLE_DIRECTIVES, MENUBAR_DIRECTIVES],
    moduleId: module.id
})
export class Roles {
    public roles: Array<Role> = new Array<Role>();
    public principals: Array<Principal> = new Array<Principal>();
      
    constructor(
            private ldapHttpService: LDAPHttpService,
            private rolesService: RolesService,
            private crudModalService: RolesCRUDModalService){
        this.rolesService.roles = this;
        this.search();
    }
    
    search(){
        this.ldapHttpService.getRoles(
            this.rolesService.offset,
            this.rolesService.limit,
            this.rolesService.query
        ).subscribe(r => this.roles = r);
        this.rolesService.search();
    }
        
    new 
}