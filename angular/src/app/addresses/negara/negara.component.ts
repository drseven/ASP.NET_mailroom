import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { NegaraServiceProxy, NegaraListDto, ListResultDtoOfNegaraListDto,CreateNegaraInput, EditNegaraInput } from '@shared/service-proxies/service-proxies';
import swal from 'sweetalert';
import {DataTableModule,SharedModule,
    ToolbarModule,InputTextModule,
    PaginatorModule,PanelModule,
    SplitButtonModule,MenuModule,
    MenuItem,TooltipModule,DialogModule} from 'primeng/primeng';

@Component({
    templateUrl: './negara.component.html',
    animations: [appModuleAnimation()]
})
export class NegaraComponent extends AppComponentBase implements OnInit {

    negara: NegaraListDto[] = [];
    curNegara: NegaraListDto;
    detailData: CreateNegaraInput;
    updateData: EditNegaraInput;

    // Flag
    isSaving: boolean;
    isLoading: boolean = false;
    isOpenData: boolean = false;
    isViewOnly: boolean = false;
    formMode: number = 0;

    filter: string = '';
    bufferFilter: string = '';
    dataTitle: string = 'Please select data to view or edit';
    deleteHeader: string = '';

    tmcMenu: MenuItem[];
    tmcFreezeOnlyMenu: MenuItem[];


    //negaraField
    negaraID: number = 0;
    name: string = '';
    code: string = '';

    constructor(
        injector: Injector,
        private _negaraService: NegaraServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNegara();

        this.tmcMenu = [
            {label: 'View', icon: 'fa-eye', command: (event) => console.log(event)},
            {label: 'Edit', icon: 'fa-pencil', command: (event) => console.log(event)},
            {label: 'Delete', icon: 'fa-trash', command: (event) => console.log(event)},
            {label: 'Freeze Row', icon: 'fa-link', command: (event) => console.log(event)}
        ];
    }
    
    ngAfterInit(): void {
        this.resetForm();
    }


    // DB TRANSACTION
    getNegara(): void {
        // this._negaraService.getNegara(this.filter).subscribe((result) => {
        //     this.negara = result.items;
        // });

        this.isLoading = true;

        this._negaraService.getNegaraAsync(this.filter,0)
        .finally(() => {
            this.isLoading=false;
        })
        .subscribe((result) =>{
            this.negara = result.items;
        })
    }

    createNegara(): void {
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

    updateNegara(): void{
        this.isSaving = true;
        this.updateData = new EditNegaraInput();
        this.updateData.name = this.name;
        this.updateData.code = this.code;
        this.updateData.id = this.negaraID;
        this.updateData.lastModifierUserId = this.appSession.getUserID();
        this._negaraService.editNegara(this.updateData)
            .finally(() => this.isSaving = false)
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.resetForm();
                this.getNegara();
                this.isOpenData=false;
            });
    }



    // DATA TABLE ACTIVITY
    search(): void {
        this.filter = this.bufferFilter;
        this.getNegara();
    }

    clearFilter(): void {
        this.filter = '';
        this.bufferFilter = '';
        this.getNegara();
    }

    refresh(): void {
        this.bufferFilter = this.filter;
        this.getNegara();
    }


    isDataSelected(): boolean{
        return (this.curNegara != null)
    }

    // CRUD
    viewData(): void {
        console.log(this.curNegara);
        this.isViewOnly = true;
        this.dataTitle = this.curNegara.name + " ("+this.curNegara.code+")";
        this.negaraID = this.curNegara.id;
        this.name = this.curNegara.name;
        this.code = this.curNegara.code;
        this.isOpenData = true;
    }

    editData(): void {
        this.isViewOnly = false;
        this.dataTitle = this.curNegara.name + " ("+this.curNegara.code+")";
        this.negaraID = this.curNegara.id;
        this.name = this.curNegara.name;
        this.code = this.curNegara.code;
        this.isOpenData = true;
    }

    newData(): void {
        this.dataTitle = "Create New Data";
        this.name = '';
        this.code = '';
        this.isOpenData = true;
    }

    deleteData() {
        swal({
          title: "Are you sure?",
          text: "You will not be able to undo this action",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: true,
          dangerMode: true,
        },
        confirmed => {
           if(confirmed) {
               this._negaraService.deleteNegara(this.curNegara.id).subscribe(() => {
                    this.notify.info(this.l('SuccessfullyDeleted'));
                    // _.remove(this.negara, this.curNegara);
                    this.getNegara();
                });
           }else{

           }
        });
    }

    save(): void {

    }

    saveUpdate(): void {

    }

    // FORM ACTIVITY
    formCancel(): void {
        this.resetForm();
        this.isOpenData=false;
    }

    resetForm(): void {
        this.name = '';
        this.code = '';
    }

    completeSelection(): void{
        if(this.formMode=0)this.createNegara();
        else this.updateNegara();
    }

    formClose(): void {
        this.isViewOnly = false;
        this.isOpenData = false;
    }
}