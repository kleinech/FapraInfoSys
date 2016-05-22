import { Component }    from '@angular/core';
import { Tab }          from './tab';

@Component({
    selector: 'tabs',
    template: `
    <div class="container-fluid">
    <ul class="nav nav-tabs">
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" class={{tab.class}}> <a>
            {{ tab.title }}
        </a></li>
    </ul>
    </div>
    <ng-content></ng-content>
    `
})
export class Tabs{
    private tabs: Tab[] = [];
    
    addTab(tab:Tab) {
        if(this.tabs.length === 0){
            tab.active = true;
            tab.class = "active";
        }
        this.tabs.push(tab);
    }
    
    selectTab(tab:Tab){
        this.tabs.forEach((tab) => {
            tab.active = false;
            tab.class = "";
        })
        tab.active = true;
        tab.class = "active";
    }
    
}