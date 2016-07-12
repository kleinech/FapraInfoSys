import { Component, ViewChild, NgZone } from '@angular/core'

import { UsersService } from './users.service';
import { UsersCRUDModalService } from './users-crud-modal.service';
import { ImportModalService } from './import-modal.service';

import { LDAPHttpService } from './../../shared/services/ldap-http.service'
import { UserFilter } from './../pipes/userfilter.pipe';
import { User } from './user';

import { MODAL_DIRECTIVES, ModalDialog } from './../../../ModalWindow/index';
import { TABLE_DIRECTIVES, Header } from './../../../Table/index';
import { MENUBAR_DIRECTIVES } from './../../../MenuBar/index';

import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload/ng2-file-upload';

@Component({
    selector: 'users',
    templateUrl: './../templates/users.tpl.html',
    directives: [ 
        FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES,
        MODAL_DIRECTIVES, TABLE_DIRECTIVES, MENUBAR_DIRECTIVES],
    moduleId: module.id
})
export class Users {
    public users: Array<User> = new Array<User>();
    //zone: NgZone;
    @ViewChild('neduser') private crudModal: ModalDialog;
    @ViewChild('importuser') private importModal: ModalDialog;
   
    constructor(
            private ldapHttpService: LDAPHttpService,
            private usersService: UsersService,
            private crudModalService: UsersCRUDModalService,
            private importModalService: ImportModalService){
        usersService.self = this;
        //this.zone = new NgZone({ enableLongStackTrace: false });
    }
    
    init(){
        this.search();
    }
    
    search(){
        if(!(this.usersService.query.length>0)){
            this.usersService.offset = 0;
            this.usersService.limit = 25;
        }
        this.ldapHttpService.getUsers(
            this.usersService.offset,
            this.usersService.limit,
            this.usersService.query
        ).subscribe(g => this.users = g);
    }
    
    new(){
        this.crudModalService.init("new");
        this.crudModal.open();
    }
    
    edit(){
        this.crudModalService.init('edit');
        this.crudModal.open();
    }
    
    delete(){
        this.crudModalService.init('delete');
        this.submit();
    }
   
    submit(){
        this.closeCRUDModal();
        this.crudModalService.submit(this);
    }
    
    import(){
        this.importModalService.init("");
        this.importModal.open();
    }
    
    submitImport(){
        this.closeImportModal();
        this.importModalService.submit(this);
    }
    
    closeCRUDModal(){
        this.crudModal.close();
    }
    
    closeImportModal(){
        this.importModal.close();
    }
}