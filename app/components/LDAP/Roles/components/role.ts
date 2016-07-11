import { User, cn, escape, Permission } from './../../shared/index';

export class Role {
    public class: string = "";
    public distinguishedName: string = "";
    
    public info: any = {};
    public inherit: any = {};
    public explicit: any = {}; 
    
    constructor(
        public roleName: string = "",
        public owners: Array<String> = new Array<String>(),
        public permissions: Array<Permission> = new Array<Permission>()
    ){
        this.setDistinguishedName();
    }
    
    public copy(role: Role){
        this.roleName = role.roleName;
        this.distinguishedName = role.distinguishedName;
        this.owners = new Array<String>();
        role.owners.forEach(element => {
            this.owners.push(element);
        });
        this.permissions = new Array<Permission>();
        role.permissions.forEach(element => {
            this.permissions.push(element);
        });
    }
    
    setDistinguishedName(){
        this.distinguishedName = "cn=" + escape(this.roleName) + ",ou=groups,ou=customer,o=sccm";
    }
    
    stringify(){
        return '{"name":"' + this.distinguishedName + '","owners":'+ JSON.stringify(this.owners) +',"permissions":'+ JSON.stringify(this.getPermissions()) +'}';
    }
    
    
    public getPermissions(){
        let res: Array<string> = new Array<string>();
        this.permissions.forEach(p => res.push(p.text));
        return res;
    }
    
}