import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { NegaraServiceProxy, NegaraListDto, ListResultDtoOfNegaraListDto } from '@shared/service-proxies/service-proxies';
// import { CreateNegaraComponent } from "app/addresses/negara/create-negara/create-negara.component";
import { PagedListingComponentBase, PagedRequestDto } from "shared/paged-listing-component-base";


@Component({
    templateUrl: './negara.component.html',
    animations: [appModuleAnimation()]
})
export class NegaraComponent extends AppComponentBase implements OnInit {

    // @ViewChild('createNegaraModal') createNegaraModal: CreateNegaraComponent;

    negara: NegaraListDto[] = [];
    filter: string = '';
    
    constructor(
        injector: Injector,
        private _negaraService: NegaraServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getNegara();
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

    halo(): void {
        console.log("halo from key");
    }

    // Show Modals
    // createNegara(): void {
    //     console.log("click");
    //     // this.createNegaraModal.show();
    // }
}