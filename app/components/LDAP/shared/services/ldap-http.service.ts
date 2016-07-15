import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { cn } from './../index';

import { Group, User, Role, Principal, Permission } from './../index';
import { HttpAuthenticationService } from './http-authentication.service';

@Injectable()
export class LDAPHttpService {
    private IP: string = "http://localhost:8080/myapp/";
    private getPutHeader(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
        }); 
    }
    constructor(private http: HttpAuthenticationService){}
    
    public user: string = "sysadmin";
    public password: string = "";

    public getToken(): string{
        return this.http.getToken();
    }
    
    public authenticate(){
        return this.http.authenticate(this.IP + 'authentication', this.user, this.password);
    }
    public setUser(user : string, password : string){
        this.user = user;
        this.password = password;
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
            error => console.log(JSON.stringify(error)));
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
            this.http.put(this.IP + "groups/" + group.groupName, group.stringify(), {headers: this.getPutHeader()})
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
            error => console.log(JSON.stringify(error)));
        });
    }
    
    putUser(user:User){
        return Observable.create(observer => {
            this.http.put(this.IP + "users/" + user.loginName, user.stringify(), {headers: this.getPutHeader()})
            .subscribe(
                complete => {
                    observer.next(user);
                    observer.complete;
                }      
            );
        });
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
                res.json().forEach(jobj => {
                    let permissions: Array<Permission> = new Array<Permission>();
                    jobj.permissions.forEach(p => permissions.push(new Permission(p)));
                    roles.push(new Role(jobj.name, jobj.owners, permissions));
                });
                observer.next(roles);
                observer.complete;
            },
            error => console.log(JSON.stringify(error)));
        });
    }
    
    putRole(role:Role){
        return Observable.create(observer => {
            this.http.put(this.IP + "roles/" + role.roleName, role.stringify(), {headers: this.getPutHeader()})
            .subscribe(
                complete => {
                    observer.next(role);
                    observer.complete;
                },
                error => {
                    if(error.status == 304){
                        observer.next(role);
                        observer.complete;
                    } else {
                        console.log(error);
                        observer.complete
                    }
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
        });
    }
    
    getUserRoles(principal:Principal){
        return Observable.create(observer => {
           this.http.get(this.IP + "users/" + cn(principal.distinguishedName) + "/roles")
           .subscribe( res => {
                let roles: Array<Role> = new Array<Role>();
                res.json().forEach(jobj => {
                    let permissions: Array<Permission> = new Array<Permission>();
                    jobj.permissions.forEach(p => permissions.push(new Permission(p)));
                    roles.push(new Role(jobj.name, jobj.owners, permissions));
                });
                observer.next(roles);
                observer.complete;
           }) 
        });
    }
    
    getGroupRoles(principal:Principal){
        return Observable.create(observer => {
           this.http.get(this.IP + "groups/" + cn(principal.distinguishedName) + "/roles")
           .subscribe( res => {
                let roles: Array<Role> = new Array<Role>();
                res.json().forEach(jobj => {
                    let permissions: Array<Permission> = new Array<Permission>();
                    jobj.permissions.forEach(p => permissions.push(new Permission(p)));
                    roles.push(new Role(jobj.name, jobj.owners, permissions));
                });
                observer.next(roles);
                observer.complete;
           }) 
        });
    }
}