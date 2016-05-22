import { Component, Input } from '@angular/core';
import { Tabs }             from './tabs';   

@Component({
    selector: 'tab',
    template: `
        <div [hidden]="!active">
            <ng-content></ng-content>
        </div>
    `
})
export class Tab {
    @Input() title;
    public active : boolean = false; 
    public class: string = "";
    
    constructor(tabs:Tabs){
        tabs.addTab(this);
    }
}