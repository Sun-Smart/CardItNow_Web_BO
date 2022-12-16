import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boconfigvalue } from '../model/boconfigvalue.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboconfigvalueResponse } from '../model/boconfigvalue.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class boconfigvalueService {
    options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boconfigvalues(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let res = await this.http.post(AppConstants.ntireboURL + '/boconfigvalue', body, this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boconfigvalues_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_configid(configid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/configid/' + configid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_param(param: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/param/' + param, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boconfigvalues_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boconfigvalues_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boconfigvalue/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boconfigvalue(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boconfigvalue/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


}

