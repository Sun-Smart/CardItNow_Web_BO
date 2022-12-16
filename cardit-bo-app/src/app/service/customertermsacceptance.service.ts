import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customertermsacceptance } from '../model/customertermsacceptance.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomertermsacceptanceResponse } from '../model/customertermsacceptance.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customertermsacceptanceService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customertermsacceptances(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/customertermsacceptance', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customertermsacceptances_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_customertermid(customertermid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/customertermid/' + customertermid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customertermsacceptances_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customertermsacceptances_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customertermsacceptance(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customertermsacceptance/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_termid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/getList_termid', this.sessionService.headeroptions()).toPromise();
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customertermsacceptance/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }


}

