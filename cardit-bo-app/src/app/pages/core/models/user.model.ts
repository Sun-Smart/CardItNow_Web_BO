export class User {
    constructor() {
        this.userid = null;
        this.username = null;
        this.language = null;
        this.usercode = null;
        this.password = null;
        this.emailId = null;
        this.birthDate = null;
    }

    userid: number;
    username: string;
    language: string;
    usercode: string;
    password: string;
    emailId: string;
    birthDate: Date;
}