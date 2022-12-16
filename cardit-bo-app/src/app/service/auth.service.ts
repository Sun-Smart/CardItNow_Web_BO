import { Injectable, Inject } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Location } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/Rx';
import { AppConstants } from '../shared/helper'
let APPLICATION_JSON: string = 'application/json';

export class JsonGetOptions extends RequestOptions {
  constructor() {
    super({
      headers: new Headers({ 'Accept': APPLICATION_JSON }),
      withCredentials: true
    });
  }
}

export class JsonPostOptions extends JsonGetOptions {
  constructor() {
    super();
    this.headers.append('Content-Type', APPLICATION_JSON);
  }
}

export function defaultSpTokenResolver(location: Location): string {
  //debugger;
  let m: RegExpMatchArray = location.path().match(/sptoken=([^&]+)/);
  return m && m.length === 2 ? m[1] : '';
}

export interface RegistrationFormModel {
  email?: string;
  surname?: string;
  givenName?: string;
  password?: string;
  [propName: string]: any;
}

export interface ForgotPasswordFormModel {
  email: string;
  //accountStore?: Object;
  //organizationNameKey?: string;
}

export interface ResendEmailVerificationRequest {
  login: string;
  // accountStore?: Object;
  //  organizationNameKey?: string;
}

export interface PasswordResetRequest {
  //  accountStore?: Object;
  //  organizationNameKey?: string;
  password: string;
  sptoken: string;
}

export interface LoginFormModel {
  login: string;
  password: string;
  //  accountStore?: Object;
  //  organizationNameKey?: string;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export class LoginService {
  options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
  public forgot: boolean;
  public login: boolean;
  public register: boolean;

  constructor() {
    this.forgot = false;
    this.login = true;
    this.register = false;
  }

  forgotPassword(): void {
    this.forgot = true;
    this.login = false;
  }
}

@Injectable()
export class Auth {
  //public user$: Observable<Account | boolean>;
  //public userSource: ReplaySubject<Account | boolean>;
  private oauthHeaders: Headers;
  readonly rootURL = AppConstants.ntireboURL;

  constructor(public http: HttpClient) {
    //this.userSource = new ReplaySubject<Account>(1);
    //this.user$ = this.userSource.asObservable();
    //this.getAccount().subscribe(user => this.userSource.next(user));
  }




  resendVerificationEmail(request: ResendEmailVerificationRequest): any {
    return this.http.post(AppConstants.ntireboURL + '/token/verify', JSON.stringify(request));

  }

  sendPasswordResetEmail(form: ForgotPasswordFormModel): any {

    return this.http.post(AppConstants.ntireboURL + '/token/forgot', form);

  }

  resetPassword(form: PasswordResetRequest): any {
    //debugger;
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', form.sptoken);
    let options = { headers: httpHeaders };
    return this.http.post(AppConstants.ntireboURL + '/token/change', form);

  }

  verifyEmailVerificationToken(sptoken: string): any {
    return this.http.get(AppConstants.ntireboURL + '/token/verify' + '?sptoken=' + sptoken);

  }

  verifyPasswordResetToken(sptoken: string): any {

    return this.http.get(AppConstants.ntireboURL + '/token/config/' + sptoken);

  }

  /**
   * Returns the JSON error from an HTTP response, or a generic error if the
   * response is not a JSON error
   * @param {any} error
   */
  private errorTranslator(error: any): Observable<any> {
    let errorObject: ErrorResponse;
    try {
      errorObject = error.json();
    } catch (e: any) {
      console.error(error);
    }
    if (!errorObject || !errorObject.message) {
      errorObject = { message: 'Server Error', status: 0 };
    }
    return Observable.throw(errorObject);
  }

  private errorThrower(error: any): Observable<ErrorResponse> {
    return Observable.throw(error);
  }


  private jsonParser(res: Response): any {
    if (res.text() === '') {
      return null;
    }
    try {
      return res.json();
    } catch (e: any) {
      throw new Error('Response was not JSON, check your server configuration');
    }
  }
}
