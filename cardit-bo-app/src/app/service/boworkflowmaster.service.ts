import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boworkflowmaster } from '../model/boworkflowmaster.model';
import { boworkflow } from '../model/boworkflow.model';
import { boworkflowstep } from '../model/boworkflowstep.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboworkflowmasterResponse } from '../model/boworkflowmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boworkflowmasters(formData, Deleted_boworkflow_IDs, Deleted_boworkflowstep_IDs, boworkflows, boworkflowsteps): Promise<any> {
    debugger;
    if (this.valid()) {
      var body = {
        data: formData, Deleted_boworkflow_IDs, Deleted_boworkflowstep_IDs,
        boworkflows: boworkflows?.filter(c => c.workflowid == null),
        boworkflowsteps: boworkflowsteps?.filter(c => c.workflowstepid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boworkflowmaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflowmasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_workflowmasterid(workflowmasterid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/workflowmasterid/' + workflowmasterid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boworkflowmasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflowmasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boworkflowmaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boworkflowmaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_menucode(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/getList_menucode', this.sessionService.headeroptions()).toPromise();
  }

  getList_tablecode(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster/getList_tablecode', this.sessionService.headeroptions()).toPromise();
  }


}

