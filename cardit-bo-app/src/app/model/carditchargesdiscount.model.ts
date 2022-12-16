export class carditchargesdiscount {
    public discountiddesc: string; public discountid: number; public recipientuid: string; public recipientuiddesc: string; public chargepercent: string; public validtill: Date; public status: string;
    constructor() { }
}
export interface IcarditchargesdiscountResponse {
    total: number;
    results: carditchargesdiscount[];
}

