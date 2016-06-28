import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';
import { Role, Roles } from './../../shared/index';

@Injectable()
export class InfoModalService {
    public modalHeader: string = "";
    public modalHeaderText: string = "";
    
    constructor(){}
    
    public init(value: string){
        switch(value){
            case "user":
                this.modalHeader = "Privileges Granted To User";
                this.modalHeaderText = "";
                break;
            case "group":
                this.modalHeader = "Privileges Granted To User";
                this.modalHeaderText = "";
                break;
            case "role":
                this.modalHeader = "Privileges Associated With Role";
                this.modalHeaderText = "";
                break;
            default:
                break;
        }
    }
    
}