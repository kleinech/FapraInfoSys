export class Group {
    public class: string = "";
    constructor(
        public groupName: string = "",
        public distinguishedName: string = "",
        public displayName: string = "",
        public members: any = ""
    ){}
    
    copy(group: Group){
        this.groupName = group.displayName;
        this.distinguishedName = group.distinguishedName;
        this.displayName = group.displayName;
        this.members = group.members;
    }
    
}