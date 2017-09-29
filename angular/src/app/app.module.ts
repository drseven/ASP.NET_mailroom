import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModules } from '@shared/shared.module';

// root
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { AttachmentComponent } from '@app/attachment/attachment.component';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantComponent } from './tenants/create-tenant/create-tenant.component';
import { EditTenantComponent } from './tenants/edit-tenant/edit-tenant.component';

// addresses
import { NegaraComponent } from '@app/addresses/negara/negara.component';
import { CreateNegaraComponent } from '@app/addresses/negara/create-negara/create-negara.component';


// mailroom
import { TrackersComponent } from '@app/mailroom/trackers/trackers.component';

// user-admin
import { UsersComponent } from '@app/user-admin/users/users.component';
import { CreateUserComponent } from '@app/user-admin/users/create-user/create-user.component';
import { EditUserComponent } from './user-admin/users/edit-user/edit-user.component';
import { RolesComponent } from '@app/user-admin/roles/roles.component';
import { CreateRoleComponent } from '@app/user-admin/roles/create-role/create-role.component';
import { EditRoleComponent } from './user-admin/roles/edit-role/edit-role.component';
import { LogsComponent } from '@app/user-admin/logs/logs.component';

// hrd-internal

// offices

// layout
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MaterialInput } from '@shared/directives/material-input.directive';

//primeNG
import {
    DataTableModule,
    SharedModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    PaginatorModule,
    TabViewModule,
    FieldsetModule,
    PanelModule,
    ConfirmDialogModule,
    ConfirmationService
} from 'primeng/primeng';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        TrackersComponent,
        AttachmentComponent,
        LogsComponent,
        TenantsComponent,
		CreateTenantComponent,
		EditTenantComponent,
        UsersComponent,
		CreateUserComponent,
		EditUserComponent,
      	RolesComponent,        
		CreateRoleComponent,
		EditRoleComponent,

        //addreses
        NegaraComponent,
        CreateNegaraComponent,

        //layout
        TopBarComponent,
        TopBarLanguageSwitchComponent,
        SideBarUserAreaComponent,
        SideBarNavComponent,
        SideBarFooterComponent,
        RightSideBarComponent    
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        ModalModule.forRoot(),
        AbpModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModules,
        NgxPaginationModule,
        Ng2SmartTableModule,
        DataTableModule,
        SharedModule,
        ToolbarModule,
        ButtonModule,
        SplitButtonModule,
        InputTextModule,
        PaginatorModule,
        TabViewModule,
        FieldsetModule,
        PanelModule,
        ConfirmDialogModule
    ],
    providers: [
        ConfirmationService
    ]
})
export class AppModule { }
