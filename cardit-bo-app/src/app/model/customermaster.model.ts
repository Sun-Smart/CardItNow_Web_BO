export class customermaster {
    public customeriddesc: string; public customerid: number; public mode: string; public modedesc: string; public uid: string; public type: string; public typedesc: string; public firstname: string; public lastname: string; public email: string; public mobile: string; public dob: Date; public customerinterests: string; public defaultavatar: number; public defaultavatardesc: string; public customerphoto: string; public googleid: string; public facebookid: string; public lasttermsaccepted: number; public customfield: string; public attachment: string; public status: string; public deletionaccountrequestedon: Date; public autodeletedon: Date; public deleterevokedon: Date; public createdon: Date; public Deleted_customerdetail_IDs: string; public Deleted_customertermsacceptance_IDs: string; public Deleted_customerpaymode_IDs: string; public Deleted_customersecurityquestion_IDs: string; public Deleted_customersecurityquestionshistory_IDs: string;
    constructor() { }
}
export interface IcustomermasterResponse {
    total: number;
    results: customermaster[];
}

