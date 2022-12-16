import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { transactiondetail } from '../model/transactiondetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ItransactiondetailResponse } from '../model/transactiondetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class transactiondetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_transactiondetails(formData, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.carditnowURL + '/transactiondetail', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactiondetails_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_transactiondetailid(transactiondetailid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/transactiondetailid/' + transactiondetailid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_transactiondetails_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactiondetails_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactiondetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_transactiondetail(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/transactiondetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_transactionid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactiondetail/getList_transactionid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactiondetail/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactiondetail/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }

  getList_payid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactiondetail/getList_payid', this.sessionService.headeroptions()).toPromise();
  }


}

