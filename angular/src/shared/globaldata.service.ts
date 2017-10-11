import { Injectable } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import { NegaraListDto, ListResultDtoOfNegaraListDto} from '@shared/service-proxies/service-proxies';

interface ShareObj {
  [id: string]: any;
}

@Injectable()
export class GlobalDataService {
	shareObj: ShareObj = {};

	//address
	GDnegara: NegaraListDto[];
	GDnegaraList: SelectItem[];
	GDnegaraListName: SelectItem[];
}

export const limitDB: SelectItem[] = [
	{label:'No Limit', value:0},
	{label:'100', value:100},
	{label:'250', value:250},
	{label:'500', value:500},
	{label:'1000', value:1000},
	{label:'2000', value:2000},
	{label:'4000', value:4000}
];