import { ReflectiveInjector } from '@angular/core';
import { LdapService } from './../../shared/index';

export class User {
    public shortName: string = "";
    public class: string = "";
    private ldap: LdapService;
    constructor(
        public loginName: string = "",
        public email: string = "",
        public displayName: string = "",
        public distinguishedName: string = "",
        public password: any = ""
    ){
        let injector = ReflectiveInjector.resolveAndCreate([LdapService]);
        this.ldap = injector.get(LdapService);
        this.shortName = this.ldap.cn(distinguishedName);
    }
    
    public copy(user: User){
        this.shortName = user.shortName;
        this.distinguishedName = user.distinguishedName;
        this.displayName = user.displayName;
        this.loginName = user.loginName;
        this.email = user.email;
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + this.ldap.escape(this.shortName) + ",ou=users,ou=customer,o=sccm";
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