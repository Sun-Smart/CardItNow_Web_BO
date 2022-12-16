export class menumaster {
    public menuiddesc: string; public menuid: number; public menuname: string; public menulocation: string; public userroleaccess: string; public status: string; public Deleted_menuaccess_IDs: string;
    constructor() { }
}
export interface ImenumasterResponse {
    total: number;
    results: menumaster[];
}

