import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { User, Users } from './../../shared/index';
import { LDAPHttpService } from './../../shared/services/ldap-http.service'

import {Component} from '@angular/core';

import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload/ng2-file-upload';


@Injectable()
export class ImportModalService {
    public file: string = "";
    public uploader:FileUploader = new FileUploader({url: URL});
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
                while(this.user.bulk.length>0){
                    this.user.bulk.pop();
                }
                this.modalHeader = this.modalHeaders['default'];
                break;
        }
    }
    
    public submit(self: Users){
        this.user.bulk.forEach(user => {
            user.setDistinguishedName();
            
            this.ldapHttpService.putUser(user)
            .subscribe( u => {
                self.users.push(u);
            });
        });
    }
    
  uploadFile: any;
  options: Object = {
    url: 'http://localhost:10050/upload'
  };

public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    console.log("fobase")
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
    
}