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
    
    private activeUser;
    
    private debugMessage: String;
    
    constructor(http: Http){
        //Test with JSON file
        http.request('app/data/Users.json')
        .subscribe(res => {
            this.users = res.json();
        })
    }
        
    new(){
        this.debugMessage = "New Function called!";
        //TODO
    }
    
    edit(){
        if(this.activeUser){
            this.debugMessage = "Edit " + JSON.stringify(this.activeUser);
        } else {
            this.debugMessage = "Edit: No User selected!";
        }
        //TODO
    }
    
    delete(){
        if(this.activeUser){
            var index = this.users.indexOf(this.activeUser);
            if (index > -1) {
                this.users = [
                    ...this.users.slice(0, index),
                    ...this.users.slice(index + 1, this.users.length)
                ];
            }
            //TODO delete in LDAP
        } else {
            this.debugMessage = "Delete: No User selected!";
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
    }
}