import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boreportcolumn } from '../model/boreportcolumn.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboreportcolumnResponse } from '../model/boreportcolumn.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boreportcolumnService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boreportcolumns(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boreportcolumn', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportcolumns_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_reportcolumnid(reportcolumnid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/reportcolumnid/' + reportcolumnid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boreportcolumns_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportcolumns_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportcolumn/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boreportcolumn(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boreportcolumn/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_datatype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn/getList_datatype', this.sessionService.headeroptions()).toPromise();
  }

  getList_filtertype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn/getList_filtertype', this.sessionService.headeroptions()).toPromise();
  }


}

