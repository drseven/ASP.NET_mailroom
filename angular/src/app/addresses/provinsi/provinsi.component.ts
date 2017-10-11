import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProvinsiServiceProxy, NegaraServiceProxy, ListResultDtoOfNegaraListDto, ProvinsiTableViewListDto, ListResultDtoOfProvinsiListDto, CreateProvinsiInput, EditProvinsiInput, NegaraListDto } from '@shared/service-proxies/service-proxies';
import swal from 'sweetalert';
import {DataTableModule,SharedModule,
    ToolbarModule,InputTextModule,
    PaginatorModule,PanelModule,
    SplitButtonModule,MenuModule,
    MenuItem,TooltipModule,DialogModule,SelectItem,MultiSelectModule} from 'primeng/primeng';
import { limitDB, GlobalDataService } from '@shared/globaldata.service';
import { MomentModule } from 'angular2-moment';

@Component({
    templateUrl: './provinsi.component.html',
    animations: [appModuleAnimation()]
})
export class ProvinsiComponent extends AppComponentBase implements OnInit {

    negaraCode: SelectItem[] = [];
    negaraFilter: SelectItem[] = [];
    selectedNegara: Number[];

    provinsi: ProvinsiTableViewListDto[] = [];
    curProvinsi: ProvinsiTableViewListDto;
    detailData: CreateProvinsiInput;
    updateData: EditProvinsiInput;

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

    dataLimit: SelectItem[];
    selectedLimit: Number;


    //provinsiField
    provinsiID: number = 0;
    name: string = '';
    adNegaraId: number = 0;
    userEdit: string;
    userCreate: string;
    editDate: string;
    createDate: string;


    constructor(
        injector: Injector,
        private _globalService: GlobalDataService,
        private _provinsiService: ProvinsiServiceProxy,
        private _negaraService: NegaraServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNegara(false);
        this.getProvinsi();

        this.tmcMenu = [
            {label: 'View', icon: 'fa-eye', command: (event) => console.log(event)},
            {label: 'Edit', icon: 'fa-pencil', command: (event) => console.log(event)},
            {label: 'Delete', icon: 'fa-trash', command: (event) => console.log(event)},
            {label: 'Freeze Row', icon: 'fa-link', command: (event) => console.log(event)}
        ];

        this.dataLimit = limitDB;
    }
    
    dpChange(): void {
        console.log(this.selectedLimit);
    }

    // DB TRANSACTION
    getNegara(isRefresh: boolean): void {

        if (this._globalService.GDnegaraList == null || isRefresh==true){
            // this.isLoading = true;
            console.log("w/ DB");
            this._negaraService.getNegaraAsync(this.filter,0) //get all without limit (0)
            .finally(() => {
                // this.isLoading=false;
            })
            .subscribe((result) =>{
                this.negaraFilter = [];
                this.negaraCode = []; 
                for(let dataX of result.items){
                    this.negaraCode.push({label:dataX.name, value:dataX.id});
                    this.negaraFilter.push({label:dataX.name, value:dataX.name});
                }
                this._globalService.GDnegaraListName = this.negaraFilter;
                this._globalService.GDnegaraList = this.negaraCode;
                this._globalService.GDnegara = result.items;
            })
        }else{
            console.log("no DB");
            this.negaraCode = this._globalService.GDnegaraList;
        }
    }

    getProvinsi(): void {
        this.isLoading = true;

        this._provinsiService.getProvinsiTableViewAsync(this.filter,0)
        .finally(() => {
            this.isLoading=false;
        })
        .subscribe((result) =>{
            this.provinsi = result.items;
        })
    }

    createProvinsi(): void {
        this.isSaving = true;
        this.detailData = new CreateProvinsiInput();
        this.detailData.name = this.name;
        this.detailData.adNegaraId = this.adNegaraId;
        this._provinsiService.createProvinsi(this.detailData)
            .finally(() => this.isSaving = false)
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.resetForm();
                this.getProvinsi();
                this.isOpenData=false;
            });
    }

    updateProvinsi(): void{
        this.isSaving = true;
        this.updateData = new EditProvinsiInput();
        this.updateData.name = this.name;
        this.updateData.adNegaraId = this.adNegaraId;
        this.updateData.id = this.provinsiID;
        this.updateData.lastModifierUserId = this.appSession.getUserID();
        this._provinsiService.editProvinsi(this.updateData)
            .finally(() => this.isSaving = false)
            .subscribe(() => {
                this.notify.info(this.l('Saved Successfully'));
                this.resetForm();
                this.getProvinsi();
                this.isOpenData=false;
            });
    }



    // DATA TABLE ACTIVITY
    search(): void {
        this.filter = this.bufferFilter;
        this.getProvinsi();
    }

    clearFilter(): void {
        this.filter = '';
        this.bufferFilter = '';
        this.getProvinsi();
    }

    refresh(): void {
        this.bufferFilter = this.filter;
        this.getProvinsi();
    }


    isDataSelected(): boolean{
        return (this.curProvinsi != null)
    }

    // CRUD FORM
    viewData(): void {
        console.log(this.curProvinsi);
        this.isViewOnly = true;
        this.dataTitle = this.curProvinsi.name;
        this.provinsiID = this.curProvinsi.id;
        this.name = this.curProvinsi.name;
        this.adNegaraId = this.curProvinsi.adNegaraId;
        this.isOpenData = true;
        this.createDate = this.curProvinsi.creationTime.format('HH:mm:ss DD MMM YYYY');
        this.userCreate = this.curProvinsi.userCreate;
        if(this.curProvinsi.lastModifierUserId != null){
            this.userEdit = this.curProvinsi.userEdit;
            this.editDate = this.curProvinsi.lastModificationTime.format('HH:mm:ss DD MMM YYYY');            
        }else{
            this.userEdit = "";this.editDate = "";
        }

    }

    editData(): void {
        this.formMode = 1;
        this.isViewOnly = false;
        this.dataTitle = this.curProvinsi.name;
        this.provinsiID = this.curProvinsi.id;
        this.name = this.curProvinsi.name;
        this.adNegaraId = this.curProvinsi.adNegaraId;
        this.isOpenData = true;
    }

    newData(): void {
        this.formMode = 0;
        this.dataTitle = "Create New Data";
        this.name = '';
        this.adNegaraId = 0;
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
               this._provinsiService.deleteProvinsi(this.curProvinsi.id).subscribe(() => {
                    this.notify.info(this.l('SuccessfullyDeleted'));
                    this.getProvinsi();
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
        this.adNegaraId = 0;
    }

    completeSelection(): void{
        if(this.formMode==0)this.createProvinsi();
        else this.updateProvinsi();
    }

    formClose(): void {
        this.isViewOnly = false;
        this.isOpenData = false;
    }
}