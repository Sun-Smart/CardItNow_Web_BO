export class boreportothertable {
    public othertableiddesc: string; public othertableid: number; public reportid: number; public tablename: string; public tablealias: string; public jointype: string; public jointypedesc: string; public wherecondition: string; public sequence: number; public status: string;
    constructor() { }
}
export interface IboreportothertableResponse {
    total: number;
    results: boreportothertable[];
}

