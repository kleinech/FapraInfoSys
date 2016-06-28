export class Principal {
    public info: any = "";
    
    public class: string = "";
    
    constructor(
        public displayName: string = "",
        public distinguishedName: string = ""
    ){}
    
    public copy(principal: Principal){
        this.info = principal.info;
        this.distinguishedName = principal.distinguishedName;
        this.displayName = principal.displayName;
    }
}