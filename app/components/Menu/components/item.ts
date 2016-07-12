import { Component, Input, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { Menu }             from './menu'; 

@Component({
    selector: 'item',
    template: `
        <div *ngIf="active">
            <ng-content></ng-content>
        </div>
    `
})
export class Item {
    @Input() title;
    @ContentChildren(Item) private qitems: QueryList<Item>;
    @ContentChildren('initobj') private itms: QueryList<any>;
    public active : boolean = false; 
    public class: string = "";
    public items: Item[] = [];
    
    ngAfterContentInit() {
        this.qitems.forEach((item)=>{
            if(this.title != item.title){
                  this.addSubItem(item);  
            }
        })
    }
    
    addSubItem(item:Item) {
        if(this.items.length === 0 ){
            item.active = true;
            item.class = "active";
        }
        this.items.push(item);
    }
    
    selectSubItem(item:Item){
        this.items.forEach((item) => {
            item.active = false;
            item.class = "";
        })
        item.active = true;
        item.class = "active";
        item.itms.forEach(obj => {
            obj.init();
        });
        
    }
}