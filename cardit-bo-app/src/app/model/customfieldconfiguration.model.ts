export class customfieldconfiguration {
    constructor(public customfieldid: number, public company: number, public tablename: string, public fieldname: string, public fieldtype: string, public fieldtypeDesc: string, public fieldvalues: string, public labelname: string, public sequence: number, public status: string) { }
}
export interface IcustomfieldconfigurationResponse {
    total: number;
    results: customfieldconfiguration[];
}

