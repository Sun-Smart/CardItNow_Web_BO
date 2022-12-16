export class avatarmaster {
    public avatariddesc: string; public avatarid: number; public orderid: number; public avatarname: string; public avatarurl: string; public status: string;
    constructor() { }
}
export interface IavatarmasterResponse {
    total: number;
    results: avatarmaster[];
}

