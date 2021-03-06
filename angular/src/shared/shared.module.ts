﻿import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { MaterialInput } from "shared/directives/material-input.directive";

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule
    ],
    declarations: [
        MaterialInput
    ],
    exports: [
        MaterialInput
    ]
})
export class SharedModules {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModules,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard
            ]
        }
    }
}
