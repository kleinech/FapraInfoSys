import { User, cn, escape } from './../../shared/index';

export class Group {
    public class: string = "";
    public groupName: string = "";
    public description: string = "";
    
    constructor(
        public distinguishedName: string = "",
        public displayName: string = "",
        public members: Array<User> = new Array<User>()
    ){
        this.groupName = cn(distinguishedName);
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
        this.distinguishedName = "cn=" + escape(this.groupName) + ",ou=groups,ou=customer,o=sccm";
    }
    
    getMemberStrings(): String[]{
        let membString: Array<String> = new Array<String>();
        this.members.forEach(element => {
            membString.push(element.distinguishedName)
        });
        return membString;
    }
    
    filter(key, value){
        switch(key){
            case "class": return undefined;
            case "loginName": return undefined;
            case "email": return undefined;
            case "shortName": return undefined;
            //default: return value;
            case "distinguishedName": return value;
            case "": return value;
            default: return "";
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
            //return '{"distinguishedName":"' + this.distinguishedName + '","displayName":"' + this.displayName + '","members":'+ JSON.stringify(this.members, this.filter) +'}';
            return '{"distinguishedName":"' + this.distinguishedName + '","displayName":"' + this.displayName + '","members":'+ JSON.stringify(this.getMemberStrings()) +'}';
        
        }
    }
    
}