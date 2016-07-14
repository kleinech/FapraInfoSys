import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Role, Roles, Permission } from './../../shared/index';

import { ModalDialog } from './../../../ModalWindow/index';

@Injectable()
export class InfoModalService {
    public modalHeader: string = "";
    public modalHeaderText: string = "";
    public permissions: Array<Permission> = new Array<Permission>();
    public modal: ModalDialog;
    
    constructor(){}
    
    public init(value: string){
        switch(value){
            case "users":
                this.modalHeader = "Privileges Granted To User";
                this.modalHeaderText = "";
                break;
            case "groups":
                this.modalHeader = "Privileges Granted To Group";
                this.modalHeaderText = "";
                break;
            case "roles":
                this.modalHeader = "Privileges Associated With Role";
                this.modalHeaderText = "";
                break;
            default:
                break;
        }
    }
    
    public getPermissionHtml(): string{
        let htmlstring: string = "";
        this.permissions.forEach(p => {
            htmlstring = htmlstring + "<p>" + p.text + "</p>";
        })
        if(this.permissions.length < 1){
            htmlstring = htmlstring + "<p>No permissions granted!</p>"
        }
        return htmlstring;
    }
    
    public open(){
        this.modal.open();
    }
    
    public close(){
        this.modal.close();
    }
    
}