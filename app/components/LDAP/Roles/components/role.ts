import { ReflectiveInjector } from '@angular/core';
import { User, LdapService } from './../../shared/index';

export class Role {
    public class: string = "";
    private ldap: LdapService;
    public distinguishedName: string = "";
    
    constructor(
        public roleName: string = "",
        public owners: Array<String> = new Array<String>(),
        public permissions: Array<string> = new Array<string>()
    ){
        let injector = ReflectiveInjector.resolveAndCreate([LdapService]);
        this.ldap = injector.get(LdapService);
        this.setDistinguishedName();
    }
    
    public copy(role: Role){
        this.roleName = role.roleName;
        this.distinguishedName = role.distinguishedName;
        role.owners.forEach(element => {
            this.owners.push(element);
        });
        role.permissions.forEach(element => {
            this.permissions.push(element);
        });
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + this.ldap.escape(this.roleName) + ",ou=groups,ou=customer,o=sccm";
    }
    
    stringify(){
        return '{"name":"' + this.distinguishedName + '","owners":'+ JSON.stringify(this.owners) +',"permissions":'+ JSON.stringify(this.permissions) +'}';
    }
    
}