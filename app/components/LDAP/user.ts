import * as ldap from './ldap-functions';

export class User {
    public shortName: string = "";
    constructor(
        public loginName: string = "",
        public email: string = "",
        public displayName: string = "",
        public distinguishedName: string = ""
    ){
        this.shortName = ldap.cn(distinguishedName);
    }
    
    public copy(user: User){
        this.shortName = user.shortName;
        this.distinguishedName = user.distinguishedName;
        this.displayName = user.displayName;
        this.loginName = user.loginName;
        this.email = user.email;
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + ldap.escape(this.shortName) + ",ou=users,ou=customer,o=sccm";
    }
    
    stringify(){
        return JSON.stringify(this);
    }
}