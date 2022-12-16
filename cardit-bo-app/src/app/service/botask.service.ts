import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { botask } from '../model/botask.model';
import { botaskresponse } from '../model/botaskresponse.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbotaskResponse } from '../model/botask.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class botaskService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, public sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_botasks(formData, attachmentfiles, Deleted_botaskresponse_IDs, botaskresponses): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_botaskresponse_IDs,
        botaskresponses: botaskresponses?.filter(c => c.responseid == null)
      };
      let filearray: any = [];
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.ntireboURL + '/botask', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_botasks_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_taskid(taskid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/taskid/' + taskid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_sourcereference(sourcereference: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/sourcereference/' + sourcereference, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_botasks_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_botasks_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/botask/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_botask(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/botask/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_tasktype(): any {
    return this.http.get(AppConstants.ntireboURL + '/botask/getList_tasktype', this.sessionService.headeroptions()).toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntireboURL + '/botask/getList_priority', this.sessionService.headeroptions()).toPromise();
  }

  getList_taskstatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/botask/getList_taskstatus', this.sessionService.headeroptions()).toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/botask/getList_performancestatus', this.sessionService.headeroptions()).toPromise();
  }


}

