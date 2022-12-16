export class boreportdetail {
    public reportdetailiddesc: string; public reportdetailid: number; public reportid: number; public tablename: string; public formula: string; public separator: string; public separatordesc: string; public header: string; public footer: string; public wherecondition: string; public alias: string; public status: string;
    constructor() { }
}
export interface IboreportdetailResponse {
    total: number;
    results: boreportdetail[];
}

