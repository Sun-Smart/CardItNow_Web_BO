import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { initiatorrecipientmapping } from '../model/initiatorrecipientmapping.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IinitiatorrecipientmappingResponse } from '../model/initiatorrecipientmapping.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class initiatorrecipientmappingService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_initiatorrecipientmappings(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/initiatorrecipientmapping', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_initiatorrecipientmappings_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_mappingid(mappingid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/mappingid/' + mappingid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_initiatorrecipientmappings_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_initiatorrecipientmappings_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_initiatorrecipientmapping(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/initiatorrecipientmapping/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/getList_customerid', this.sessionService.headeroptions()).toPromise();
  }

  getList_uid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/getList_uid', this.sessionService.headeroptions()).toPromise();
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/initiatorrecipientmapping/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }


}

