export class customertermsacceptance {
    public customertermiddesc: string; public customertermid: number; public termid: number; public termiddesc: string; public version: number; public customerid: number; public customeriddesc: string; public dateofacceptance: Date; public status: string;
    constructor() { }
}
export interface IcustomertermsacceptanceResponse {
    total: number;
    results: customertermsacceptance[];
}

