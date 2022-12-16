export class masterdatatype {
    public datatypeiddesc: string; public datatypeid: number; public masterdatatypename: string; public code: string; public status: string; public Deleted_masterdata_IDs: string;
    constructor() { }
}
export interface ImasterdatatypeResponse {
    total: number;
    results: masterdatatype[];
}

