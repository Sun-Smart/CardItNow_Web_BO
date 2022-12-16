export class customerdetail {
    public customerdetailiddesc: string; public customerdetailid: number; public customerid: number; public customeriddesc: string; public type: string; public uid: string; public uiddesc: string; public address: string; public geoid: number; public geoiddesc: string; public cityid: number; public cityiddesc: string; public postalcode: string; public identificationdocumenttype: number; public idnumber: string; public idissuedate: Date; public idexpirydate: Date; public livestockphoto: string; public divmode: string; public divmodedesc: string; public divref: string; public divsubmissionon: Date; public divstatus: string; public divstatusdesc: string; public divremarks: string; public amlcheckstatus: string; public amlcheckstatusdesc: string; public amlremarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcustomerdetailResponse {
    total: number;
    results: customerdetail[];
}

