import { Component, Input, Output, EventEmitter }    from '@angular/core';

@Component({
    selector: 'bar-item',
    template: `
    `
})
export class BarItem{
    @Input('position') position: string = "";
    @Input('type') type: string = "";
    @Input('class') class: string = "";
    @Input('name') name: string = "";
    @Input('placeholder') placeholder = "";
    @Input('options') options: Array<any> = new Array<any>({name: "", val: ""}); 
    
    
    @Output() click: EventEmitter<any> = new EventEmitter();
    
    @Input('val') val: string = "";
    @Output() valChange: EventEmitter<string> = new EventEmitter();
    
    @Input('optVal') optVal: string = "";
    @Output() optValChange: EventEmitter<string> = new EventEmitter();
    
}