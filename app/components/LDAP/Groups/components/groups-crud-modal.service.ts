import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Groups, Group, User } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

@Injectable()
export class GroupsCRUDModalService {
    public action: string = "";
    
    public modalHeader: string = "";
    public modalHeaders = {
        new: "New Group",
        edit: "Modify Group"
    };
    
    public group = {
        edit: new Group(),
        active: new Group()
    };
    
    public tableHeaders = new Array(
        new Header("Display Name", "width: 10%", "displayName"),
        new Header("Distinguished Name", "width: 10%", "distinguishedName")
    );
    
    constructor(private ldapHttpService: LDAPHttpService){}
    
    public init(value: string){
        switch(value){
            case "new":
                this.modalHeader = this.modalHeaders[value];
                this.group.edit = new Group();
                this.action = "new";
                break;
            case "edit":
                this.modalHeader = this.modalHeaders[value];
                this.group.edit.copy(this.group.active);
                this.action = "edit";
                break;
            case "delete":
                this.action = "delete";
            default:
                break;
        }
    }
    
    private selectedGroupRow = new Group();
    public selectGroupRow(g: Group){
        this.selectedGroupRow.class = "";
        g.class = "active";
        this.selectedGroupRow = g;
        this.group.active = g;
    }
    
    private selectedMemberRow = new User();
    public selectMemberRow(u: User){
        this.selectedMemberRow.class = "";
        u.class = "active";
        this.selectedMemberRow = u;
    }
    
    
    public removeMember(){
        var index = this.group.edit.members.indexOf(this.selectedMemberRow);
        if (index > -1){
            this.group.edit.members = [
                ...this.group.edit.members.slice(0, index),
                ...this.group.edit.members.slice(index + 1, this.group.edit.members.length)
            ];
        }
    }
    
    public addMember(u: User){
        let user = new User();
        user.copy(u);
        this.group.edit.members.push(user);
    }
    
    public submit(self: Groups){
        switch(this.action){
            case 'edit':
                this.ldapHttpService.putGroup(this.group.edit)
                .subscribe( g => {
                    this.group.active.copy(g);
                });
                break;
            case 'new':
                var ngroup : Group = new Group();
                ngroup.copy(this.group.edit);
                ngroup.setDistinguishedName();
                
                this.ldapHttpService.putGroup(ngroup)
                .subscribe( g => {
                    self.groups.push(g);
                })
                break;
            case 'delete':
                var index = self.groups.indexOf(this.group.active);
                if (index > -1){
                    this.ldapHttpService.deleteGroup(this.group.active)
                    .subscribe( g => {
                        self.groups = [
                            ...self.groups.slice(0, index),
                            ...self.groups.slice(index + 1, self.groups.length)
                        ]
                    });
                }
                break;
            default:
        }
    }
}