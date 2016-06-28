import { Type } from '@angular/core';

import { Groups } from './components/groups';
import { GroupsService } from './components/groups.service'
import { GroupsCRUDModalService } from './components/groups-crud-modal.service'
import { MembersModalService } from './components/members-modal.service'

export * from './components/groups';
export * from './components/group';
 
export const GROUPS_DIRECTIVES: Type[] = [
    Groups
];

export const GROUPS_PROVIDERS: Type[] = [
    GroupsService,
    GroupsCRUDModalService,
    MembersModalService
];