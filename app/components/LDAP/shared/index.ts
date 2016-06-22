import { Type } from '@angular/core';

import { GROUPS_DIRECTIVES } from './../Groups/index';
import { ROLES_DIRECTIVES } from './../Roles/index';
import { USERS_DIRECTIVES } from './../Users/index';
import { OTHERS_DIRECTIVES } from './../Others/index'

import { LdapService } from './functions/ldap-service'; 

export * from './../Groups/index';
export * from './../Roles/index';
export * from './../Users/index';

export * from './functions/ldap-service';
 
export const LDAP_DIRECTIVES: Type[] = [
    ...GROUPS_DIRECTIVES,
    ...ROLES_DIRECTIVES,
    ...USERS_DIRECTIVES,
    ...OTHERS_DIRECTIVES
];

export const LDAP_PROVIDERS: Type[] = [
    LdapService
]