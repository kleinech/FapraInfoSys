import { Type } from '@angular/core';

import { Roles } from './components/roles';
import { RolesService } from './components/roles.service';
import { RolesCRUDModalService } from './components/roles-crud-modal.service'
import { InfoModalService } from './components/info-modal.service'

export * from './components/roles';
export * from './components/role';
 
export const ROLES_DIRECTIVES: Type[] = [
    Roles
];

export const ROLES_PROVIDERS: Type[] = [
    RolesService,
    RolesCRUDModalService,
    InfoModalService
]