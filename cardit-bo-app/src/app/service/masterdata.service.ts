import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { masterdata } from '../model/masterdata.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ImasterdataResponse } from '../model/masterdata.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class masterdataService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_masterdatas(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/masterdata', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_masterdatas_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_masterdataid(masterdataid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/masterdataid/' + masterdataid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_masterdatas_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_masterdatas_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdata/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_masterdata(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/masterdata/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_masterdatatypeid(): any {
    return this.http.get(AppConstants.carditnowURL + '/masterdata/getList_masterdatatypeid', this.sessionService.headeroptions()).toPromise();
  }


}

