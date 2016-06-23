import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { Header } from './Header';


@Component({
    selector: 'infinite-table-component',
    template: `
    <div class="{{class}} infinitetbstyle">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <template ngFor let-header [ngForOf]="headerList">
                        <th [style.width]="header.style">{{header.name}}</th>
                    </template>
                </tr>
            </thead>
        
    
            <tbody class="search-results" infinite-scroll [infiniteScrollDistance]="2" [infiniteScrollThrottle]="200" (scrolled)="scrolled.emit($event)" [scrollWindow]="false">
                <template ngFor let-dt [ngForOf]="data">
                    <tr class={{dt.class}} (click)="handleSelection(dt)">
                        <template ngFor let-head [ngForOf]="headerList">
                            <td [style.width]="head.style">{{dt[head.tag]}}</td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    `,
    moduleId: module.id,
    styleUrls: ['./../css/styles.css'],
    directives: [InfiniteScroll]
})
export class InfiniteTableComponent{
    @Input('headerList') headerList: Array<Header>;
    @Input('data') data: any;
    @Input('class') class: string = "";
    
    @Output() selected: EventEmitter<any> = new EventEmitter();
    @Output() scrolled: EventEmitter<any> = new EventEmitter();
    
    handleSelection(sel: any){
        this.selected.emit(sel);
    }
}