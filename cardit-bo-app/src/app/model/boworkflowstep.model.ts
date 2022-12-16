export class boworkflowstep {
    public workflowstepiddesc: string; public workflowstepid: number; public workflowmasterid: number; public stepno: number; public stepname: string; public tat: string; public task: string; public taskdesc: string; public condition: string; public yesstep: number; public yesstepdesc: string; public nostep: number; public nostepdesc: string; public approver: string; public action: string; public actiontype: string; public minapprovers: number; public workflowuserfieldtype: string; public workflowuserfieldtypedesc: string; public workflowuserfieldname: string; public parentid: number; public parentiddesc: string; public noedittransaction: boolean; public autoapproval: boolean; public autodenial: boolean; public waitduration: string; public remainderduration: string; public escalationuser: string; public cc: string; public customfieldid: number; public customfieldiddesc: string; public predecessor: string; public processid: number; public status: string;
    constructor() { }
}
export interface IboworkflowstepResponse {
    total: number;
    results: boworkflowstep[];
}

