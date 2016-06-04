import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { UserFilter } from '../../pipes/userfilter.pipe';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Headers} from '@angular/http';

@Component({
    selector: 'users',
    templateUrl: 'app/templates/users.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [UserFilter]
})
export class Users {
    private users = [];
    private query: string;
    
    private action: string = "";
    
    private activeUser = {
        loginName: "",
        email: "",
        displayName: "",
        distinguishedName: "",
        class: ""      
    };
    
    private editUser = {
        loginName: "",
        email: "",
        displayName: "",
        distinguishedName: ""        
    };
    
    private editActive: boolean = false;
    private currentStartIdx = 0;
    private currentLimit = 3;
    private httpInfo : Http;
    
    constructor(http: Http){
        //Test with JSON file
        /*http.request('app/data/Users.json')
        .subscribe(res => {
            this.users = res.json();
        }),*/
        //TODO get users list from LDAP server
        
        this.httpInfo = http;
        this.subscribeToUsers();
    }
    
    subscribeToUsers()
    {
        this.httpInfo.get('http://localhost:8080/myapp/users/dyn?startIdx='+this.currentStartIdx+'&limit='+this.currentLimit)
        .subscribe(res => {
            this.users = res.json();
        },
        error => alert(JSON.stringify(error)))
    }
    
    new(){
        if(this.editActive === false || this.action === 'new' || this.action === ''){
            this.editActive = !this.editActive;
        }
        this.editUser = {
            loginName: "",
            email: "",
            displayName: "",
            distinguishedName: ""  
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
    
    btnNextPage(){
        this.currentStartIdx += this.currentLimit;
        this.subscribeToUsers();
    }
    btnPreviousPage(){
        this.currentStartIdx -= this.currentLimit;
        this.subscribeToUsers();
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
                    loginName: this.editUser.loginName,
                    displayName: this.editUser.displayName,
                    email: this.editUser.email,
                    distinguishedName: this.editUser.distinguishedName
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
    
    // updates the current limit for user results
    limitChanged(value){
        if(!this.isInt(value)) return;
        this.currentLimit=value;
        this.subscribeToUsers();
    }
    
    // updates the current limit for user results
    pageChanged(value){
        if(!this.isInt(value)) return;
        this.currentStartIdx=value;
        this.subscribeToUsers();
    }
    
    // Checks if the given param is a number
    isInt(n){
        return Number(n) === n && n % 1 === 0;
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
        this.editUser.loginName = this.activeUser.loginName;
        this.editUser.displayName = this.activeUser.displayName;
        this.editUser.email = this.activeUser.email;
        this.editUser.distinguishedName = this.activeUser.distinguishedName;
    }
    
    reverseCopyUser(){
        this.activeUser.loginName = this.editUser.loginName;
        this.activeUser.displayName = this.editUser.displayName;
        this.activeUser.email = this.editUser.email;
        this.activeUser.distinguishedName = this.editUser.distinguishedName;
    }
}