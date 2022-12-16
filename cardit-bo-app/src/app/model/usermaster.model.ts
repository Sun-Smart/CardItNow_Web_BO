export class usermaster {
    public useriddesc: string; public userid: number; public username: string; public roleid: number; public roleiddesc: string; public email: string; public emailpassword: string; public mobile: number; public basegeoid: number; public basegeoiddesc: string; public status: string; public Deleted_userrolemaster_IDs: string;
    constructor() { }
}
export interface IusermasterResponse {
    total: number;
    results: usermaster[];
}

