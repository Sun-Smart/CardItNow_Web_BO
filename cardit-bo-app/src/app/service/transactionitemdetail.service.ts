import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { transactionitemdetail } from '../model/transactionitemdetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ItransactionitemdetailResponse } from '../model/transactionitemdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class transactionitemdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_transactionitemdetails(formData, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.carditnowURL + '/transactionitemdetail', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactionitemdetails_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_transactionitemdetailid(transactionitemdetailid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/transactionitemdetailid/' + transactionitemdetailid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_transactionitemdetails_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactionitemdetails_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_transactionitemdetail(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/transactionitemdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_transactiondetailid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getList_transactiondetailid', this.sessionService.headeroptions()).toPromise();
  }

  getList_transactionid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getList_transactionid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }

  getList_payid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionitemdetail/getList_payid', this.sessionService.headeroptions()).toPromise();
  }


}

