import { Component }    from '@angular/core';

import { MENU_DIRECTIVES }  from './components/Menu/index';
import { LDAP_DIRECTIVES, LDAP_PROVIDERS }  from './components/LDAP/shared/index';

@Component({
    selector: 'my-app',
    templateUrl: './templates/main.tpl.html',
    directives: [MENU_DIRECTIVES, LDAP_DIRECTIVES],
    providers: [LDAP_PROVIDERS],
    moduleId: module.id
})
export class AppComponent { }

