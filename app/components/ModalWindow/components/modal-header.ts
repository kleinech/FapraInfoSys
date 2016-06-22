import { Component } from '@angular/core';

@Component({
    selector: 'modal-header',
    template: `
    <div class="modal-header">
        <ng-content></ng-content>
    </div>
    `
})
export class ModalHeader{}