import { Type } from '@angular/core';

import { GROUPS_DIRECTIVES, GROUPS_PROVIDERS } from './../Groups/index';
import { ROLES_DIRECTIVES } from './../Roles/index';
import { USERS_DIRECTIVES, USERS_PROVIDERS } from './../Users/index';
import { OTHERS_DIRECTIVES } from './../Others/index'

import { LdapService } from './functions/ldap-service'; 
import { LDAPHttpService } from './services/ldap-http.service';

export * from './../Groups/index';
export * from './../Roles/index';
export * from './../Users/index';
export * from './services/ldap-http.service';

export * from './functions/ldap-service';
 
export const LDAP_DIRECTIVES: Type[] = [
    ...GROUPS_DIRECTIVES,
    ...ROLES_DIRECTIVES,
    ...USERS_DIRECTIVES,
    ...OTHERS_DIRECTIVES
];

export const LDAP_PROVIDERS: Type[] = [
    LdapService,
    LDAPHttpService,
    ...GROUPS_PROVIDERS,
    ...USERS_PROVIDERS
]