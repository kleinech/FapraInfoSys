import { Type } from '@angular/core';

import { ModalDialog } from './components/modal-dialog';
import { ModalHeader } from './components/modal-header';
import { ModalBody } from './components/modal-body';
import { ModalFooter } from './components/modal-footer';

export * from './components/modal-dialog';
export * from './components/modal-header';
export * from './components/modal-body';
export * from './components/modal-footer';
 
export const MODAL_DIRECTIVES: Type[] = [
    ModalDialog,
    ModalHeader,
    ModalBody,
    ModalFooter
];