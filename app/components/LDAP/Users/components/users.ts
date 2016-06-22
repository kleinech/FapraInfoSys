import { Component, NgZone } from '@angular/core'
import { HTTP_PROVIDERS, Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { UserFilter } from './../pipes/userfilter.pipe';
import { User } from './user';
//import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

@Component({
    selector: 'users',
    templateUrl: './../templates/users.tpl.html',
    providers: [HTTP_PROVIDERS],
    pipes: [UserFilter],
    directives: [ InfiniteScroll ],
    moduleId: module.id
})
export class Users {
    private users = [];
    private query: string;
    
    private action: string = "";
    
    /*private activeUser = {
        loginName: "",
        email: "",
        displayName: "",
        distinguishedName: "",
        class: ""      
    };*/
    
    private activeUser : User = new User();
    private editUser : User = new User();
    
    private editActive: boolean = false;
    private importActive: boolean = false;
    private currentStartIdx = 0;
    private currentLimit = 3;
    private httpInfo : Http;
    
    
    private IP: string = "http://localhost:8080/myapp/";
    
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
    
    private putHeader: Headers = new Headers({
         'Content-Type': 'application/json',
    });
    
    subscribeToUsers()
    {
        this.httpInfo.get(this.IP+'users?offset='+this.currentStartIdx+'&limit='+this.currentLimit)
        .subscribe(res => {
            this.users = res.json();
        },
        error => alert(JSON.stringify(error)))
    }
    
    getMoreUsers(cnt : Number)
    {
        this.httpInfo.get(this.IP+'users?offset='
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
    pushUser(newUser : User){
        this.users.push(newUser);
        this.users = this.users.slice();
        
        var res = this.httpInfo.put(this.IP+"users/" + newUser.loginName,
            newUser.stringify(), {headers: this.putHeader})
            .subscribe(
                    complete => {
                        this.users.push(newUser);
                        this.users.slice();
                    },
                    error => alert(JSON.stringify(error))
                );
        console.log(this.IP + "users/" + newUser.loginName); 
    }
    
    // Removes User
    removeUser(user : User){
        this.removeUserById(user.loginName);
    }
    
    // Removes User by ID
    removeUserById(id : String){
        var res = this.httpInfo.delete(this.IP+"users/" + id, {headers: this.putHeader})
            .subscribe(
                    complete => {
                        //this.users.push(newUser);
                        //this.users.slice();
                    },
                    error => alert(JSON.stringify(error))
                );
                console.log("delete " + this.IP + "users/" + id);
        // TODO: LDAP        
        console.log(res);
    }
    
    ///////////////////////////////////////////////////////////////
    // END FUNCTIONS REGION
    ///////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////
    // BUTTON REGION
    ///////////////////////////////////////////////////////////////
    
  /*  zone: NgZone;
  options: Object = {
    url: 'http://ng2-uploader.com:10050/upload'
  };
  basicProgress: number = 0;
  basicResp: Object;
  multipleProgress: number = 0;
  multipleResp: any[] = [];
  dropProgress: number = 0;
  dropResp: any[] = [];
    handleBasicUpload(data): void {
    this.basicResp = data;
    this.zone.run(() => {
      this.basicProgress = data.progress.percent;
    });
  }*/
    
    new(){
        if(this.editActive === false || this.action === 'new' || this.action === ''){
            this.editActive = !this.editActive;
        }
        this.editUser = new User();
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
        this.removeUserById(this.activeUser.loginName)
    }
    
    btnImport(){
        if(this.editActive === false || this.action === 'edit' || this.action === ''){
            this.importActive = this.editActive = !this.editActive;
        }
        
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
            var newUser = new User('User_'+i, "User"+i+"@example.com",'User_'+i,'User_'+i);
            this.pushUser(newUser);
                
        }
    }
    btnTmpRemoveMany(){
        var i = 0;
        for(i = 0; i<1000; i++)
        {
            var newUser = new User('User_'+i, "User"+i+"@example.com",'User_'+i,'User_'+i);
            this.removeUser(newUser);
                
        }
    }
    
    btnClearUsers(){
        this.users = [];
    }

    onSubmit(){
        this.importActive = this.editActive = false;
        switch(this.action){
            case 'edit':
                this.reverseCopyUser();
                
                //TODO LDAP update user
                this.pushUser(this.activeUser);
                
                break;
            case 'new':
                var newUser : User = new User(
                    this.editUser.loginName,
                    this.editUser.email,
                    this.editUser.displayName,
                    this.editUser.distinguishedName);
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
            //this.activeUser.class = "";
        }
        value.class="active";
        this.activeUser = new User(value.loginName, value.email, 
                value.displayName, value.distinguishedName);
        if(this.action === 'edit'){
            this.copyUser();    
        }
    }
    
    ///////////////////////////////////////////////////////////////
    // END EVENT REGION
    ///////////////////////////////////////////////////////////////
    
    
}