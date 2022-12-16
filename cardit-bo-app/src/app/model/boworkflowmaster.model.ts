export class boworkflowmaster {
    public workflowmasteriddesc: string; public workflowmasterid: number; public menuid: number; public pause: boolean; public description: string; public menucode: string; public menucodedesc: string; public tablecode: string; public tablecodedesc: string; public workflowhtml: string; public status: string; public Deleted_boworkflow_IDs: string; public Deleted_boworkflowstep_IDs: string;
    constructor() { }
}
export interface IboworkflowmasterResponse {
    total: number;
    results: boworkflowmaster[];
}

