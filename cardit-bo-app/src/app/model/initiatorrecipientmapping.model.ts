export class initiatorrecipientmapping {
    public mappingiddesc: string; public mappingid: number; public customerid: number; public customeriddesc: string; public uid: string; public uiddesc: string; public recipientuid: string; public recipientuiddesc: string; public status: string;
    constructor() { }
}
export interface IinitiatorrecipientmappingResponse {
    total: number;
    results: initiatorrecipientmapping[];
}

