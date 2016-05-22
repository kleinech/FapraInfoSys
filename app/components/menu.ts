import { Component, ContentChildren, QueryList }    from '@angular/core';
import { Item }          from './item';

@Component({
    selector: 'menu',
    template: `
    <div class="row">
    <div class="col-xs-3">
        <ul class="nav nav-pills nav-stacked">
        <template ngFor let-item [ngForOf]="items">
            <li (click)="selectItem(item)" class="{{item.class}} item"> <a>
                {{ item.title }}
            </a></li>
            <ul *ngIf="item.active" class="nav nav-pills nav-stacked subul">
                <template ngFor let-subitem [ngForOf]="item.items">
                    <li *ngIf="subitem.title!='Content'" (click)="item.selectSubItem(subitem)" class="{{subitem.class}} item"><a>{{subitem.title}}</a></li>
                </template>
            </ul>
        </template>
        </ul>
    </div>
    <div class="col-xs-9" style="padding-left:0px">
        <ng-content></ng-content>
    </div>
    </div>
    `
})
export class Menu{
    private items: Item[] = [];
    @ContentChildren(Item) private qitems: QueryList<Item>;
    
    ngAfterContentInit() {
        this.qitems.forEach((item)=>{
            this.addItem(item);
        })
    }
    
    addItem(item:Item) {
        if(this.items.length === 0){
            item.active = true;
            item.class = "active";
        }
        this.items.push(item);
    }
    
    selectItem(item:Item){
        this.items.forEach((item) => {
            item.active = false;
            item.class = "";
        })
        item.items.forEach((item) => {
            item.active = false;
            item.class = "";
            if(item.title === "Content"){
                item.active = true;
            }
        })
        
        item.active = true;
        item.class = "active";
    }
    
}