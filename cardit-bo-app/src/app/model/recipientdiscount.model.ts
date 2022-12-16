export class recipientdiscount {
    public discountiddesc: string; public discountid: number; public recipientuid: string; public recipientuiddesc: string; public initiatoruid: string; public initiatoruiddesc: string; public contractnumber: string; public discountpercentage: string; public status: string;
    constructor() { }
}
export interface IrecipientdiscountResponse {
    total: number;
    results: recipientdiscount[];
}

