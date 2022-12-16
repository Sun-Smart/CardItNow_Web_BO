import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bodashboarddetail } from '../model/bodashboarddetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbodashboarddetailResponse } from '../model/bodashboarddetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboarddetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bodashboarddetails(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/bodashboarddetail', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bodashboarddetails_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_dashboarddetailid(dashboarddetailid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/dashboarddetailid/' + dashboarddetailid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bodashboarddetails_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bodashboarddetails_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bodashboarddetail(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bodashboarddetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_dashboardid', this.sessionService.headeroptions()).toPromise();
  }

  getList_charttype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_charttype', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter1type(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter1type', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter1datetype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter1datetype', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter2type(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter2type', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter2datetype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter2datetype', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter3type(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter3type', this.sessionService.headeroptions()).toPromise();
  }

  getList_parameter3datetype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_parameter3datetype', this.sessionService.headeroptions()).toPromise();
  }

  getList_menuid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail/getList_menuid', this.sessionService.headeroptions()).toPromise();
  }


}

