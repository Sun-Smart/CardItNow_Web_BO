import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bodashboard } from '../model/bodashboard.model';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbodashboardResponse } from '../model/bodashboard.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboardService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bodashboards(formData, Deleted_bodashboarddetail_IDs, bodashboarddetails): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_bodashboarddetail_IDs,
        bodashboarddetails: bodashboarddetails?.filter(c => c.dashboarddetailid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/bodashboard', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bodashboards_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_dashboardid(dashboardid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/dashboardid/' + dashboardid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bodashboards_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bodashboards_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bodashboard/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bodashboard(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bodashboard/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbodashboardResponse> {
    return this.http.get<IbodashboardResponse>(AppConstants.ntireboURL + '/bodashboard')
      .pipe(
        tap((response: IbodashboardResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bodashboard => new bodashboard(bodashboard.dashboardid, bodashboard.dashboardiddesc, bodashboard.dashboardname, bodashboard.rows, bodashboard.cols, bodashboard.design, bodashboard.remarks, bodashboard.userid, bodashboard.module, bodashboard.helptext, bodashboard.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bodashboard => bodashboard.dashboardname.includes(filter.name))

          return response;
        })
      );
  }


  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bodashboard/getList_dashboardid', this.sessionService.headeroptions()).toPromise();
  }


}

