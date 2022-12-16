export class citymaster {
    public cityiddesc: string; public cityid: number; public geoid: number; public geoiddesc: string; public cityname: string; public status: string;
    constructor() { }
}
export interface IcitymasterResponse {
    total: number;
    results: citymaster[];
}

