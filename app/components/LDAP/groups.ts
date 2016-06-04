import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { Group } from './group';

import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Headers } from '@angular/http';

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
    
    private activeGroup: Group = new Group();
    private editGroup: Group = new Group();
    
    private IP: string = "http://localhost:8080/myapp/";
    private putHeader: Headers = new Headers({
            'Content-Type': 'application/json',
    });
    
    constructor(private http: Http){
       this.http.get(this.IP + 'groups')
       .subscribe(res => {
           this.groups = res.json();
       },
       error => alert(JSON.stringify(error)));
    }
    
    new(){
        this.toggleEdit('new');
        this.editHeader = "New Group";
        this.editGroup = new Group();
    }
    
    edit(){
        this.toggleEdit('edit');
        this.editHeader = "Modify Group";
        this.editGroup.copy(this.activeGroup);
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
                this.groups.push(ngroup);
                this.groups.slice();
                
                this.http.put(this.IP + "groups/" + ngroup.groupName, "JSON.stringify(ngroup)",
                    new RequestOptions({headers: this.putHeader}))
                .subscribe(
                    complete => alert(JSON.stringify(complete)),
                    error => alert(JSON.stringify(error)));
                console.log(this.IP + "groups/" + ngroup.groupName);
                break;
            case 'delete':
                var index = this.groups.indexOf(this.activeGroup);
                if (index > -1){
                    this.groups = [
                        ...this.groups.slice(0, index),
                        ...this.groups.slice(index + 1, this.groups.length)
                    ];
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