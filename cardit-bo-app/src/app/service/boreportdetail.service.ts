import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boreportdetail } from '../model/boreportdetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboreportdetailResponse } from '../model/boreportdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boreportdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boreportdetails(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boreportdetail', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportdetails_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_reportdetailid(reportdetailid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/reportdetailid/' + reportdetailid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boreportdetails_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportdetails_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boreportdetail(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boreportdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_separator(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail/getList_separator', this.sessionService.headeroptions()).toPromise();
  }


}

