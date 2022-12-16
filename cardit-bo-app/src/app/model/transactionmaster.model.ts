export class transactionmaster {
    public transactioniddesc: string; public transactionid: number; public uid: string; public uiddesc: string; public recipientuid: string; public recipientuiddesc: string; public recipientid: number; public transactiontype: string; public transactiontypedesc: string; public recipientname: string; public documentnumber: string; public additionaldocumentnumber: string; public startdate: Date; public expirydate: Date; public address: string; public billdate: Date; public contractamount: string; public discount: string; public carditconvfee: string; public payamount: string; public payid: number; public payiddesc: string; public paytype: string; public paytypedesc: string; public customfield: string; public attachment: string; public status: string; public Deleted_transactiondetail_IDs: string;
    constructor() { }
}
export interface ItransactionmasterResponse {
    total: number;
    results: transactionmaster[];
}

