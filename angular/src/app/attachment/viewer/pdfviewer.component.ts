import { Component, Injector, Injectable, Input } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SelectItem, InputTextModule } from 'primeng/primeng';
import { WindowRef } from '@shared/WindowRef'


@Component({
    selector: 'tab-pdf-viewer',
    templateUrl: './pdfviewer.component.html',
})
export class PDFViewerComponent extends AppComponentBase {

	//pdfViewer
	@Input() pdfTitle: String;
	@Input() pdfUrl: String;
	pdfZoom: SelectItem[];
	curZoom: number	;
	pdfPage: number = 1;
    pdfBufPage: number = 1;
	pdfZoomIndex: number;
	pdfTotalPages: number = 0;

    constructor(
        injector: Injector,
        private winRef: WindowRef
    ) {
        super(injector);
        this.pdfZoom = [];
        this.pdfZoom.push({label:'25%', value:0.25});
        this.pdfZoom.push({label:'50%', value:0.5});
        this.pdfZoom.push({label:'100%', value:1});
        this.pdfZoom.push({label:'200%', value:2});
        this.pdfZoom.push({label:'400%', value:4});
    }

    ngOnInit() {
    	this.curZoom = 0.5;	
    }

    // PDF Function
    zoomChanged(event): void{
    	console.log(event);
    	console.log(this.curZoom);
    }

    zoomTo(dir): void{
    	if(dir=='in'){
    		this.curZoom = this.curZoom * 2;
    	}else{
    		this.curZoom = this.curZoom / 2;
    	}
    	console.log(this.curZoom);
    }

    pageTo(dir): void{
    	if(dir=='next'){
    		this.pdfPage++;

    	}else{
    		this.pdfPage--;
    	}
        this.pdfBufPage =  this.pdfPage;
    }

    pdfLoadCompleted(event): void{
    	this.pdfTotalPages = event.pdfInfo.numPages;
    }

    printThis(data): void{
        console.log(data);
        this.winRef.nativeWindow.open(data).print();
    }

    gotoPageFromBuf(): void{
        // console.log(this.pdfBufPage);
        if(this.pdfBufPage<1)this.pdfBufPage=1;
        else if(this.pdfBufPage>this.pdfTotalPages)this.pdfBufPage=this.pdfTotalPages;

        this.pdfPage = this.pdfBufPage;
    }
}