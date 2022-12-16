import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
/**
 * user service class
 */
export class UserDataService {

    users: User[] = [];

    constructor() {
        let user = {
            userid: 1, username: "admin", password: "password", usercode: '', language: '', companyid: 1, emailId: "admin@admin.com", birthDate: new Date('10/28/1992')
        };
        this.users.push(user);
    }

    /**
     * get user by user name and password
     * @param username 
     * @param password 
     */
    getUserByUserNameAndPassword(username: string, password: string): User {
        let user: User = null;
        this.users.forEach(element => {
            if (element.username === username && element.password === password) {
                user = element;
            }
        });
        return user;
    }

    /**
     * add new user
     * @param username 
     * @param password 
     * @param emailId 
     * @param birthDate 
     */
    addUser(username: string, password: string, emailId: string, birthDate: Date): boolean {
        let userid = this.users.length + 1;
        let user = new User();
        user.userid = userid;
        user.username = username;
        user.password = password;
        user.emailId = emailId;
        user.birthDate = birthDate;
        this.users.push(user);
        return true;
    }
}