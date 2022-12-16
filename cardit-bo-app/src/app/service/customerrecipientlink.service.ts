import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customerrecipientlink } from '../model/customerrecipientlink.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomerrecipientlinkResponse } from '../model/customerrecipientlink.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customerrecipientlinkService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customerrecipientlinks(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/customerrecipientlink', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerrecipientlinks_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_linkid(linkid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/linkid/' + linkid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customerrecipientlinks_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customerrecipientlinks_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customerrecipientlink(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customerrecipientlink/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/customerrecipientlink/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }


}

