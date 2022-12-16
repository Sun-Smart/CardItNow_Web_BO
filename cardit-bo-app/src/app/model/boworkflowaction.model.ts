export class boworkflowaction {
    public wfactioniddesc: string; public wfactionid: number; public workflowid: number; public approverid: number; public action: string; public actiondatetime: Date; public status: string;
    constructor() { }
}
export interface IboworkflowactionResponse {
    total: number;
    results: boworkflowaction[];
}

