export class customerrecipientlink {
    public linkiddesc: string; public linkid: number; public customerid: number; public customeriddesc: string; public uid: string; public uiddesc: string; public recipientuid: string; public recipientuiddesc: string; public status: string;
    constructor() { }
}
export interface IcustomerrecipientlinkResponse {
    total: number;
    results: customerrecipientlink[];
}

