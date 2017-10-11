import { Component, Injector, Injectable, Input } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SelectItem, InputTextModule } from 'primeng/primeng';
import { WindowRef } from '@shared/WindowRef'


@Component({
    selector: 'tab-img-viewer',
    templateUrl: './imgviewer.component.html',
})
export class IMGViewerComponent extends AppComponentBase {
qwqwn
	//pdfViewer
	@Input() imgTitle: String;
	@Input() imgUrl: String;
	curZoom: number	;
    valZoom: number ;
    imgWidth: number = 400;


    constructor(
        injector: Injector,
        private winRef: WindowRef
    ) {
        super(injector);
    }

    ngOnInit() {
    	this.curZoom = 0.5;	

    }

    zoomChanged(event): void{
    	console.log(event);
    	console.log(this.curZoom);
    }

    zoomTo(dir): void{
    	if(dir=='in'){
    		this.curZoom = this.curZoom + 10;
    	}else{
    		this.curZoom = this.curZoom - 10;
    	}
    	console.log(this.curZoom);
    }

    printThis(data): void{
        console.log(data);
        this.winRef.nativeWindow.open(data).print();
    }
}