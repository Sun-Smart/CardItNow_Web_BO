export class geographymaster {
    public geoiddesc: string; public geoid: number; public geoname: string; public geocode: string; public chargepercent: string; public vat: string; public useraccess: string; public status: string; public Deleted_citymaster_IDs: string; public Deleted_geoaccess_IDs: string;
    constructor() { }
}
export interface IgeographymasterResponse {
    total: number;
    results: geographymaster[];
}

