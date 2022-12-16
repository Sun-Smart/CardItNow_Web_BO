import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { citymaster } from '../model/citymaster.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcitymasterResponse } from '../model/citymaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class citymasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_citymasters(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/citymaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_citymasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_cityid(cityid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/cityid/' + cityid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_geoid(geoid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/geoid/' + geoid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_citymasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_citymasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/citymaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_citymaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/citymaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_geoid(): any {
    return this.http.get(AppConstants.carditnowURL + '/citymaster/getList_geoid', this.sessionService.headeroptions()).toPromise();
  }


}

