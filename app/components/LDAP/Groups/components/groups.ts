import { Component, ViewChild } from '@angular/core'

import { Group } from './group';
import { GroupsService } from './groups.service';
import { GroupsCRUDModalService } from './groups-crud-modal.service';
import { MembersModalService } from './members-modal.service';
import { User } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

import { MODAL_DIRECTIVES, ModalDialog } from './../../../ModalWindow/index';
import { TABLE_DIRECTIVES, Header } from './../../../Table/index';
import { MENUBAR_DIRECTIVES } from './../../../MenuBar/index';


@Component({
    selector: 'groups',
    templateUrl: './../templates/groups.tpl.html',
    directives: [MODAL_DIRECTIVES, TABLE_DIRECTIVES, MENUBAR_DIRECTIVES],
    moduleId: module.id
})
export class Groups {
    public groups: Array<Group> = new Array<Group>();
    
    @ViewChild('nedgroup') private crudModal: ModalDialog;
    @ViewChild('memberModal') private memberModal: ModalDialog;


    constructor(
            private ldapHttpService: LDAPHttpService,
            private groupsService: GroupsService,
            private crudModalService: GroupsCRUDModalService,
            private membersModalService: MembersModalService){
        this.search();
    }
    
    search(){
        this.ldapHttpService.getGroups(
            this.groupsService.offset,
            this.groupsService.limit,
            this.groupsService.query
        ).subscribe(g => this.groups = g);
    }
    
    new(){
        this.crudModalService.init("new");
        this.crudModal.open();
    }
    
    edit(){
        this.crudModalService.init("edit");
        this.crudModal.open();
        // remove all current members
        while (this.crudModalService.group.edit.members.length > 0) {
            this.crudModalService.group.edit.members.pop();
        }
       
        this.ldapHttpService.getGroupMembers(this.crudModalService.group.edit.groupName)
        .subscribe(m => this.crudModalService.group.edit.members = m);
    }
    
    delete(){
        this.crudModalService.init("delete");
        this.submit();        
    }
    
    addMember(){
        this.membersModalService.search();
        this.memberModal.open();
    }
    
    submitMember(u: User){
        this.crudModalService.addMember(u);
        this.closeMemberModal();
    }
    
    submit(){
        this.closeCRUDModal();
        this.crudModalService.submit(this);
    }
    
    closeCRUDModal(){
        this.crudModal.close();
    }
    
    closeMemberModal(){
        this.memberModal.close();
    }
}