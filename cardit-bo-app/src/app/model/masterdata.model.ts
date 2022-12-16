export class masterdata {
    public masterdatatypeid: number; public masterdatatypeiddesc: string; public masterdataiddesc: string; public masterdataid: number; public masterdatadescription: string; public status: string;
    constructor() { }
}
export interface ImasterdataResponse {
    total: number;
    results: masterdata[];
}

