import { Component, Injector, Injectable } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { TabViewModule } from 'primeng/primeng';

@Component({
    selector: 'tab-pdf-viewer',
    templateUrl: './pdfviewer.component.html',
})
export class PDFViewerComponent extends AppComponentBase {

    constructor(
        injector: Injector,
    ) {
        super(injector);
    }

    ngOnInit() {
    }

}