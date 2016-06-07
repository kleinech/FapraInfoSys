import * as ldap from './ldap-functions';
import { User } from './user';

export class Group {
    public class: string = "";
    public groupName: string = "";
    public description: string = "";
    
    constructor(
        public distinguishedName: string = "",
        public displayName: string = "",
        public members: Array<User> = new Array<User>()
    ){
        this.groupName = ldap.cn(distinguishedName);
    }
    
    public copy(group: Group){
        this.groupName = group.groupName;
        this.distinguishedName = group.distinguishedName;
        this.displayName = group.displayName;
        group.members.forEach(member => {
            this.members.push(member);
        });
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + ldap.escape(this.groupName) + ",ou=groups,ou=customer,o=sccm";
    }
    
    filter(key, value){
        switch(key){
            case "class": return undefined;
            case "loginName": return undefined;
            case "email": return undefined;
            case "shortName": return undefined;
            default: return value;
        }
    }
    
    stringify(){
        if(this.members.length == 0){
            return '{"distinguishedName":"' + this.distinguishedName 
            + '","displayName":"' + this.displayName
            + '","description":"' + this.description
            + '","members":'+ '[{"type": "principalImpl","distinguishedName": "cn=dummy,ou=users,ou=customer,o=sccm","displayName": "dummy"}]' 
            +'}';
        
        } else {
            return '{"distinguishedName":"' + this.distinguishedName + '","displayName":"' + this.displayName + '","members":'+ JSON.stringify(this.members, this.filter) +'}';
        }
    }
    
}