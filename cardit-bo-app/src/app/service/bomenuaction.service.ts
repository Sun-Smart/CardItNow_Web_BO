import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bomenuaction } from '../model/bomenuaction.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbomenuactionResponse } from '../model/bomenuaction.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bomenuactionService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, public sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bomenuactions(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/bomenuaction', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bomenuactions_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_actionid(actionid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/actionid/' + actionid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bomenuactions_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bomenuactions_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenuaction/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bomenuaction(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bomenuaction/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_rowselecttype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction/getList_rowselecttype', this.sessionService.headeroptions()).toPromise();
  }

  getList_actiontype(): any {
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction/getList_actiontype', this.sessionService.headeroptions()).toPromise();
  }


}

