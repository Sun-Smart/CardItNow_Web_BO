import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boworkflow } from '../model/boworkflow.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboworkflowResponse } from '../model/boworkflow.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boworkflows(formData, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.ntireboURL + '/boworkflow', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflows_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_workflowid(workflowid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/workflowid/' + workflowid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_pkvalue(pkvalue: number, modulename: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/pkvalue/' + pkvalue + '/' + modulename, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boworkflows_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflows_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflow/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boworkflow(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boworkflow/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_currentapproved(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflow/getList_currentapproved', this.sessionService.headeroptions()).toPromise();
  }

  getList_standardrating(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflow/getList_standardrating', this.sessionService.headeroptions()).toPromise();
  }

  getList_performancerating(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflow/getList_performancerating', this.sessionService.headeroptions()).toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflow/getList_performancestatus', this.sessionService.headeroptions()).toPromise();
  }

  getList_workflowstatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflow/getList_workflowstatus', this.sessionService.headeroptions()).toPromise();
  }


}

