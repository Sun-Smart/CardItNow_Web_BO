export class bodashboard {
    public dashboardiddesc: string; public dashboardid: number; public dashboardname: string; public rows: number; public cols: number; public design: string; public remarks: string; public userid: number; public module: number; public helptext: string; public status: string; public Deleted_bodashboarddetail_IDs: string;
    constructor() { }
}
export interface IbodashboardResponse {
    total: number;
    results: bodashboard[];
}

