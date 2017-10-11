import { Component, Injector, Injectable } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TreeModule,TreeNode, PanelModule, ContextMenuModule, MenuItem, TabViewModule} from 'primeng/primeng';
import { Http} from '@angular/http';

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

	selectedFile: TreeNode;
    constructor(
        injector: Injector,
        private nodeService: NodeService
    ) {
        super(injector);
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

    

}