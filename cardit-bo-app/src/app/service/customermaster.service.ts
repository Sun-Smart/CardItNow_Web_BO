import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
import { customermaster } from '../model/customermaster.model';
import { customerdetail } from '../model/customerdetail.model';
import { customertermsacceptance } from '../model/customertermsacceptance.model';
import { customerpaymode } from '../model/customerpaymode.model';
import { customersecurityquestion } from '../model/customersecurityquestion.model';
import { customersecurityquestionshistory } from '../model/customersecurityquestionshistory.model';
/r/n*/
import { environment } from '../../environments/environment';
import { IcustomermasterResponse } from '../model/customermaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';
@Injectable({
  providedIn: 'root'
})
export class customermasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sharedService: SharedService, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  async save_customermasters(formData, customerphoto_files, attachmentfiles, Deleted_customerdetail_IDs, Deleted_customertermsacceptance_IDs, Deleted_customerpaymode_IDs, Deleted_customersecurityquestion_IDs, Deleted_customersecurityquestionshistory_IDs, customerdetails, customertermsacceptances, customerpaymodes, customersecurityquestions, customersecurityquestionshistories): Promise<any> {
    if (this.valid()) {
      var body = {
        data: formData, Deleted_customerdetail_IDs, Deleted_customertermsacceptance_IDs, Deleted_customerpaymode_IDs, Deleted_customersecurityquestion_IDs, Deleted_customersecurityquestionshistory_IDs,
        customerdetails: customerdetails?.filter(c => c.customerdetailid == null),
        customertermsacceptances: customertermsacceptances?.filter(c => c.customertermid == null),
        customerpaymodes: customerpaymodes?.filter(c => c.payid == null),
        customersecurityquestions: customersecurityquestions?.filter(c => c.securityquestionid == null),
        customersecurityquestionshistories: customersecurityquestionshistories?.filter(c => c.historyid == null)
      };
      let filearray: any = [];
      filearray.push(customerphoto_files);
      filearray.push(attachmentfiles);
      let res = await this.http.post(AppConstants.carditnowURL + '/customermaster', this.sessionService.getFormData(body, filearray), this.sessionService.saveoptions()).toPromise();
      return res;
    }
  }

  async getDefaultData(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/getdefaultdata', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customermasters_List(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async getListBy_customerid(customerid: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/customerid/' + customerid, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async getList(key: string): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/param/' + key, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async getFullList(): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/fulllist', this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }


  async get_customermasters_ByEID(id: any): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/e/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }
  async get_customermasters_ByID(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.get(AppConstants.carditnowURL + '/customermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  async delete_customermaster(id: number): Promise<any> {
    if (this.valid()) {
      let res = await this.http.delete(AppConstants.carditnowURL + '/customermaster/' + id, this.sessionService.headeroptions()).toPromise();
      return res;
    }
  }

  getList_mode(): any {
    return this.http.get(AppConstants.carditnowURL + '/customermaster/getList_mode', this.sessionService.headeroptions()).toPromise();
  }

  getList_type(): any {
    return this.http.get(AppConstants.carditnowURL + '/customermaster/getList_type', this.sessionService.headeroptions()).toPromise();
  }

  getList_defaultavatar(): any {
    return this.http.get(AppConstants.carditnowURL + '/customermaster/getList_defaultavatar', this.sessionService.headeroptions()).toPromise();
  }


}

