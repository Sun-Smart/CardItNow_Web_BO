export class bomenumaster {
    public menuiddesc: string; public menuid: number; public menucode: string; public menudescription: string; public menuurl: string; public actionkey: string; public iconname: string; public helpurl: string; public helptext: string; public parentid: number; public parentiddesc: string; public orderno: number; public action: string; public showcheckbox: boolean; public showstatus: string; public checkboxcolumn: string; public nonew: boolean; public noedit: boolean; public nodelete: boolean; public wherecondition: string; public status: string; public Deleted_bomenuaction_IDs: string;
    constructor() { }
}
export interface IbomenumasterResponse {
    total: number;
    results: bomenumaster[];
}

