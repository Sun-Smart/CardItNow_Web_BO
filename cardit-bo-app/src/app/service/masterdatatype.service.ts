import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { masterdatatype } from '../model/masterdatatype.model';
import { masterdata } from '../model/masterdata.model';
/r/n*/
import { environment } from '../../environments/environment';
import { ImasterdatatypeResponse } from '../model/masterdatatype.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class masterdatatypeService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_masterdatatypes(formData, Deleted_masterdata_IDs, masterdatas): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_masterdata_IDs,
        masterdatas: masterdatas?.filter(c => c.masterdataid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/masterdatatype', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_masterdatatypes_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_datatypeid(datatypeid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/datatypeid/' + datatypeid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_masterdatatypes_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_masterdatatypes_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/masterdatatype/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_masterdatatype(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/masterdatatype/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


}

