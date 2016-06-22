import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Header } from './Header';

@Component({
    selector: 'table-component',
    template: `
    <div class="container-fluid">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <template ngFor let-header [ngForOf]="headerList">
                        <th style={{header.style}} name={{header.name}}>{{header.name}}</th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <template ngFor let-dt [ngForOf]="data">
                    <tr class={{dt.class}} (click)="handleSelection(dt)">
                        <template ngFor let-head [ngForOf]="headerList">
                            <td>{{dt[head.tag]}}</td>
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
    
    @Output() selected: EventEmitter<any> = new EventEmitter();
    
    handleSelection(sel: any){
        this.selected.emit(sel);
    }
}