export class boconfigvalue {
    public configiddesc: string; public configid: number; public param: string; public configkey: string; public configtext: string; public orderno: number; public htmlcode: string; public param1: string; public param2: string; public helptext: string; public flag: string; public status: string;
    constructor() { }
}
export interface IboconfigvalueResponse {
    total: number;
    results: boconfigvalue[];
}

