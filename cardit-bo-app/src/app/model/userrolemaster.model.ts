export class userrolemaster {
    public roleiddesc: string; public roleid: number; public roledescription: string; public status: string;
    constructor() { }
}
export interface IuserrolemasterResponse {
    total: number;
    results: userrolemaster[];
}

