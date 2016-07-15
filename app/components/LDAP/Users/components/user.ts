import { cn, escape } from './../../shared/index';

export class User {
    public class: string = "";
    constructor(
        public loginName: string = "",
        public email: string = "",
        public displayName: string = "",
        public distinguishedName: string = "",
        public password: any = ""
    ){}
    
    public copy(user: User){
        this.distinguishedName = user.distinguishedName;
        this.displayName = user.displayName;
        this.loginName = user.loginName;
        this.email = user.email;
        this.password = user.password;
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + escape(this.loginName) + ",ou=users,ou=customer,o=sccm";
    }
    
    stringify(){
        //return JSON.stringify(this);
        
        /*return '{' //"id":"' + this.distinguishedName  
            + '"name":"' + this.displayName
            + '","password":"' + 'whatpw'
            +'"}';*/
        
        /*return '{"distinguishedName":"' + '"' + this.distinguishedName + '"'  
            + '","displayName":"' + '"' + this.displayName + '"'
            + '","loginName":"' + '"' + this.loginName + '"'
            +'}';*/
        
        return '{"distinguishedName":"' + this.distinguishedName  
            + '","displayName":"' + this.displayName
            + '","loginName":"' + this.loginName
            + '","password":"' + this.password
            + '","mail":"' + this.email
            +'"}';
        
    }
}