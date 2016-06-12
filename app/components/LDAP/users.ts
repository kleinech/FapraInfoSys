import { Component } from '@angular/core'
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { UserFilter } from '../../pipes/userfilter.pipe';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {Headers} from '@angular/http';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
    selector: 'users',
    templateUrl: 'app/templates/users.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [UserFilter],
    directives: [ InfiniteScroll ]
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
    
    ///////////////////////////////////////////////////////////////
    // FUNCTIONS REGION
    ///////////////////////////////////////////////////////////////
    
    subscribeToUsers()
    {
        this.httpInfo.get('http://localhost:8080/myapp/users/dyn?startIdx='+this.currentStartIdx+'&limit='+this.currentLimit)
        .subscribe(res => {
            this.users = res.json();
        },
        error => alert(JSON.stringify(error)))
    }
    
    getMoreUsers(cnt : Number)
    {
        this.httpInfo.get('http://localhost:8080/myapp/users/dyn?startIdx='
            + this.users.length+'&limit='
            + cnt)
        .subscribe(res => {
            this.users = this.users.concat(res.json());
        },
        error => alert(JSON.stringify(error)))
        console.log("userlen: " + this.users.length + "limit: " + this.currentLimit)
        //this.currentLimit += 3;
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
    
    /** Pushes new user to LDAP */
    pushUser(newUser){
        this.users.push(newUser);
        this.users = this.users.slice();
        
        // TODO: LDAP        
        
    }
    
    ///////////////////////////////////////////////////////////////
    // END FUNCTIONS REGION
    ///////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////
    // BUTTON REGION
    ///////////////////////////////////////////////////////////////
    
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
    btnLoadMore(){
        this.getMoreUsers(this.currentLimit);
    }
    
    btnTmpCreateMany(){
        var i = 0;
        for(i = 0; i<1000; i++)
        {
            var newUser = {
                    loginName: "TestUser " + i,
                    displayName: "TestUser " + i,
                    email: "TestUser" + i + "@example.com",
                    distinguishedName: "cn=TestUser" + i + ",ou=users,ou=customer,o=sccm"
                };
                this.pushUser(newUser);
                
        }
    }
    btnTmpRemoveMany(){
        // TODO
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
                this.pushUser(newUser);
                
                break;
            default:
        }
    }
    
    ///////////////////////////////////////////////////////////////
    // BUTTONS REGION
    ///////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////
    // EVENTS REGION
    ///////////////////////////////////////////////////////////////
    
    
    onScroll () {
	    console.log('scrolled!!');
        this.getMoreUsers(this.currentLimit);
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
    
    ///////////////////////////////////////////////////////////////
    // END EVENT REGION
    ///////////////////////////////////////////////////////////////
    
    
}