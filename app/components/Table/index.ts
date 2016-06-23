import { Type } from '@angular/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { TableComponent } from './components/table-component';
import { InfiniteTableComponent } from './components/infinite-table-component';

export * from './components/table-component';
export * from './components/Header';
export * from './components/infinite-table-component';

export const TABLE_DIRECTIVES: Type[] = [
    TableComponent,
    InfiniteTableComponent,
    InfiniteScroll
];