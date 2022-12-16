import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { geoaccess } from '../model/geoaccess.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IgeoaccessResponse } from '../model/geoaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class geoaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_geoaccesses(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/geoaccess', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_geoaccesses_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_geoaccessid(geoaccessid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/geoaccessid/' + geoaccessid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_geoaccesses_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_geoaccesses_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geoaccess/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_geoaccess(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/geoaccess/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_geoid(): any {
    return this.http.get(AppConstants.carditnowURL + '/geoaccess/getList_geoid', this.sessionService.headeroptions()).toPromise();
  }

  getList_userid(): any {
    return this.http.get(AppConstants.carditnowURL + '/geoaccess/getList_userid', this.sessionService.headeroptions()).toPromise();
  }


}

