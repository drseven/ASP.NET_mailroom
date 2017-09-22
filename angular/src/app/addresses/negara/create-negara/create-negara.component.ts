import { Component, ViewChild, Injector, ElementRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { NegaraServiceProxy, CreateNegaraInput } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'create-negara-modal',
    templateUrl: './create-negara.component.html'
})

export class CreateNegaraComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('createNegaraModal') modal: ModalDirective;
    // @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('modalContent') modalContent: ElementRef;

    thisData: CreateNegaraInput;

    active: boolean = false;
    saving: boolean = false;

    constructor(
        injector: Injector,
        private _thisService: NegaraServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.thisData = new CreateNegaraInput();
        this.modal.show();
    }

    onShown(): void {
        // $(this.nameInput.nativeElement).focus();
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        this.saving = true;
        this._thisService.createNegara(this.thisData)
            .finally(() => this.saving = false)
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(this.thisData);
            });
    }

    close(): void {
        this.modal.hide();
        this.active = false;
    }
}