import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Header } from './Header';

@Component({
    selector: 'table-component',
    template: `
    <div class={{class}}>
        <table class="table table-bordered table-hover tbstyle">
            <thead>
                <tr>
                    <template ngFor let-header [ngForOf]="headerList">
                        <th [style.width]="header.style">{{header.name}}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
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
                                <input type="checkbox" class="checkbox" [(ngModel)]="dt[head.tag].value" (click)="dt[head.tag].click(dt, head.tag)">
                            </td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    `,
    moduleId: module.id,
    styleUrls: ['./../css/styles.css']
})
export class TableComponent{
    @Input('headerList') headerList: Array<Header>;
    @Input('data') data: any;
    @Input('class') class: string = "";
    
    @Output() selected: EventEmitter<any> = new EventEmitter();
    
    handleSelection(sel: any){
        this.selected.emit(sel);
    }
}