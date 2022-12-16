import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { initiatorrecipientprivate } from '../model/initiatorrecipientprivate.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IinitiatorrecipientprivateResponse } from '../model/initiatorrecipientprivate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class initiatorrecipientprivateService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_initiatorrecipientprivates(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/initiatorrecipientprivate', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_initiatorrecipientprivates_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_privateid(privateid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/privateid/' + privateid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_initiatorrecipientprivates_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_initiatorrecipientprivates_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_initiatorrecipientprivate(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/initiatorrecipientprivate/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_type(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getList_type', this.sessionService.headeroptions()).toPromise();
  }

  getList_geoid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getList_geoid', this.sessionService.headeroptions()).toPromise();
  }

  getList_cityid(geoid): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientprivate/getList_cityid/' + geoid, this.sessionService.headeroptions()).toPromise();
  }


}

