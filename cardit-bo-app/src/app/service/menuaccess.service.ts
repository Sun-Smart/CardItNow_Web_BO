import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { menuaccess } from '../model/menuaccess.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ImenuaccessResponse } from '../model/menuaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class menuaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_menuaccesses(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/menuaccess', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_menuaccesses_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_menuaccessid(menuaccessid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/menuaccessid/' + menuaccessid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_menuaccesses_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_menuaccesses_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/menuaccess/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_menuaccess(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/menuaccess/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_menuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/menuaccess/getList_menuid', this.sessionService.headeroptions()).toPromise();
  }

  getList_roleid(): any {
    return this.http.get(AppConstants.carditnowURL + '/menuaccess/getList_roleid', this.sessionService.headeroptions()).toPromise();
  }


}

