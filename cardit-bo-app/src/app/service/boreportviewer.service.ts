import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreport } from '../model/boreport.model';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportResponse } from '../model/boreport.model';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { map, tap } from 'rxjs/operators';
//import { NbAuthService } from '../../../node_modules/@nebular/auth/services/auth.service';
//import { NbAuthJWTToken } from '../../../node_modules/@nebular/auth/services/token/token';
import { AppConstants } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';


@Injectable({
    providedIn: 'root'
})
export class BOReportViewerService {
        options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
    //SessionUser = { companyid: 0, userid: 0, empid: 0, usercode: '', username: '', language: '' };
    SessionUser = this.sharedService.JSON_parse(this.sessionService.getItem("currentUser"));
    formData: boreport;
    readonly rootURL = AppConstants.ntireboURL;
    boreportcolumns: boreportcolumn[] = [];
    list: boreport[];
    Insertids: any[] = [];
    actionids: any[] = [];
    formid: any = null;

    fkname: any = "";
    fk: any = "";
    fkname1: any = "";
    fk1: any = "";

    constructor(private sharedService: SharedService, private http: HttpClient, public sessionService: SessionService) { }

    valid() {
        var sessionuser = this.sharedService.JSON_parse(this.sessionService.getItem("currentUser"));
        if (sessionuser != null) {
            this.SessionUser = sessionuser;
            return true;
        }
        return false;
    }
    async UpdateSequence(data, report) {
        var body = {
            data: data,
            report: report
        }
        let res = await this.http.post(AppConstants.ntireboURL + '/ReportViewer/sequence', body, this.options).toPromise();
        return res;
    }

    saveOrUpdateBOReports() {
        {
            var body = {
                ...this.formData,
                BOReportColumns: this.boreportcolumns,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/BOReport', body);
        }
    }

    uploaddata(reportid, data) {
        var body = {
            reportid,
            data: JSON.stringify(data)
        }
        return this.http.post(AppConstants.ntireboURL + '/ReportViewer/upload', body, this.options).toPromise();
    }
    saveview(reportid, view, filters) {
        var body = {
            reportid,
            view,
            filters: JSON.stringify(filters)
        }
        return this.http.post(AppConstants.ntireboURL + '/ReportViewer/saveview', body, this.options).toPromise();
    }

    process(menuid, objaction, pk, modulename) {
        this.actionids = [];
        this.actionids.push(pk);
        return this.action(menuid, objaction, modulename)
    }

    action(menuid, action, modulename, dialogdata = null) {
        //debugger;
        let v_dialogdata = null;
        if (dialogdata != null) v_dialogdata = JSON.stringify(dialogdata);
        if (action.modulename != undefined) modulename = action.modulename;
        if (this.formid == null) this.formid = 0;
        {
            var body = {
                menuid: "" + menuid,
                actionid: "" + action.actionid,
                ids: this.actionids,
                formid: this.formid,
                actionname: action.actionname,
                SessionUser: this.SessionUser,
                fkname: this.fkname,
                fkname1: this.fkname1,
                fk: this.fk,
                fk1: this.fk1,
                modulename: modulename,
                dialogdata: v_dialogdata
            };
            if (action.actiontype == "P") {

                return this.http.post(AppConstants.ntireboURL + '/ReportViewer/runprocedure', body, this.options).toPromise();
            }
            else {
                return this.http.post(action.servicename, body, this.options).toPromise();
            }
            //AppConstants.ntireboURL +
        }
    }
    runsp(menuid, spname, id, modulename) {
        ////debugger;
        var action = {
            actionname: spname,
            actionid: -5001,
            actiontype: "P"
        }

        this.actionids = [];
        this.actionids.push("" + id);
        return this.action(menuid, action, modulename);
    }

    runemail(menuid, data) {
        {
            var body = {
                menuid: "" + menuid,
                data: data,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/ReportViewer/' + 'email', body, this.options).toPromise();
        }
    }


    delete(reportcode, pk) {
        {
            var body = {
                reportcode: "" + reportcode,
                pk: pk
            };
            return this.http.post(AppConstants.ntireboURL + '/ReportViewer/delete', body, this.options).toPromise();
        }
    }



    getBOReportsList() {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport', this.options).toPromise();
        }
    }
    getList(key: string) {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport' + '/param/' + key, this.options).toPromise();
        }
    }

    getBOReportResultsByID(id: string, status: any, parameters: any, addparams: any, pk: any, modulename: any = "", modulepkcol: any = ""): any {
        {
            let v_parameters = null;
            //v_parameters=this.sharedService.JSON_parse(parameters);
            var body = {
                id: id,
                SessionUser: "ss",//this.SessionUser,
                parameters: parameters,
                addparams: addparams,
                status: status,
                fkname: this.fkname,
                fk: this.fk,
                fkname1: this.fkname1,
                fk1: this.fk1,
                modulename: modulename,
                modulepkcol: modulepkcol,
                key: "",
                pkvalue: 0//pk

            };
            if (this.fk == null || this.fk == undefined) this.fk = "";
            if (this.fkname == null || this.fkname == undefined) this.fkname = "";

            if (this.fk1 == null || this.fk1 == undefined) this.fk1 = "";
            if (this.fkname1 == null || this.fkname1 == undefined) this.fkname1 = "";


            //return this.http.post(AppConstants.ntireboURL + '/ReportViewer/' + '/' + id,body,this.options).toPromise();

            return this.http.post(AppConstants.ntireboURL + '/ReportViewer', body, this.options).toPromise();
            /*
            else
            {
                return this.http.get(AppConstants.ntireboURL + '/ReportViewer/'  + id+ '/' + fkname + '/' + fk,this.options).toPromise();
            }
            */
        }
    }

    getBOReportsByID(id: number): any {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport' + '/' + id, this.options).toPromise();
        }
    }

    deleteBOReport(id: number) {
        {
            return this.http.delete(AppConstants.ntireboURL + '/BOReport' + '/' + id, this.options).toPromise();
        }
    }
    clearList() {
        this.boreportcolumns = [];
    }
    refreshList() {
        {
            this.http.get(AppConstants.ntireboURL + '/BOReport')
                .toPromise()
                .then((res: any) => this.list = res as any[]);
        }
    }
    search(filter: { name: string } = { name: '' }, page = 1): Observable<IboreportResponse> {
        return this.http.get<IboreportResponse>(AppConstants.ntireboURL + '/BOReport')
            .pipe(
                tap((response: IboreportResponse) => {
                    console.log(response);
                    //////debugger;
                    var response1;
                    response1 = response;
                    /*
                    response.results = response1.map(boreport => new BOReport(boreport.ReportID, boreport.ReportName, boreport.ReportType, boreport.ReportTypeDesc, boreport.DateFilter, boreport.DateFilterColumnName, boreport.DateFilterType, boreport.DateFilterTypeDesc, boreport.Header, boreport.Footer, boreport.MainTableName, boreport.MainTableAlias, boreport.MainTableIdentityField, boreport.GroupBy, boreport.SortBy1, boreport.SortBy2, boreport.SortBy3, boreport.Query, boreport.NumRows, boreport.ReportOutputType, boreport.ReportOutputTypeDesc, boreport.DetailTableName, boreport.DetailTableAlias, boreport.DetailTableIdentityField, boreport.DetailTableFK, boreport.DetailTableConcatenate, boreport.OtherTables, boreport.OtherColumns, boreport.OtherConditions, boreport.Status, ""))
                      // Not filtering in the server since in-memory-web-api has somewhat restricted api
                      .filter(boreport => boreport.ReportName.includes(filter.name))
                    */
                    return response;
                })
            );
    }


}

