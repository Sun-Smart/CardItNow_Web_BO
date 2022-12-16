import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { bomenumaster } from '../model/bomenumaster.model';
import { bomenuaction } from '../model/bomenuaction.model';
*/
import { environment } from '../../environments/environment';
import { IbomenumasterResponse } from '../model/bomenumaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class bomenumasterService {
  //options = {headers: new HttpHeaders({'Accept': 'application/json','Content-Type': 'application/json',Authorization:'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '')})};
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, public sharedService: SharedService, private sessionService: SessionService) {
    // this.sessionService.headeroptions() = {headers: new HttpHeaders({'Accept': 'application/json','Content-Type': 'application/json',Authorization:'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '')})}; 
  }

  valid() {
    return true;

  }
  async save_bomenumasters(formData, Deleted_bomenuaction_IDs): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      //,Deleted_bomenuaction_IDs
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/bomenumaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bomenumasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_menuid(menuid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/menuid/' + menuid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_menucode(menucode: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/menucode/' + menucode, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_menuurl(menuurl: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/menuurl/' + menuurl, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bomenumasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bomenumasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bomenumaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bomenumaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bousermenumaster_List(param: any = 0): Promise<any> {
    debugger;
    /* this.sessionService.headeroptions() =new HttpHeaders({Accept: 'application/json','Content-Type': 'application/json',Authorization:localStorage.getItem("currentUser")?.replace(/"/g, '')}); 
     const token=localStorage.getItem("currentUser")?.replace(/"/g, '');
     let options1 =  {
       headers: await new HttpHeaders({
         Accept: 'application/json','Content-Type': 'application/json',
         Authorization: token
       })
     };
     //let options={headers:new HttpHeaders().set( 'Authorization','Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '')).set('Accept', 'application/json').set('Content-Type', 'application/json')}
     */
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/bousermenumaster/' + param, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async get_bousermenumaster_ListJSON(param: any = 0): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bomenumaster/bousermenumaster_json/' + param, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbomenumasterResponse> {
    return this.http.get<IbomenumasterResponse>(AppConstants.ntireboURL + '/bomenumaster')
      .pipe(
        tap((response: IbomenumasterResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bomenumaster => new bomenumaster(bomenumaster.menuid, bomenumaster.menucode, bomenumaster.menudescription, bomenumaster.menuurl, bomenumaster.actionkey, bomenumaster.iconname, bomenumaster.helpurl, bomenumaster.helptext, bomenumaster.parentid, bomenumaster.parentiddesc, bomenumaster.orderno, bomenumaster.action, bomenumaster.showcheckbox, bomenumaster.showstatus, bomenumaster.checkboxcolumn, bomenumaster.nonew, bomenumaster.noedit, bomenumaster.nodelete, bomenumaster.wherecondition, bomenumaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bomenumaster => bomenumaster.menudescription.includes(filter.name))

          return response;
        })
      );
  }


  getList_parentid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster/getList_parentid', this.sessionService.headeroptions()).toPromise();
  }


}

