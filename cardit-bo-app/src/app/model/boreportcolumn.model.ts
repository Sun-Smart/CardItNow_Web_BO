export class boreportcolumn {
    public reportcolumniddesc: string; public reportcolumnid: number; public reportid: number; public tablealias: string; public field: string; public header: string; public columnalias: string; public hide: boolean; public derived: boolean; public datatype: string; public datatypedesc: string; public fkfilter: boolean; public filtertype: string; public filtertypedesc: string; public width: number; public nofilter: boolean; public groupby: boolean; public sum: boolean; public count: boolean; public colhtml: string; public poptitle: string; public link: boolean; public linkurl: string; public service: boolean; public servicename: string; public sp: boolean; public spname: string; public alert: string; public caps: boolean; public bold: boolean; public italic: boolean; public strikethrough: boolean; public bgcolor: string; public forecolor: string; public conditionstyle: string; public performancestatusvalues: string; public status: string; public notsortable: boolean; public sequence: number; public sumcondition: string; public countcondition: string; public min: number; public max: number; public maxchars: number; public helptext: string;
    constructor() { }
}
export interface IboreportcolumnResponse {
    total: number;
    results: boreportcolumn[];
}

