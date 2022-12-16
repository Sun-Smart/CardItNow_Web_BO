export class customersecurityquestionshistory {
    public customerid: number; public customeriddesc: string; public historyiddesc: string; public historyid: number; public securityquestionid: number; public securityquestioniddesc: string; public questionid: number; public oldanswer: string; public newanswer: string; public status: string;
    constructor() { }
}
export interface IcustomersecurityquestionshistoryResponse {
    total: number;
    results: customersecurityquestionshistory[];
}

