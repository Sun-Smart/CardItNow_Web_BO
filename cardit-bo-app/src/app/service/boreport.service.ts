import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { boreport } from '../model/boreport.model';
import { boreportdetail } from '../model/boreportdetail.model';
import { boreportothertable } from '../model/boreportothertable.model';
import { boreportcolumn } from '../model/boreportcolumn.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IboreportResponse } from '../model/boreport.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class boreportService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_boreports(formData, Deleted_boreportdetail_IDs, Deleted_boreportothertable_IDs, Deleted_boreportcolumn_IDs, boreportdetails, boreportothertables, boreportcolumns): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_boreportdetail_IDs, Deleted_boreportothertable_IDs, Deleted_boreportcolumn_IDs,
        boreportdetails: boreportdetails?.filter(c => c.reportdetailid == null),
        boreportothertables: boreportothertables?.filter(c => c.othertableid == null),
        boreportcolumns: boreportcolumns?.filter(c => c.reportcolumnid == null)
      };
      let filearray: any = [];
      let res = await this.http.post(AppConstants.ntireboURL + '/boreport', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreports_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_reportid(reportid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/reportid/' + reportid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_reportcode(reportcode: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/reportcode/' + reportcode, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_boreports_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_boreports_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/boreport/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_boreport(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/boreport/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IboreportResponse> {
    return this.http.get<IboreportResponse>(AppConstants.ntireboURL + '/boreport')
      .pipe(
        tap((response: IboreportResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(boreport => new boreport(boreport.reportid, boreport.reportcode, boreport.reportname, boreport.reportmodule, boreport.reportmoduledesc, boreport.actionkey, boreport.reporttype, boreport.reporttypedesc, boreport.columns, boreport.sidefilter, boreport.sidefiltertype, boreport.sidefiltertypedesc, boreport.sidefilters, boreport.maintablename, boreport.maintablealias, boreport.maintableidentityfield, boreport.pk, boreport.query, boreport.wherecondition, boreport.cardtype, boreport.html, boreport.calendar, boreport.kanbanview, boreport.kanbankey, boreport.datefilter, boreport.datefiltercolumnname, boreport.datefiltertype, boreport.datefiltertypedesc, boreport.groupby, boreport.groupbytext, boreport.groupby2, boreport.groupby2text, boreport.groupbyrelationship, boreport.groupbyrelationshipdesc, boreport.sortby1, boreport.sortby2, boreport.sortby3, boreport.parentid, boreport.parentdescription, boreport.detailtablename, boreport.detailtablealias, boreport.jointype, boreport.jointypedesc, boreport.detailtableidentityfield, boreport.detailtablefk, boreport.detailtableconcatenate, boreport.detailtableheader, boreport.detailtablefooter, boreport.detailtablequery, boreport.masterdetailwhere, boreport.numrows, boreport.reportoutputtype, boreport.reportoutputtypedesc, boreport.noheader, boreport.header, boreport.footer, boreport.headerquery, boreport.footerquery, boreport.headerquery1, boreport.footerquery1, boreport.headerquery2, boreport.footerquery2, boreport.headerquery3, boreport.footerquery3, boreport.headerquery4, boreport.footerquery4, boreport.headerquery5, boreport.footerquery5, boreport.header1, boreport.footer1, boreport.header2, boreport.footer2, boreport.header3, boreport.footer3, boreport.header4, boreport.footer4, boreport.header5, boreport.footer5, boreport.status, boreport.css, boreport.viewhtmltype, boreport.viewhtmltypedesc, boreport.viewhtml, boreport.viewcss, boreport.reporthtml, boreport.workflowhtmltype, boreport.workflowhtmltypedesc, boreport.workflowhtml, boreport.component, boreport.alternateview, boreport.recordtype, boreport.recordtypedesc, boreport.userfield, boreport.employeefield, boreport.userfiltertype, boreport.rolefield, boreport.dashboardid, boreport.dashboardiddesc, boreport.tableheader, boreport.reportjsondata, boreport.helptext, boreport.filters, boreport.filtercolumns, boreport.groupbyfooter, boreport.email, boreport.schedule, boreport.scheduledesc, boreport.nextschedule, "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(boreport => boreport.reportname.includes(filter.name))

          return response;
        })
      );
  }


  getList_reportmodule(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_reportmodule', this.sessionService.headeroptions()).toPromise();
  }

  getList_reporttype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_reporttype', this.sessionService.headeroptions()).toPromise();
  }

  getList_sidefiltertype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_sidefiltertype', this.sessionService.headeroptions()).toPromise();
  }

  getList_datefiltertype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_datefiltertype', this.sessionService.headeroptions()).toPromise();
  }

  getList_groupbyrelationship(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_groupbyrelationship', this.sessionService.headeroptions()).toPromise();
  }

  getList_jointype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_jointype', this.sessionService.headeroptions()).toPromise();
  }

  getList_reportoutputtype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_reportoutputtype', this.sessionService.headeroptions()).toPromise();
  }

  getList_viewhtmltype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_viewhtmltype', this.sessionService.headeroptions()).toPromise();
  }

  getList_workflowhtmltype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_workflowhtmltype', this.sessionService.headeroptions()).toPromise();
  }

  getList_recordtype(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_recordtype', this.sessionService.headeroptions()).toPromise();
  }

  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_dashboardid', this.sessionService.headeroptions()).toPromise();
  }

  getList_schedule(): any {
    return this.http.get(AppConstants.ntireboURL + '/boreport/getList_schedule', this.sessionService.headeroptions()).toPromise();
  }



}

