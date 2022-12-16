import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { menumaster } from '../model/menumaster.model';
import { menuaccess } from '../model/menuaccess.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ImenumasterResponse } from '../model/menumaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class menumasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_menumasters(formData, Deleted_menuaccess_IDs, menuaccesses): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_menuaccess_IDs,
        menuaccesses: menuaccesses?.filter(c => c.menuaccessid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/menumaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_menuurl(menuurl: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/menumaster/menuurl/' + menuurl, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_usermenumaster_List(param: any = 0): Promise<any> {
    debugger;

    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/menumaster/usermenumaster/' + param, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_menumasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_menuid(menuid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/menuid/' + menuid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_menumasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_menumasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menumaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_menumaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/menumaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


}

