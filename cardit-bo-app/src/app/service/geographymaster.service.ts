import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { geographymaster } from '../model/geographymaster.model';
import { citymaster } from '../model/citymaster.model';
import { geoaccess } from '../model/geoaccess.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IgeographymasterResponse } from '../model/geographymaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class geographymasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_geographymasters(formData, Deleted_citymaster_IDs, Deleted_geoaccess_IDs, citymasters, geoaccesses): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_citymaster_IDs, Deleted_geoaccess_IDs,
        citymasters: citymasters?.filter(c => c.cityid == null),
        geoaccesses: geoaccesses?.filter(c => c.geoaccessid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/geographymaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_geographymasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_geoid(geoid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/geoid/' + geoid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_geographymasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_geographymasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/geographymaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_geographymaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/geographymaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


}

