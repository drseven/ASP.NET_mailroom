import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import swal from 'sweetalert';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
    templateUrl: './topbar.component.html',
    selector: 'top-bar',
    encapsulation: ViewEncapsulation.None
})
export class TopBarComponent extends AppComponentBase implements OnInit {

	shownLoginName: string = "";
    showUserFullName: string = "";

    constructor(
        injector: Injector,
        private _authService: AppAuthService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.showUserFullName = this.appSession.getUserFullName(); 
        // if (this.shownLoginName == null) {
        //     swal({
        //         title: "Security Timeout!",
        //         text: "Your sesion has been idle for too long, please login to continue.",
        //         type: "warning",
        //         confirmButtonText: "To Login",
        //         closeOnConfirm: true
        //     },
        //     confirmed => {
        //         if(confirmed) {
        //             this._authService.logout();
        //         }
        //     });
        // }
    }

    initGlobalData() {
        // this.
    }
}