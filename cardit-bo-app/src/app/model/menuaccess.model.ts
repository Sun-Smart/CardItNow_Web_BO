export class menuaccess {
    public menuaccessiddesc: string; public menuaccessid: number; public menuid: number; public menuiddesc: string; public roleid: number; public roleiddesc: string; public status: string;
    constructor() { }
}
export interface ImenuaccessResponse {
    total: number;
    results: menuaccess[];
}

