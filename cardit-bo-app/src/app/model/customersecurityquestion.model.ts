export class customersecurityquestion {
    public customerid: number; public customeriddesc: string; public securityquestioniddesc: string; public securityquestionid: number; public questionid: number; public questioniddesc: string; public answer: string; public status: string; public deletedon: Date;
    constructor() { }
}
export interface IcustomersecurityquestionResponse {
    total: number;
    results: customersecurityquestion[];
}

