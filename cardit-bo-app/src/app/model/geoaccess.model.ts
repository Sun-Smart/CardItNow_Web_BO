export class geoaccess {
    public geoaccessiddesc: string; public geoaccessid: number; public geoid: number; public geoiddesc: string; public userid: number; public useriddesc: string; public status: string;
    constructor() { }
}
export interface IgeoaccessResponse {
    total: number;
    results: geoaccess[];
}

