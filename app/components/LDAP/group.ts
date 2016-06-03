export class Group {
    public class: string = "";
    constructor(
        public distinguishedName: string = "",
        public displayName: string = "",
        public members: any = ""
    ){}
    
    copy(group: Group){
        this.distinguishedName = group.distinguishedName;
        this.displayName = group.displayName;
        this.members = group.members;
    }
    
}