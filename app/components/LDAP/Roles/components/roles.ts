import { Component, ViewChild } from '@angular/core'

import { RolesCRUDModalService } from './roles-crud-modal.service';
import { PermissionsCRUDModalService } from './permissions-crud-modal.service';
import { InfoModalService } from './info-modal.service';
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
    @ViewChild('nedrole') private crudModal: ModalDialog;
    @ViewChild('nedpermission') private permissionCrudModal: ModalDialog;
    @ViewChild('infomodal') private infoModal: ModalDialog;
    
    public roles: Array<Role> = new Array<Role>();
    public principals: Array<Principal> = new Array<Principal>();
      
    constructor(
            private ldapHttpService: LDAPHttpService,
            private rolesService: RolesService,
            private crudModalService: RolesCRUDModalService,
            private permissionCrudModalService: PermissionsCRUDModalService,
            private infoModalService: InfoModalService){
        this.rolesService.roles = this;   
    }
    
    init(){
        this.search();
    }
    
    
    search(){
        this.ldapHttpService.getRoles(
            this.rolesService.offset,
            this.rolesService.limit,
            this.rolesService.query
        ).subscribe(r => this.roles = this.rolesService.enrich(r));
        this.rolesService.resetAndSearch();       
    }
        
    new(){
        this.crudModalService.init("new");
        this.crudModal.open();
    }
    
    newPermission(){
        this.permissionCrudModalService.init("new");
        this.permissionCrudModal.open();
    }
    
    edit(){
        this.crudModalService.init('edit');
        this.crudModal.open();
    }
    
    editPermission(){
        this.permissionCrudModalService.init("edit");
        this.permissionCrudModal.open();
    }
        
    delete(){
        this.crudModalService.init('delete');
        this.submit();
    }
    
    deletePermission(){
        this.permissionCrudModalService.init("delete");
        this.permissionCrudModalService.submit();
    }
   
    submit(){
        this.crudModalService.submit(this);
        this.closeCRUDModal();
    }
    
    submitPermission(){
        this.closePermissionCRUDModal();
        this.permissionCrudModalService.submit();
    }
    
    closeCRUDModal(){
        this.crudModal.close();
    }
    
    closePermissionCRUDModal(){
        this.permissionCrudModal.close();
    }
    
    private infoModalReady: boolean = false;
    ngAfterViewInit(){
        this.infoModalService.modal = this.infoModal;
        this.infoModalReady = true;
    }
    
    log(s:any){
        console.log(s);
    }
}