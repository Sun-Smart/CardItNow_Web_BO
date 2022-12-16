import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boreportothertable } from '../model/boreportothertable.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboreportothertableResponse } from '../model/boreportothertable.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boreportothertableService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boreportothertables(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boreportothertable', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportothertables_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_othertableid(othertableid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/othertableid/' + othertableid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boreportothertables_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreportothertables_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreportothertable/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boreportothertable(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boreportothertable/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_jointype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable/getList_jointype', this.sessionService.headeroptions()).toPromise();
  }


}

