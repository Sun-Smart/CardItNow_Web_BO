import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customersecurityquestionshistory } from '../model/customersecurityquestionshistory.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomersecurityquestionshistoryResponse } from '../model/customersecurityquestionshistory.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customersecurityquestionshistoryService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customersecurityquestionshistories(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/customersecurityquestionshistory', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customersecurityquestionshistories_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_historyid(historyid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/historyid/' + historyid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customersecurityquestionshistories_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customersecurityquestionshistories_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customersecurityquestionshistory(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customersecurityquestionshistory/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_securityquestionid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customersecurityquestionshistory/getList_securityquestionid', this.sessionService.headeroptions()).toPromise();
  }


}

