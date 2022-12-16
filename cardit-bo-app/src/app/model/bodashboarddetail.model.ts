export class bodashboarddetail {
    public dashboarddetailiddesc: string; public dashboarddetailid: number; public dashboardid: number; public dashboardiddesc: string; public dashboardname: string; public title: string; public row: number; public col: number; public charttype: string; public charttypedesc: string; public tablename: string; public recordname: string; public parameter: string; public name: string; public value: string; public parameter1variable: string; public parameter1type: number; public parameter1typedesc: string; public parameter1datetype: string; public parameter1datetypedesc: string; public parameter2variable: string; public parameter2type: number; public parameter2typedesc: string; public parameter2datetype: string; public parameter2datetypedesc: string; public parameter3variable: string; public parameter3type: number; public parameter3typedesc: string; public parameter3datetype: string; public parameter3datetypedesc: string; public backgroundcolor: string; public hoverbackgroundcolor: string; public bordercolor: string; public menuid: number; public menuiddesc: string; public reportid: string; public helptext: string; public status: string;
    constructor() { }
}
export interface IbodashboarddetailResponse {
    total: number;
    results: bodashboarddetail[];
}

