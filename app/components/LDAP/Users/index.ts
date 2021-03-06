import { Type } from '@angular/core';

import { Users } from './components/users';
import { UsersService } from './components/users.service'
import { UsersCRUDModalService } from './components/users-crud-modal.service'
import { ImportModalService } from './components/import-modal.service'

export * from './components/users';
export * from './components/user';
 
export const USERS_DIRECTIVES: Type[] = [
    Users
];

export const USERS_PROVIDERS: Type[] = [
    UsersService,
    UsersCRUDModalService,
    ImportModalService
];