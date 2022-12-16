import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customerdetail } from '../model/customerdetail.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomerdetailResponse } from '../model/customerdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customerdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customerdetails(formData, livestockphoto_files, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      filearray.push(livestockphoto_files);
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.carditnowURL + '/customerdetail', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerdetails_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_customerdetailid(customerdetailid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/customerdetailid/' + customerdetailid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customerdetails_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerdetails_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customerdetail(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customerdetail/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_geoid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_geoid', this.sessionService.headeroptions()).toPromise();
  }

  getList_cityid(geoid): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_cityid/' + geoid, this.sessionService.headeroptions()).toPromise();
  }

  getList_divmode(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_divmode', this.sessionService.headeroptions()).toPromise();
  }

  getList_divstatus(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_divstatus', this.sessionService.headeroptions()).toPromise();
  }

  getList_amlcheckstatus(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerdetail/getList_amlcheckstatus', this.sessionService.headeroptions()).toPromise();
  }


}

