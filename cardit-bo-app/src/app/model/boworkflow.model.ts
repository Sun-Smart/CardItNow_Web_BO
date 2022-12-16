export class boworkflow {
    public workflowiddesc: string; public workflowid: number; public workflowmasterid: number; public currentstepno: number; public modulename: string; public pkvalue: number; public currentapproved: number; public currentapproveddesc: string; public currentapprovers: string; public nextapprovers: string; public assigneddatetime: Date; public closeddatetime: Date; public standardrating: number; public standardratingdesc: string; public performancerating: number; public performanceratingdesc: string; public performancestatus: string; public performancestatusdesc: string; public exception: string; public approvedusers: string; public stepapprovedusers: number; public approvedcondition: string; public tathours: string; public totalactualtime: string; public processid: number; public workflowdetails: string; public comments: string; public history: string; public lastapprover: string; public cc: string; public customfield: string; public attachment: string; public workflowstatus: string; public workflowstatusdesc: string; public status: string;
    constructor() { }
}
export interface IboworkflowResponse {
    total: number;
    results: boworkflow[];
}

