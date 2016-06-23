import { Type } from '@angular/core';

import { Bar} from './components/bar';
import { BarItem } from './components/bar-item';
 
export * from './components/bar';
export * from './components/bar-item';

export const MENUBAR_DIRECTIVES: Type[] = [
    Bar,
    BarItem
];