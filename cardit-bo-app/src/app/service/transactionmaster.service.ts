import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { transactionmaster } from '../model/transactionmaster.model';
import { transactiondetail } from '../model/transactiondetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ItransactionmasterResponse } from '../model/transactionmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class transactionmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_transactionmasters(formData, attachmentfiles, Deleted_transactiondetail_IDs, transactiondetails): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_transactiondetail_IDs,
        transactiondetails: transactiondetails?.filter(c => c.transactiondetailid == null)
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.carditnowURL + '/transactionmaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactionmasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_transactionid(transactionid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/transactionid/' + transactionid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_transactionmasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_transactionmasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/transactionmaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_transactionmaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/transactionmaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionmaster/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionmaster/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }

  getList_transactiontype(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionmaster/getList_transactiontype', this.sessionService.headeroptions()).toPromise();
  }

  getList_payid(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionmaster/getList_payid', this.sessionService.headeroptions()).toPromise();
  }

  getList_paytype(): any {
    return this.http.get(AppConstants.carditnowURL + '/transactionmaster/getList_paytype', this.sessionService.headeroptions()).toPromise();
  }


}

