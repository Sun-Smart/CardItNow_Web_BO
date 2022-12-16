export class initiatorrecipientprivate {
    public privateiddesc: string; public privateid: number; public customerid: number; public customeriddesc: string; public uid: string; public uiddesc: string; public type: string; public typedesc: string; public firstname: string; public lastname: string; public email: string; public mobile: string; public geoid: number; public geoiddesc: string; public cityid: number; public cityiddesc: string; public pincode: string; public bankaccountnumber: string; public bankname: string; public iban: string; public accountname: string; public status: string;
    constructor() { }
}
export interface IinitiatorrecipientprivateResponse {
    total: number;
    results: initiatorrecipientprivate[];
}

