export class botask {
    public taskiddesc: string; public taskid: number; public sourcefield: string; public sourcereference: number; public subject: string; public description: string; public tasktype: string; public tasktypedesc: string; public assignto: number; public assigneddate: Date; public startdate: Date; public targetdate: Date; public priority: string; public prioritydesc: string; public actualstartdate: Date; public actualcloseddate: Date; public taskstatus: string; public taskstatusdesc: string; public estimatedeffort: string; public actualeffort: string; public cost: number; public additionalcost: number; public completionpercentage: number; public alarm: string; public performancestatus: string; public performancestatusdesc: string; public customfield: string; public attachment: string; public status: string; public Deleted_botaskresponse_IDs: string;
    constructor() { }
}
export interface IbotaskResponse {
    total: number;
    results: botask[];
}

