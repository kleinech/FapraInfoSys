import * as ldap from './ldap-functions';

export class Group {
    public class: string = "";
    public groupName: string = "";
    
    constructor(
        public distinguishedName: string = "",
        public displayName: string = "",
        public members: any = ""
    ){
        this.groupName = ldap.cn(distinguishedName);
    }
    
    public copy(group: Group){
        this.groupName = group.groupName;
        this.distinguishedName = group.distinguishedName;
        this.displayName = group.displayName;
        this.members = group.members;
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + ldap.escape(this.groupName) + ",ou=groups,ou=customer,o=sccm";
    }
    
    stringify(){
        return '{"distinguishedName":"' + this.distinguishedName + '","displayName":"' + this.displayName + '","members":'+ JSON.stringify(this.members) +'}';
    }
    
}