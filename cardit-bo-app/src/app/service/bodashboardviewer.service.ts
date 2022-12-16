import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboard } from '../model/bodashboard.model';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboardResponse } from '../model/bodashboard.model';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { map, tap } from 'rxjs/operators';
//import { NbAuthService } from '../../../node_modules/@nebular/auth/services/auth.service';
//import {  NbAuthJWTToken } from '../../../node_modules/@nebular/auth/services/token/token';
import { AppConstants } from '../shared/helper'
import { SharedService } from '../service/shared.service';
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
    providedIn: 'root'
})
export class BODashboardViewerService {
    options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
    SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
    formData: bodashboard;
    readonly rootURL = AppConstants.ntireboURL;
    bodashboarddetails: bodashboarddetail[] = [];
    list: bodashboard[];

    constructor(private http: HttpClient, private sessionService: SessionService, private sharedService: SharedService) { }

    valid() {
        return true;
    }/*return this.service.getToken()
.subscribe((token: NbAuthJWTToken) => {
if (token.isvalid()) {
let payload = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
1=payload.companyid;
this.SessionUser.userid=payload.userid;
this.SessionUser.usercode=payload.usercode;
this.SessionUser.language=payload.language;
this.SessionUser.username=payload.username;
return true;
}
return false; 
});

}
  */saveOrUpdateBODashboards() {
        {
            var body = {
                ...this.formData,
                BODashboardDetails: this.bodashboarddetails,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/BODashboard', body);
        }
    }


    getBODashboardResultsByID(id: number, dt: string, p1: string, p2: string, p3: string): any {
        {
            if (dt == "") dt = "ALL";
            let url = AppConstants.ntireboURL + '/BODashboardViewer/' + id + '/' + dt;
            if (p1 != "") url += "/" + p1;
            if (p2 != "") url += "/" + p2;
            if (p3 != "") url += "/" + p3;
            return this.http.get(url, this.sessionService.headeroptions()).toPromise();
        }
    }

    getBODashboardsList() {
        {
            return this.http.get(AppConstants.ntireboURL + '/BODashboard', this.sessionService.headeroptions()).toPromise();
        }
    }
    getList(key: string) {
        {
            return this.http.get(AppConstants.ntireboURL + '/BODashboard' + '/param/' + key, this.sessionService.headeroptions()).toPromise();
        }
    }

    getBODashboardsByID(id: number): any {
        {
            return this.http.get(AppConstants.ntireboURL + '/BODashboard' + '/' + id, this.sessionService.headeroptions()).toPromise();
        }
    }

    deleteBODashboard(id: number) {
        {
            return this.http.delete(AppConstants.ntireboURL + '/BODashboard' + '/' + id, this.sessionService.headeroptions()).toPromise();
        }
    }
    clearList() {
        this.bodashboarddetails = [];
    }
    refreshList() {
        {
            this.http.get(AppConstants.ntireboURL + '/BODashboard')
                .toPromise()
                .then((res: any) => this.list = res as any[]);
        }
    }
    search(filter: { name: string } = { name: '' }, page = 1): Observable<IbodashboardResponse> {
        return this.http.get<IbodashboardResponse>(AppConstants.ntireboURL + '/BODashboard')
            .pipe(
                tap((response: IbodashboardResponse) => {
                    console.log(response);
                    //////debugger;
                    var response1;
                    response1 = response;
                    //response.results = response1.map(bodashboard => new BODashboard(bodashboard.DashboardID,bodashboard.DashboardName,bodashboard.Rows,bodashboard.Cols,bodashboard.Remarks,bodashboard.UserID,bodashboard.Module,""))
                    // Not filtering in the server since in-memory-web-api has somewhat restricted api
                    //.filter(bodashboard => bodashboard.DashboardName.includes(filter.name))

                    return response;
                })
            );
    }


}

