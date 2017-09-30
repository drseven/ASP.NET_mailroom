import { Component, Injector, Injectable } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TreeModule,TreeNode, PanelModule, ContextMenuModule, MenuItem, TabViewModule, SelectItem, InputTextModule} from 'primeng/primeng';
import { Http} from '@angular/http';
import { WindowRef } from '@shared/WindowRef'

@Injectable()
export class NodeService {
    
    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('/assets/data.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data);
    }
}


@Component({
    templateUrl: './attachment.component.html',
    animations: [appModuleAnimation()],
    providers: [NodeService]
})
export class AttachmentComponent extends AppComponentBase {

	files: TreeNode[];
	private items: MenuItem[];
	index: number = 0;

	// tabs: { name: string, content: string, fname: string }[];
	tabs: {header: string, closable : boolean, closed : boolean, selected: boolean, data: string}[];

	//pdfViewer
	pdfZoom: SelectItem[];
	curZoom: number	;
	pdfPage: number = 1;
    pdfBufPage: number = 1;
	pdfZoomIndex: number;
	pdfTotalPages: number = 0;

	selectedFile: TreeNode;
    constructor(
        injector: Injector,
        private nodeService: NodeService,
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
        this.nodeService.getFiles().then(files => this.files = files);

        this.tabs = [
			{header: 'Welcome to file search', closable : false, closed : false, selected: true, data: "welcome"}
		];
        
        this.items = [
            {
                label: 'File',
                items: [
                    {
                    	label: 'Open',
                    	command: (event) => {
                    		if(this.selectedFile.children==null){
						        this.openFile(this.selectedFile);
					    	}
		                }
                	},
                    {label: 'Download'},
                    {label: 'Share...'}
                ]
            },
            {
                label: 'Properties',
                command: (event) => {
                	console.log(this.selectedFile);
                	console.log(event.item);
                }
            }
        ];

        this.curZoom = 0.5;	
    }

    nodeSelect(event) {
    	if(event.node.children==null){
	        console.log(event.node);
    	}
    }	

    openFile(file2Open): void{
    	// this.tabs[this.index].selected = false;
    	this.tabs.push({header:file2Open.label, closable:true, closed: false, selected: false, data: '/assets/attachment/'+file2Open.data});
    	this.index = this.tabs.length-1; //goto last tabs (newest)
    	console.log(this.tabs);
    	console.log(this.index);
    }

    handleChange(event): void{
    	console.log(event);
    	console.log(this.index);
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