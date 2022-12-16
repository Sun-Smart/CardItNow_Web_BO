import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { recipientdiscount } from '../model/recipientdiscount.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IrecipientdiscountResponse } from '../model/recipientdiscount.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class recipientdiscountService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_recipientdiscounts(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/recipientdiscount', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_recipientdiscounts_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_discountid(discountid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/discountid/' + discountid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_recipientdiscounts_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_recipientdiscounts_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/recipientdiscount/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_recipientdiscount(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/recipientdiscount/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/recipientdiscount/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }

  getList_initiatoruid(): any {
    return this.http.get(AppConstants.carditnowURL + '/recipientdiscount/getList_initiatoruid', this.sessionService.headeroptions()).toPromise();
  }


}

