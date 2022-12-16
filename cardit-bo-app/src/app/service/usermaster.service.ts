import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { usermaster } from '../model/usermaster.model';
import { userrolemaster } from '../model/userrolemaster.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IusermasterResponse } from '../model/usermaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class usermasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_usermasters(formData, Deleted_userrolemaster_IDs, userrolemasters): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_userrolemaster_IDs,
        userrolemasters: userrolemasters?.filter(c => c.roleid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/usermaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_usermasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_userid(userid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/userid/' + userid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_usermasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_usermasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/usermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_usermaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/usermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_roleid(): any {
    return this.http.get(AppConstants.carditnowURL + '/usermaster/getList_roleid', this.sessionService.headeroptions()).toPromise();
  }

  getList_basegeoid(): any {
    return this.http.get(AppConstants.carditnowURL + '/usermaster/getList_basegeoid', this.sessionService.headeroptions()).toPromise();
  }


}

