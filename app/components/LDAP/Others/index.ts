import { Type } from '@angular/core';

import { EncryptionKey } from './components/encryptionkey';
import { FilterAndSettings } from './components/filterandsettings';

export * from './components/encryptionkey';
export * from './components/filterandsettings';
 
export const OTHERS_DIRECTIVES: Type[] = [
    EncryptionKey,
    FilterAndSettings
];