import { Component, Input, Output, EventEmitter } from '@angular/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { Header } from './Header';


@Component({
    selector: 'infinite-table-component',
    template: `
    <div class="{{class}} infinitetbstyle">
        <table class="table table-hover" style="border:1px solid #ddd;">
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
                            <td [style.width]="head.style" *ngIf="dt[head.tag]&&!dt[head.tag].type">
                                {{dt[head.tag]}}
                            </td>
                            <td [style.width]="head.style" *ngIf="!dt[head.tag]">
                                
                            </td>
                            <td class="tdbuttonstyle" [style.width]="head.style" *ngIf="dt[head.tag]&&dt[head.tag].type=='infoButton'">
                                <button class="btn btn-primary btn-xs" (click)="dt[head.tag].click(dt)">
                                    <span class="glyphicon glyphicon-info-sign" aria-hidden="false"></span>
                                </button>
                            </td>
                            <td class="tdbuttonstyle" [style.width]="head.style" *ngIf="dt[head.tag]&&dt[head.tag].type=='checkbox'">
                                <input type="checkbox" class="checkbox" [(ngModel)]="dt[head.tag].value" (click)="dt[head.tag].click(dt, head.tag)" [disabled]="!dt[head.tag].active">
                            </td>
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