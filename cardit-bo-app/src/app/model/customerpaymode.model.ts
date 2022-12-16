export class customerpaymode {
    public customerid: number; public uid: string; public uiddesc: string; public payiddesc: string; public payid: number; public cardnumber: string; public cardname: string; public expirydate: Date; public bankname: string; public ibannumber: string; public status: string;
    constructor() { }
}
export interface IcustomerpaymodeResponse {
    total: number;
    results: customerpaymode[];
}

