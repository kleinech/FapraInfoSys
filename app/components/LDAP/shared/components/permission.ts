export class Permission {
    public class:string = "";
    
    constructor(
        public text: string = ""
    ){}
    
    public copy(permission: Permission){
        this.text = permission.text;
    }
}