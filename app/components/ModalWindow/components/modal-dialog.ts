import { Component, Input, ContentChildren, QueryList } from '@angular/core';

@Component({
    selector: 'modal-dialog',
    template: `
    <div class="modal fade in modal-component" *ngIf="active">
        <div class="modal-dialog" [ngClass]="{ 'modal-sm': isSize('sm'), 'modal-lg': isSize('lg') }">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
    </div>
    `,
    moduleId: module.id,
    styleUrls: ['./../css/styles.css']
})
export class ModalDialog{
    private active: boolean = false;
    private size: string = 'lg';
    
    open(){
        this.active = true;
        document.body.classList.add('modal-open');
    }
    
    close(){
        this.active = false;
        document.body.classList.remove('modal-open');
    }
    
    isSize(s: String){
        return this.size == s;
    }
}