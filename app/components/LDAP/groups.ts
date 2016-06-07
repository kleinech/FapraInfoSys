import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http, Headers } from '@angular/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { Group } from './group';
import { User } from './user';

@Component({
    selector: 'groups',
    templateUrl: 'app/templates/groups.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: []
})
export class Groups {
    private groups: Array<Group> = [];
    private query: string;
    
    private action: string = "";
    private modalClass: string = "";
    private editHeader: string = "";
    private editActive: boolean = false;
    private editGroupActive: boolean = false;
    
    private activeGroup: Group = new Group();
    private editGroup: Group = new Group();
    
    private self = this;
    
    private groupMember = {
        onSubmit : function(self){
            let user = new User();
            user.copy(this.activeRow);
            self.editGroup.members.push(user);
            this.toggle(self);
        },
        active: false,
        options: {
            groupOrUser: "",
            search : ""
        },
        activeRow : new User(),
        rowSelected: function(value){
            if(this.activeRow){
                this.activeRow.class = "";
            }
            value.class = "active";
            this.activeRow = value;
        },
        elements : new Array<User>(),
        onSearch : function(self){
            this.elements = new Array<User>();
            self.http.get(self.IP + this.options.groupOrUser)
            .subscribe(res => {
                res.json().forEach(jobj => this.elements.push(new User("","",jobj.displayName,jobj.distinguishedName)));
            })
        },
        toggle: function(self){
            self.editActive = !self.editActive;
            this.active = !this.active;
        },
        
    }
    
    private editGroupModal = {
        activeRow : new User(),
        rowSelected: function(value){
            if(this.activeRow){
                this.activeRow.class = "";
            }
            value.class = "active";
            this.activeRow = value;
        },
        remove : function(self){
            var index = self.editGroup.members.indexOf(this.activeRow);
                if (index > -1){
                    self.editGroup.members = [
                        ...self.editGroup.members.slice(0, index),
                        ...self.editGroup.members.slice(index + 1, self.activeGroup.members.length)
                    ];
                }
        }
    }
    
    private IP: string = "http://localhost:8080/myapp/";
    private putHeader: Headers = new Headers({
         'Content-Type': 'application/json',
    });
    
    constructor(private http: Http){
       this.http.get(this.IP + 'groups')
       .subscribe(res => {
           // fill this.groups and call the Group constructor for each group!!
           res.json().forEach(jobj => this.groups.push(new Group(jobj.distinguishedName, jobj.displayName)));
       },
       error => alert(JSON.stringify(error)));
    }
    
    new(){
        this.toggleEdit('new');
        this.editHeader = "New Group";
        this.editGroup = new Group();
    }
    
    edit(){
        
        this.editHeader = "Modify Group";
        this.editGroup.copy(this.activeGroup);
        
        // get members of the group
        this.http.get(this.IP + "groups/" + this.editGroup.groupName + "/members")
        .subscribe(res => {
            this.editGroup.members = new Array<User>();
            res.json().forEach(member => {
                this.editGroup.members.push(new User("","",member.displayName,member.distinguishedName))
            })
        })
        
        this.toggleEdit('edit');
    }
    
    delete(){
        this.action = 'delete';
        this.onSubmit();        
    }
    
    onSubmit(){
        this.editActive = false;
        
        switch(this.action){
            case 'edit':
                this.activeGroup.copy(this.editGroup);
                break;
            case 'new':
                var ngroup : Group = new Group();
                ngroup.copy(this.editGroup);
                ngroup.setDistinguishedName();
                
                this.http.put(this.IP + "groups/" + ngroup.groupName, ngroup.stringify(), {headers: this.putHeader})
                .subscribe(
                    complete => {
                        this.groups.push(ngroup);
                        this.groups.slice();
                    },
                    error => alert(JSON.stringify(error))
                );
                console.log(this.IP + "groups/" + ngroup.groupName);
                break;
            case 'delete':
                var index = this.groups.indexOf(this.activeGroup);
                if (index > -1){
                    this.http.delete(this.IP+"groups/"+this.activeGroup.groupName)
                    .subscribe(
                        complete => {
                            this.groups = [
                                ...this.groups.slice(0, index),
                                ...this.groups.slice(index + 1, this.groups.length)
                            ];
                        },
                        error => alert(JSON.stringify(error))
                    );
                }
                break;
            default:
        }
    }
    
    toggleEdit(action:string){
        this.editActive = !this.editActive;
               
        this.action = action;
        if(this.editActive){
            this.modalClass = "in";  
        }
        
    }
    
    rowSelected(value){
        if(this.activeGroup){
            this.activeGroup.class = "";
        }
        value.class="active";
        this.activeGroup = value;
        if(this.action === 'edit'){
            this.editGroup.copy(this.activeGroup);    
        }
    }
}