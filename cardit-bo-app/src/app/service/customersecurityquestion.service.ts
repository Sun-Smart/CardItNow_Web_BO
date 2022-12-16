import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customersecurityquestion } from '../model/customersecurityquestion.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomersecurityquestionResponse } from '../model/customersecurityquestion.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customersecurityquestionService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customersecurityquestions(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/customersecurityquestion', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customersecurityquestions_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_securityquestionid(securityquestionid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/securityquestionid/' + securityquestionid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customersecurityquestions_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customersecurityquestions_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customersecurityquestion(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customersecurityquestion/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_questionid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customersecurityquestion/getList_questionid', this.sessionService.headeroptions()).toPromise();
  }


}

