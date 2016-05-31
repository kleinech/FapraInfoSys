import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { UserFilter } from '../../pipes/userfilter.pipe';

@Component({
    selector: 'users',
    templateUrl: 'app/templates/users.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [UserFilter]
})
export class Users {
    private users = [];
    private query: String;
    
    private action: string = "";
    
    private activeUser = {
        shortname: "",
        email: "",
        displayname: "",
        distinguishedname: "",
        class: ""      
    };
    
    private editUser = {
        shortname: "",
        email: "",
        displayname: "",
        distinguishedname: ""        
    };
    
    private editActive: boolean = false;
    
    constructor(http: Http){
        //Test with JSON file
        /*http.request('app/data/Users.json')
        .subscribe(res => {
            this.users = res.json();
        })
        //TODO get users list from LDAP server
        /**/
        http.get('http://localhost:8080/myapp/users')
        .subscribe(res => {
            alert(JSON.stringify(res));
            this.users = res.json();
        },
        error => alert(JSON.stringify(error)))
    }
        
    new(){
        if(this.editActive === false || this.action === 'new' || this.action === ''){
            this.editActive = !this.editActive;
        }
        this.editUser = {
            shortname: "",
            email: "",
            displayname: "",
            distinguishedname: ""  
        }
        this.action = "new";
    }
    
    edit(){
        if(this.editActive === false || this.action === 'edit' || this.action === ''){
            this.editActive = !this.editActive;
        }
        this.copyUser();
        this.action = "edit";
    }
    
    delete(){
        var index = this.users.indexOf(this.activeUser);
        if (index > -1) {
            this.users = [
                ...this.users.slice(0, index),
                ...this.users.slice(index + 1, this.users.length)
            ];
        }
        //TODO LDAP delete user 
    }
    
    onSubmit(){
        this.editActive = false;
        switch(this.action){
            case 'edit':
                this.reverseCopyUser();
                //TODO LDAP update user
                
                break;
            case 'new':
                var newUser = {
                    shortname: this.editUser.shortname,
                    displayname: this.editUser.displayname,
                    email: this.editUser.email,
                    distinguishedname: this.editUser.distinguishedname
                };
                this.users.push(newUser);
                this.users = this.users.slice();
                //TODO LDAP create user
                
                break;
            default:
        }
    }
    
    //Search function (query is used for userfilter.pipe)
    queryChanged(value){
        this.query=value;
    }
    
    //Set active row
    rowSelected(value){
        if(this.activeUser){
            this.activeUser.class = "";
        }
        value.class="active";
        this.activeUser = value;
        if(this.action === 'edit'){
            this.copyUser();    
        }
    }
    
    copyUser(){
        this.editUser.shortname = this.activeUser.shortname;
        this.editUser.displayname = this.activeUser.displayname;
        this.editUser.email = this.activeUser.email;
        this.editUser.distinguishedname = this.activeUser.distinguishedname;
    }
    
    reverseCopyUser(){
        this.activeUser.shortname = this.editUser.shortname;
        this.activeUser.displayname = this.editUser.displayname;
        this.activeUser.email = this.editUser.email;
        this.activeUser.distinguishedname = this.editUser.distinguishedname;
    }
}