import { Injectable } from '@angular/core';

import { Header } from './../../../Table/index';

@Injectable()
export class GroupsService {
     public headers: Array<Header> = new Array(
        new Header("Group Name (User Name)", "10%", "groupName"),
        new Header("Display Name", "10%", "displayName"),
        new Header("Distinguished Name", "10%", "distinguishedName")
    );
    
    public query: string = "";
    public limit: number = 50;
    public offset: number = 0;
    
}