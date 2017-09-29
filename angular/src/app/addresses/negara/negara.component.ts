import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { NegaraServiceProxy, NegaraListDto, ListResultDtoOfNegaraListDto,CreateNegaraInput } from '@shared/service-proxies/service-proxies';
// import { CreateNegaraComponent } from "app/addresses/negara/create-negara/create-negara.component";
// import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";
import {DataTableModule,SharedModule,ToolbarModule,InputTextModule,PaginatorModule,PanelModule,ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
    templateUrl: './negara.component.html',
    animations: [appModuleAnimation()]
})
export class NegaraComponent extends AppComponentBase implements OnInit {

    // @ViewChild('createNegaraModal') createNegaraModal: CreateNegaraComponent;

    negara: NegaraListDto[] = [];
    curNegara: NegaraListDto;
    detailData: CreateNegaraInput;

    // Flag
    isSaving: boolean;
    isLoading: boolean;
    isOpenData: boolean = false;

    filter: string = '';
    dataTitle: string = 'Please select data to view or edit';
    deleteHeader: string = '';


    //negaraField
    name: string = '';
    code: string = '';

    constructor(
        injector: Injector,
        private confirmationService: ConfirmationService,
        private _negaraService: NegaraServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNegara();
        // this.resetForm();
        // this.isLoading = true;
        // setTimeout(() => {
        //     this.getNegara.then(dataReturn => this.negara = dataReturn);
        //     this.isLoading = false;
        // }, 1000);
    }
    
    ngAfterInit(): void {
        this.resetForm();
    }

    getNegara(): void {
        this._negaraService.getNegara(this.filter).subscribe((result) => {
            this.negara = result.items;
        });
    }

    search(): void {
        this.getNegara();
    }

    clearFilter(): void {
        this.filter = '';
        this.getNegara();
    }

    dataSelected(event): void {
        this.curNegara = event.data;
        this.deleteHeader = "Delete record: "+this.curNegara.name+"("+this.curNegara.code+")";
    }

    openData(): void {
        this.dataTitle = this.curNegara.name + " ("+this.curNegara.code+")";
        this.name = this.curNegara.name;
        this.code = this.curNegara.code;
        this.isOpenData = true;
    }

    formCancel(): void {
        this.resetForm();
            this.isOpenData=false;
            this.dataTitle = "Please select data to view or edit";
    }

    toggleHandler(event):void {
        if(event.collapsed){
            this.formCancel();
        }
    }

    resetForm(): void {
        this.name = '';
        this.code = '';
    }

    isDataSelected(): boolean{
        return (this.curNegara != null)
    }

    newData(): void {
        this.dataTitle = "Create New Data";
        this.name = '';
        this.code = '';
        this.isOpenData = true;
    }

    deleteData(): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });
    }

    save(): void {
        this.isSaving = true;
        this.detailData = new CreateNegaraInput();
        this.detailData.name = this.name;
        this.detailData.code = this.code;
        this._negaraService.createNegara(this.detailData)
            .finally(() => this.isSaving = false)
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.resetForm();
                this.getNegara();
                this.isOpenData=false;
            });
    }
}