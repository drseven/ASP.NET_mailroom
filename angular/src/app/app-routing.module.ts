import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

// root
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AttachmentComponent } from './attachment/attachment.component';
import { TenantsComponent } from './tenants/tenants.component';

//user-admin
import { UsersComponent } from './user-admin/users/users.component';
import { RolesComponent } from "app/user-admin/roles/roles.component";
import { LogsComponent } from './user-admin/logs/logs.component';

// mailroom
import { TrackersComponent } from './mailroom/trackers/trackers.component';


// hrd-internal

// offices

// addresses
import { NegaraComponent } from './addresses/negara/negara.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    //root
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'attachment', component: AttachmentComponent },

                    //user-admin
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'logs', component: LogsComponent },

                    //mailroom
                    { path: 'incomings', component: AboutComponent },
                    { path: 'outgoings', component: AboutComponent },
                    { path: 'trackers', component: TrackersComponent },

                    //addresses
                    { path: 'negara', component: NegaraComponent, data: { permission: 'Pages.Addresses.Negara' } },


                    { path: 'about', component: AboutComponent }                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }