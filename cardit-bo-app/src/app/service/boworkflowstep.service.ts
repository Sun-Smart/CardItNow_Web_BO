import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boworkflowstep } from '../model/boworkflowstep.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboworkflowstepResponse } from '../model/boworkflowstep.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowstepService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boworkflowsteps(formData): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boworkflowstep', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflowsteps_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_workflowstepid(workflowstepid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/workflowstepid/' + workflowstepid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boworkflowsteps_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boworkflowsteps_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boworkflowstep/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boworkflowstep(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boworkflowstep/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IboworkflowstepResponse> {
    return this.http.get<IboworkflowstepResponse>(AppConstants.ntireboURL + '/boworkflowstep')
      .pipe(
        tap((response: IboworkflowstepResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(boworkflowstep => new boworkflowstep(boworkflowstep.workflowstepid, boworkflowstep.workflowmasterid, boworkflowstep.stepno, boworkflowstep.stepname, boworkflowstep.tat, boworkflowstep.task, boworkflowstep.taskdesc, boworkflowstep.condition, boworkflowstep.yesstep, boworkflowstep.yesstepdesc, boworkflowstep.nostep, boworkflowstep.nostepdesc, boworkflowstep.approver, boworkflowstep.action, boworkflowstep.actiontype, boworkflowstep.minapprovers, boworkflowstep.workflowuserfieldtype, boworkflowstep.workflowuserfieldtypedesc, boworkflowstep.workflowuserfieldname, boworkflowstep.parentid, boworkflowstep.parentiddesc, boworkflowstep.noedittransaction, boworkflowstep.autoapproval, boworkflowstep.autodenial, boworkflowstep.waitduration, boworkflowstep.remainderduration, boworkflowstep.escalationuser, boworkflowstep.cc, boworkflowstep.customfieldid, boworkflowstep.customfieldiddesc, boworkflowstep.predecessor, boworkflowstep.processid, boworkflowstep.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(boworkflowstep => boworkflowstep.stepname.includes(filter.name))

          return response;
        })
      );
  }


  getList_task(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_task', this.sessionService.headeroptions()).toPromise();
  }

  getList_yesstep(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_yesstep', this.sessionService.headeroptions()).toPromise();
  }

  getList_nostep(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_nostep', this.sessionService.headeroptions()).toPromise();
  }

  getList_workflowuserfieldtype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_workflowuserfieldtype', this.sessionService.headeroptions()).toPromise();
  }

  getList_parentid(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_parentid', this.sessionService.headeroptions()).toPromise();
  }

  getList_customfieldid(): any {
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep/getList_customfieldid', this.sessionService.headeroptions()).toPromise();
  }


}

