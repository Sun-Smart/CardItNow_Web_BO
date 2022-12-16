import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowhistory } from '../model/boworkflowhistory.model';
import { environment } from '../../environments/environment';
import { IboworkflowhistoryResponse } from '../model/boworkflowhistory.model';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowhistoryService {
    options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: boworkflowhistory;
  readonly rootURL = AppConstants.ntireboURL;
  list: boworkflowhistory[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = this.sharedService.JSON_parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdateboworkflowhistories() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/boworkflowhistory', body);
    }
  }

  saveOrUpdateboworkflowhistoriesList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/boworkflowhistory', body);
    }
  }

  getboworkflowhistoriesList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory', this.options).toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory' + '/param/' + key, this.options).toPromise();
    }
  }

  getboworkflowhistoriesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory' + '/' + id, this.options).toPromise();
    }
  }

  deleteboworkflowhistory(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/boworkflowhistory' + '/' + id, this.options).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/boworkflowhistory')
        .toPromise()
        .then((res: any) => this.list = res as any[]);
    }
  }

}

