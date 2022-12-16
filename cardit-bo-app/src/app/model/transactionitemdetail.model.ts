export class transactionitemdetail {
    public transactionitemdetailiddesc: string; public transactionitemdetailid: number; public transactiondetailid: number; public transactiondetailiddesc: string; public transactionid: number; public transactioniddesc: string; public uid: string; public uiddesc: string; public recipientuid: string; public recipientuiddesc: string; public recipientid: number; public payid: number; public payiddesc: string; public av: string; public period: string; public basic: string; public dp: string; public netbasic: string; public sef: string; public sdp: string; public netsef: string; public total: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface ItransactionitemdetailResponse {
    total: number;
    results: transactionitemdetail[];
}

