export class transactiondetail {
    public transactiondetailiddesc: string; public transactiondetailid: number; public transactionid: number; public transactioniddesc: string; public uid: string; public uiddesc: string; public recipientuid: string; public recipientuiddesc: string; public recipientid: number; public payid: number; public payiddesc: string; public transactiondate: Date; public transactionamount: string; public remarks: string; public acquirername: string; public transactionconfirmnumber: string; public processedon: Date; public processedamount: string; public acquirercharges: string; public amountrecipient: string; public carditcharges: string; public recipientprocessdate: Date; public recipientprocesscode: string; public carditprocessdate: Date; public carditprocesscode: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ItransactiondetailResponse {
    total: number;
    results: transactiondetail[];
}

