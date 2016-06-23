import { Component }    from '@angular/core';

import { MENU_DIRECTIVES }  from './components/Menu/index';
import { LDAP_DIRECTIVES, LDAP_PROVIDERS }  from './components/LDAP/shared/index';
import { Users, Groups }  from './components/LDAP/shared/index';
import { LDAPHttpService } from './components/LDAP/shared/services/ldap-http.service'

import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'my-app',
    templateUrl: './templates/main.tpl.html',
    directives: [MENU_DIRECTIVES, LDAP_DIRECTIVES],
    providers: [HTTP_PROVIDERS, LDAP_PROVIDERS, LDAPHttpService],
    moduleId: module.id
})
export class AppComponent { }

