import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bouserrolemaster } from '../model/bouserrolemaster.model';
import { hrmsinterviewrolescoring } from '../../../../n-tire-hrms-app/src/app/model/hrmsinterviewrolescoring.model';
import { lmscommissionrate } from '../../../../n-tire-crm-app/src/app/model/lmscommissionrate.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbouserrolemasterResponse } from '../model/bouserrolemaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bouserrolemasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, public sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_bouserrolemasters(formData, thumbnail_files, Deleted_hrmsinterviewrolescoring_IDs, Deleted_lmscommissionrate_IDs, hrmsinterviewrolescorings, lmscommissionrates): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_hrmsinterviewrolescoring_IDs, Deleted_lmscommissionrate_IDs,
        hrmsinterviewrolescorings: hrmsinterviewrolescorings?.filter(c => c.userrolescoringid == null),
        lmscommissionrates: lmscommissionrates?.filter(c => c.commissionrateid == null)
      };
      let filearray: any = [];
      filearray.push(thumbnail_files);
      let res = await this.http.post(AppConstants.ntireboURL + '/bouserrolemaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bouserrolemasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_userroleid(userroleid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/userroleid/' + userroleid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bouserrolemasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bouserrolemasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bouserrolemaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bouserrolemaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbouserrolemasterResponse> {
    return this.http.get<IbouserrolemasterResponse>(AppConstants.ntireboURL + '/bouserrolemaster')
      .pipe(
        tap((response: IbouserrolemasterResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bouserrolemaster => new bouserrolemaster(bouserrolemaster.userroleid, bouserrolemaster.userrole, bouserrolemaster.menuaccess, bouserrolemaster.menuaccessdesc, bouserrolemaster.musthaveskills, bouserrolemaster.preferredskills, bouserrolemaster.keywords, bouserrolemaster.dealbreakers, bouserrolemaster.softskills, bouserrolemaster.additionalnotes, bouserrolemaster.salary, bouserrolemaster.screeningprocess, bouserrolemaster.phoneinterviewers, bouserrolemaster.onsiteinterviewprocess, bouserrolemaster.points, bouserrolemaster.advertisementtitle1, bouserrolemaster.advertisementdetails1, bouserrolemaster.advertisementtitle2, bouserrolemaster.advertisementdetails2, bouserrolemaster.advertisementtitle3, bouserrolemaster.advertisementdetails3, bouserrolemaster.thumbnail, bouserrolemaster.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bouserrolemaster => bouserrolemaster.userrole.includes(filter.name))

          return response;
        })
      );
  }


  getList_menuaccess(): any {
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster/getList_menuaccess', this.sessionService.headeroptions()).toPromise();
  }


}

