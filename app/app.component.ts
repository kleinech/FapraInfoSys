import { Component }    from '@angular/core';
import { Tabs }         from './components/tabs';
import { Tab }          from './components/tab';
import { Menu }          from './components/menu';
import { Item }          from './components/item';
import { Users }          from './components/LDAP/users';
import { Roles }          from './components/LDAP/roles';
import { Groups }          from './components/LDAP/groups';
import { FilterAndSettings }          from './components/LDAP/filterandsettings';
import { EncryptionKey }          from './components/LDAP/encryptionkey';
@Component({
  selector: 'my-app',
  templateUrl: 'app/templates/main.tpl.html',
  directives: [Tabs, Tab, Menu, Item, Users, Roles, Groups, FilterAndSettings, EncryptionKey]
})
export class AppComponent { }

