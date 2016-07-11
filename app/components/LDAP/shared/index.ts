import { Type } from '@angular/core';

import { GROUPS_DIRECTIVES, GROUPS_PROVIDERS } from './../Groups/index';
import { ROLES_DIRECTIVES, ROLES_PROVIDERS } from './../Roles/index';
import { USERS_DIRECTIVES, USERS_PROVIDERS } from './../Users/index';
import { OTHERS_DIRECTIVES } from './../Others/index';
import { LDAPHttpService } from './services/ldap-http.service';
import { HttpAuthenticationService } from './services/http-authentication.service';

export * from './../Groups/index';
export * from './../Roles/index';
export * from './../Users/index';
export * from './services/ldap-http.service';

export * from './functions/ldap.functions';
export * from './components/principal';
export * from './components/permission';
 
export const LDAP_DIRECTIVES: Type[] = [
    ...GROUPS_DIRECTIVES,
    ...ROLES_DIRECTIVES,
    ...USERS_DIRECTIVES,
    ...OTHERS_DIRECTIVES
];

export const LDAP_PROVIDERS: Type[] = [
    LDAPHttpService,
    ...GROUPS_PROVIDERS,
    ...USERS_PROVIDERS,
    ...ROLES_PROVIDERS,
    HttpAuthenticationService
]