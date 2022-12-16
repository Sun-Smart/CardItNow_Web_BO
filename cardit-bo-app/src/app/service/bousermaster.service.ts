import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
/*
import { bousermaster } from '../model/bousermaster.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IbousermasterResponse } from '../model/bousermaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class bousermasterService {
  readonly rootURL = AppConstants.baseURL;


  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }



  //,sign1,sign2,sign3
  async save_bousermasters(formData, userphoto_files, usersignature_files, thumbnail_files, attachmentfiles): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData
      };
      let filearray: any = [];
      //filearray.push(sign1);
      //filearray.push(sign2);
      //filearray.push(sign3);

      filearray.push(userphoto_files);
      filearray.push(usersignature_files);
      filearray.push(thumbnail_files);
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.ntireboURL + '/bousermaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bousermasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_userid(userid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/userid/' + userid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getListBy_sourcereference(sourcereference: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/sourcereference/' + sourcereference, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_bousermasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_bousermasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.ntireboURL + '/bousermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_bousermaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.ntireboURL + '/bousermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbousermasterResponse> {
    return this.http.get<IbousermasterResponse>(AppConstants.ntireboURL + '/bousermaster')
      .pipe(
        tap((response: IbousermasterResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bousermaster => new bousermaster(bousermaster.userid, bousermaster.sourcefield, bousermaster.sourcereference, bousermaster.userroleid, bousermaster.userroleiddesc, bousermaster.branchid, bousermaster.branchiddesc, bousermaster.departmentid, bousermaster.departmentiddesc, bousermaster.usercode, bousermaster.username, bousermaster.shortname, bousermaster.bio, bousermaster.avatar, bousermaster.designation, bousermaster.designationdesc, bousermaster.reportingto, bousermaster.reportingtodesc, bousermaster.role, bousermaster.roledesc, bousermaster.emailid, bousermaster.mobilenumber, bousermaster.password, bousermaster.nextloginchangepassword, bousermaster.validityfrom, bousermaster.validityto, bousermaster.educationid, bousermaster.educationiddesc, bousermaster.usersignature, bousermaster.userphoto, bousermaster.thumbnail, bousermaster.emailpassword, bousermaster.emailsignature, bousermaster.dateofbirth, bousermaster.defaultpage, bousermaster.defaultlanguage, bousermaster.defaultlanguagedesc, bousermaster.layoutpage, bousermaster.theme, bousermaster.gender, bousermaster.genderdesc, bousermaster.nationality, bousermaster.nationalitydesc, bousermaster.bloodgroup, bousermaster.bloodgroupdesc, bousermaster.religion, bousermaster.religiondesc, bousermaster.maritalstatus, bousermaster.maritalstatusdesc, bousermaster.referencenumber, bousermaster.address1, bousermaster.address2, bousermaster.countryid, bousermaster.countryiddesc, bousermaster.stateid, bousermaster.stateiddesc, bousermaster.cityid, bousermaster.cityiddesc, bousermaster.zipcode, bousermaster.menuaccess, bousermaster.menuaccessdesc, bousermaster.branchaccess, bousermaster.branchaccessdesc, bousermaster.emergencycontactperson, bousermaster.relationship, bousermaster.cpphonenumber, bousermaster.emailnotifications, bousermaster.whatsappnotifications, bousermaster.employeespecificapproval, bousermaster.autoapproval, bousermaster.approvallevel, bousermaster.approvalleveldesc, bousermaster.approvallevel1, bousermaster.approvallevel1desc, bousermaster.approvallevel2, bousermaster.approvallevel2desc, bousermaster.approvallevel3, bousermaster.approvallevel3desc, bousermaster.approvallevel4, bousermaster.approvallevel4desc, bousermaster.approvallevel5, bousermaster.approvallevel5desc, bousermaster.approvalleveltype1, bousermaster.approvalleveltype1desc, bousermaster.approvalleveltype2, bousermaster.approvalleveltype2desc, bousermaster.approvalleveltype3, bousermaster.approvalleveltype3desc, bousermaster.approvalleveltype4, bousermaster.approvalleveltype4desc, bousermaster.approvalleveltype5, bousermaster.approvalleveltype5desc, bousermaster.twitter, bousermaster.facebook, bousermaster.linkedin, bousermaster.skype, bousermaster.googleplus, bousermaster.customfield, bousermaster.attachment, bousermaster.status, bousermaster.employeeid))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bousermaster => bousermaster.username.includes(filter.name))

          return response;
        })
      );
  }


  getList_userroleid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_userroleid', this.sessionService.headeroptions()).toPromise();
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_branchid', this.sessionService.headeroptions()).toPromise();
  }

  getList_departmentid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_departmentid', this.sessionService.headeroptions()).toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_designation', this.sessionService.headeroptions()).toPromise();
  }

  getList_reportingto(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_reportingto', this.sessionService.headeroptions()).toPromise();
  }

  getList_role(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_role', this.sessionService.headeroptions()).toPromise();
  }

  getList_educationid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_educationid', this.sessionService.headeroptions()).toPromise();
  }

  getList_defaultlanguage(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_defaultlanguage', this.sessionService.headeroptions()).toPromise();
  }

  getList_gender(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_gender', this.sessionService.headeroptions()).toPromise();
  }

  getList_nationality(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_nationality', this.sessionService.headeroptions()).toPromise();
  }

  getList_bloodgroup(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_bloodgroup', this.sessionService.headeroptions()).toPromise();
  }

  getList_religion(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_religion', this.sessionService.headeroptions()).toPromise();
  }

  getList_maritalstatus(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_maritalstatus', this.sessionService.headeroptions()).toPromise();
  }

  getList_countryid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_countryid', this.sessionService.headeroptions()).toPromise();
  }

  getList_stateid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_stateid', this.sessionService.headeroptions()).toPromise();
  }

  getList_cityid(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_cityid', this.sessionService.headeroptions()).toPromise();
  }

  getList_menuaccess(userroleid): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_menuaccess/' + userroleid, this.sessionService.headeroptions()).toPromise();
  }

  getList_branchaccess(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_branchaccess', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel1(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel1', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel2(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel2', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel3(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel3', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel4(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel4', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvallevel5(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvallevel5', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvalleveltype1(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvalleveltype1', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvalleveltype2(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvalleveltype2', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvalleveltype3(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvalleveltype3', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvalleveltype4(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvalleveltype4', this.sessionService.headeroptions()).toPromise();
  }

  getList_approvalleveltype5(): any {
    return this.http.get(AppConstants.ntireboURL + '/bousermaster/getList_approvalleveltype5', this.sessionService.headeroptions()).toPromise();
  }

  login(email: string, pwd: string, host: string) {

    var body = {
      email: email,
      Password: pwd
    };
    debugger;


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');



    return this.http.get(this.rootURL + "/Token?email=" + email + "&Password=" + pwd + "&host=" + host).toPromise();
  }

}

