import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Group, User, Role } from './../index';

@Injectable()
export class LDAPHttpService {
    private IP: string = "http://localhost:8080/myapp/";
    private putHeader: Headers = new Headers({
            'Content-Type': 'application/json'
    });
    constructor(private http: Http){this.authenticate();};
    
    authenticate() {
        console.log("Authenticating..")
        let auth = this.http.post(this.IP + "authentication", 
            '{"username": "User_1", "password": ""}', {headers: this.putHeader})
            .subscribe(res => {
                console.log(res);
                error => alert(JSON.stringify(error));
            });
        console.log(auth);
        console.log("auth end")
    }
    
    getGroups(offset:number = 0, limit:number = 50, filter:string = ""){
        return Observable.create(observer => {
            this.http.get(this.IP + 'groups?offset=' + offset + '&limit=' + limit + '&filter=' + filter)
            .subscribe(res => {
                let groups: Array<Group> = new Array<Group>();
                res.json().forEach(jobj => groups.push(new Group(jobj.distinguishedName, jobj.displayName)));
                observer.next(groups);
                observer.complete;
            },
            error => alert(JSON.stringify(error)));
        });
    }
    
    getGroupMembers(mname: string){
        return Observable.create(observer => {
            let members: Array<User> = new Array<User>();
            if (mname.length > 0){
                this.http.get(this.IP + "groups/" + mname + "/members")
                .subscribe(res => {
                    res.json().forEach(member => members.push(new User("","",member.displayName,member.distinguishedName)));
                    observer.next(members);
                    observer.complete;
                });    
            } else {
                observer.next(members);
                observer.complete;
            }
            
        });
    }
    
    putGroup(group:Group){
        return Observable.create(observer => {
            this.http.put(this.IP + "groups/" + group.groupName, group.stringify(), {headers: this.putHeader})
            .subscribe(
                complete => {
                    observer.next(group);
                    observer.complete;
                }      
            );
        });
    }
    
    deleteGroup(group:Group){
        return Observable.create(observer => {
            this.http.delete(this.IP + "groups/" + group.groupName)
            .subscribe( complete => {
                observer.next(group);
                observer.complete;
            })
        })
    }
    
    getUsers(offset:number = 0, limit:number = 50, filter:string = ""){
        return Observable.create(observer => {
            this.http.get(this.IP + 'users?offset=' + offset + '&limit=' + limit + '&filter=' + filter)
            .subscribe(res => {
                let users: Array<User> = new Array<User>();
                res.json().forEach(jobj => users.push(new User(jobj.loginName, jobj.email, jobj.displayName, jobj.distinguishedName, jobj.password)));
                observer.next(users);
                observer.complete;
            },
            error => alert(JSON.stringify(error)));
        });
    }
    
    putUser(user:User){
        console.log("Putting User " + user.loginName + " - " + user.stringify())
        return Observable.create(observer => {
            this.http.put(this.IP + "users/" + user.loginName, user.stringify(), {headers: this.putHeader})
            .subscribe(
                complete => {
                    observer.next(user);
                    observer.complete;
                }      
            );
        });
    }
    
    postUsers(users : string){
        
        let res = JSON.parse(users);
        let usersArr: Array<User> = new Array<User>();
        res.forEach(jobj => usersArr.push(new User(jobj.loginName, jobj.email, jobj.displayName, jobj.distinguishedName, jobj.password)));
        usersArr.forEach(it => this.putUser(it))
        /*
        return Observable.create(observer => {
            this.http.put(this.IP + "users/test", users, {headers: this.putHeader})
            .subscribe(
                complete => {
                    observer.next(users);
                    observer.complete;
                }, 
                error => alert(JSON.stringify(error)));
        });*/
    }
    
    deleteUser(user:User){
        return Observable.create(observer => {
            this.http.delete(this.IP + "users/" + user.loginName)
            .subscribe( complete => {
                observer.next(user);
                observer.complete;
            })
        })
    }
    
    getRoles(offset:number = 0, limit:number = 50, filter:string = ""){
        return Observable.create(observer => {
            this.http.get(this.IP + 'roles?offset=' + offset + '&limit=' + limit + '&filter=' + filter)
            .subscribe(res => {
                let roles: Array<Role> = new Array<Role>();
                res.json().forEach(jobj => roles.push(new Role(jobj.name, jobj.owners, jobj.permissions)));
                observer.next(roles);
                observer.complete;
            },
            error => alert(JSON.stringify(error)));
        });
    }
    
    putRole(role:Role){
        return Observable.create(observer => {
            this.http.put(this.IP + "roles/" + role.roleName, role.stringify(), {headers: this.putHeader})
            .subscribe(
                complete => {
                    observer.next(role);
                    observer.complete;
                }      
            );
        });
    }
    
    deleteRole(role:Role){
        return Observable.create(observer => {
            this.http.delete(this.IP + "roles/" + role.roleName)
            .subscribe( complete => {
                observer.next(role);
                observer.complete;
            })
        })
    }
}