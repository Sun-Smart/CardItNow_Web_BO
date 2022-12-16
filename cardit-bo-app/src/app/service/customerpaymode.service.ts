import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customerpaymode } from '../model/customerpaymode.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomerpaymodeResponse } from '../model/customerpaymode.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customerpaymodeService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customerpaymodes(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/customerpaymode', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerpaymodes_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_payid(payid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/payid/' + payid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customerpaymodes_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerpaymodes_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerpaymode/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customerpaymode(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customerpaymode/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerpaymode/getList_uid', this.sessionService.headeroptions()).toPromise();
  }


}

