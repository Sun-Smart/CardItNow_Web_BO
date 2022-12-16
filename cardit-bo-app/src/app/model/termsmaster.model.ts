export class termsmaster {
    public termiddesc: string; public termid: number; public termdetails: string; public currentversion: boolean; public status: string;
    constructor() { }
}
export interface ItermsmasterResponse {
    total: number;
    results: termsmaster[];
}

