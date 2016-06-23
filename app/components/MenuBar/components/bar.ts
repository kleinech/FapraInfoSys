import { Component, ContentChildren, QueryList  }    from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { BarItem } from './bar-item';

@Component({
    selector: 'bar',
    template: `
    <div class="container-fluid lrpadding">
        <div class="col-xs-6 mycol" *ngIf="litems.length>0||ritems.length>0">
            <template ngFor let-item [ngForOf]="litems">
                <div class="input-group" *ngIf="item.type=='input'">
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <div class="input-group" *ngIf="item.type=='inputWOption'">
                    <span class="input-group-btn">
                        <select class="btn" [ngModel]="item.optVal" (ngModelChange)="item.optVal=$event;item.optValChange.emit($event);">
                            <template ngFor let-opt [ngForOf]="item.options">
                                <option value={{opt.val}}>{{opt.name}}</option>
                            </template>
                        </select>
                    </span>
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <button *ngIf="item.type=='button'" type="button" [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
            </template>
        </div>
        <div class="col-xs-6 mycol" *ngIf="litems.length>0||ritems.length>0">
            <template ngFor let-item [ngForOf]="ritems">
                <div class="input-group" *ngIf="item.type=='input'">
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <div class="input-group" *ngIf="item.type=='inputWOption'">
                    <span class="input-group-btn">
                        <select class="btn" [ngModel]="item.optVal" (ngModelChange)="item.optVal=$event;item.optValChange.emit($event);">
                            <template ngFor let-opt [ngForOf]="item.options">
                                <option value={{opt.val}}>{{opt.name}}</option>
                            </template>
                        </select>
                    </span>
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <button *ngIf="item.type=='button'" type="button" [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
            </template>
        </div>
        <div class="col-xs-12 mycol" *ngIf="items.length>0">
            <template ngFor let-item [ngForOf]="items">
                <div class="input-group" *ngIf="item.type=='input'">
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <div class="input-group" *ngIf="item.type=='inputWOption'">
                    <span class="input-group-btn">
                        <select class="btn" [ngModel]="item.optVal" (ngModelChange)="item.optVal=$event;item.optValChange.emit($event);">
                            <template ngFor let-opt [ngForOf]="item.options">
                                <option value={{opt.val}}>{{opt.name}}</option>
                            </template>
                        </select>
                    </span>
                    <input type="text" class="form-control" [ngModel]="item.val" (ngModelChange)="item.val=$event;item.valChange.emit($event);" placeholder={{item.placeholder}}>
                    <span class="input-group-btn">
                        <button [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
                    </span>
                </div>
                <button *ngIf="item.type=='button'" type="button" [ngClass]=item.class (click)="item.click.emit($event)">{{item.name}}</button>
            </template>
        </div>
    </div>
    `,
    styleUrls: ['./../css/styles.css'],
    moduleId: module.id
})
export class Bar{
    private items:  Array<BarItem> = new Array<BarItem>();
    private litems: Array<BarItem> = new Array<BarItem>();
    private ritems: Array<BarItem> = new Array<BarItem>();
    
    @ContentChildren(BarItem) private qitems: QueryList<BarItem>;
    
    ngAfterContentInit() {
        this.qitems.forEach(item  => {
            switch(item.position){
                case "right":
                    this.ritems.push(item);
                    break;
                case "left":
                    this.litems.push(item);
                    break;
                default:
                    this.items.push(item);
            }            
        });
    }
    
}