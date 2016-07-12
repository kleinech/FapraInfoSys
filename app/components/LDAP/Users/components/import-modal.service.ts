import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { User, Users } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

import {Component} from '@angular/core';

import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader, FileUploaderOptions} from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8080/myapp/users';

@Injectable()
export class ImportModalService {
    public file: string = "";
    public uploader:FileUploader = new FileUploader({/*url: URL*/});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;
   
    public modalHeader: string = "";
    public modalHeaders = {
        default: "Import Users"
    };
    
    public user = {
        bulk: new Array<User>()
    };
    
    constructor(private ldapHttpService: LDAPHttpService){}
    
    public init(value: string){
        switch(value){
            default:
                this.uploader = new FileUploader({});
                while(this.user.bulk.length>0){
                    this.user.bulk.pop();
                }
                this.modalHeader = this.modalHeaders['default'];
                break;
        }
    }
    
    public submit(self: Users){
        console.log("submitting....");
        this.uploader.queue.forEach(it =>
            {
                console.log(it);
                let file : File = it._file;
                let myReader:FileReader = new FileReader();
                console.log(file.name);
                myReader.onloadend = () => {
                    console.log(myReader.result);
                    let res = JSON.parse(myReader.result);
                    res.forEach(jobj => {
                        let nuser = new User(jobj.loginName, jobj.email, jobj.displayName, jobj.distinguishedName, jobj.password);
                        this.ldapHttpService.putUser(nuser)
                        .subscribe(
                            complete=>{},
                            //TODO bulk put + self.init()
                            error => console.log(error)
                        );
                    });                    
                }
                myReader.readAsText(file);
                
            }
        );
        
        this.user.bulk.forEach(user => {
            user.setDistinguishedName();
            
            this.ldapHttpService.putUser(user)
            .subscribe( u => {
                self.users.push(u);
            });
        });
        
    }
    

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
        console.log("fobase")
    }

    public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
    }
  
    public uploadAll() {
        console.log("Up All")
    }
  
}