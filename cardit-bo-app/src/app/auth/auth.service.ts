import { Injectable } from '@angular/core';

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  public getToken(): string {
    //return localStorage.getItem('token');
    var value = localStorage.getItem("currentUser");
    /* 
     var json=((this.sharedService.JSON_parse(value)));
     var key;
     for (key in json) {
       if (json.hasOwnProperty(key)) {
           console.log(key + " = " + json[key]);
       }
   }  
 */
    if (value != null && value != undefined) value = value.replace(/"/g, '');
    ////debugger;
    return value;
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    //return tokenNotExpired(null, token);
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}