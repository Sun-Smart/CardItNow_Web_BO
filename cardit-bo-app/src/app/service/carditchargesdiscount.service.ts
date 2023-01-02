import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { carditchargesdiscount } from '../model/carditchargesdiscount.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcarditchargesdiscountResponse } from '../model/carditchargesdiscount.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class carditchargesdiscountService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_carditchargesdiscounts(formData): Promise<any> {
    debugger;
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.carditnowURL + '/carditchargesdiscount', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    debugger;
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_carditchargesdiscounts_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_discountid(discountid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/discountid/' + discountid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_carditchargesdiscounts_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_carditchargesdiscounts_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_carditchargesdiscount(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/carditchargesdiscount/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_recipientuid(): any {
    return this.http.get(AppConstants.carditnowURL + '/carditchargesdiscount/getList_recipientuid', this.sessionService.headeroptions()).toPromise();
  }


}

