export class bomenuaction {
    public actioniddesc: string; public actionid: number; public menuid: number; public description: string; public rowselecttype: string; public rowselecttypedesc: string; public actionicon: string; public actiontype: string; public actiontypedesc: string; public servicename: string; public actionname: string; public actioncondition: string; public actionbutton: boolean; public actionbuttonlocation: string; public actionhelp: string; public actionrequestorfield: string; public actionassigneduserfield: string; public notificationtext: string; public actionrequestoremailfield: string; public actionassigneduseremailfield: string; public actionstatus: string; public status: string;
    constructor() { }
}
export interface IbomenuactionResponse {
    total: number;
    results: bomenuaction[];
}

