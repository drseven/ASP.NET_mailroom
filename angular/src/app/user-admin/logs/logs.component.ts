import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: './logs.component.html',
    animations: [appModuleAnimation()]
})
export class LogsComponent extends AppComponentBase {

    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}