export class boworkflowhistory {
    public wkhistoryid: number; public module: string; public workflowid: number; public workflowmasterid: number; public currentstepno: number; public pkvalue: number; public currentapprover: number; public currentapproverdesc: string; public currentapprovertype: string; public currentapprovertypedesc: string; public currentapproverusertype: number; public currentapproverusertypedesc: string; public currentapproved: number; public nextapprover: number; public nextapproverdesc: string; public nextapprovertype: string; public nextapprovertypedesc: string; public nextapproverusertype: number; public nextapproverusertypedesc: string; public allcomments: string; public comments: string; public customfield: string; public attachment: string; public status: string; public statusdesc: string;

    constructor() { }
}
export interface IboworkflowhistoryResponse {
    total: number;
    results: boworkflowhistory[];
}

