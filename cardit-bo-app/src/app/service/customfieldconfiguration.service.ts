import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customfieldconfiguration } from '../model/customfieldconfiguration.model';
import { environment } from '../../environments/environment';
import { IcustomfieldconfigurationResponse } from '../model/customfieldconfiguration.model';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
import { SharedService } from '../service/shared.service';

@Injectable({
  providedIn: 'root'
})
export class customfieldconfigurationService {
    options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: customfieldconfiguration;
  readonly rootURL = AppConstants.ntireboURL;
  list: any[];

  constructor(public sharedService: SharedService, private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = this.sharedService.JSON_parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatecustomfieldconfigurations() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/customfieldconfiguration', body);
    }
  }

  saveOrUpdatecustomfieldconfigurationsList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/customfieldconfiguration', body);
    }
  }

  getcustomfieldconfigurationsList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/customfieldconfiguration', this.options).toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/customfieldconfiguration' + '/param/' + key, this.options).toPromise();
    }
  }

  getcustomfieldconfigurationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/customfieldconfiguration' + '/' + id, this.options).toPromise();
    }
  }

  getcustomfieldconfigurationsByTable(id: string, formname: string = "", CustomFormField: string = "", CustomFormFieldValue: string = "", customfieldjson: string = ""): any {
    {
      var body = {
        key: id,
        CustomFormName: formname,
        CustomFormField: CustomFormField,
        CustomFormFieldValue: CustomFormFieldValue
      }
      /*
      let strCondition = "";
      if (formname != "") {
        strCondition = "/" + formname;
      }
      else {
        strCondition = "/~";
      }
      if (CustomFormField != "") {
        strCondition = strCondition + "/" + CustomFormField;
      }
      else {
        strCondition += "/~";
      }
      if (CustomFormFieldValue != "") {
        strCondition = strCondition + "/" + CustomFormFieldValue;
      }
      else {
        strCondition += "/~";
      }
      */
      let list1: any[] = [];
      ////debugger;
      //console.log(AppConstants.ntireboURL + '/customfieldconfiguration' + '/table/' + id + strCondition);

      return this.http.post(AppConstants.ntireboURL + '/customfieldconfiguration' + '/table', body).toPromise().then((res: any) => {
        ////debugger;
        if (res != null) {
          console.log(res);
          //////debugger;
          let dynamicfields = (res as any).bodynamicformdetail;
          if ((customfieldjson as any).CustomField != undefined && (customfieldjson as any).CustomField != null) customfieldjson = (customfieldjson as any).CustomField;
          for (let j = 0; j < dynamicfields.length; j++) {
            let fld = dynamicfields[j];
            let type = 'text';
            let val = '';
            if (customfieldjson != null && (customfieldjson as any)[fld.fieldname] != null) {
              val = (customfieldjson as any)[fld.fieldname];
            }
            let fld_required = false;
            if (fld.required == true) fld_required = true;
            if (fld.controltype == "C") type = "checkbox";
            if (fld.controltype == "R") type = "radio";
            if (fld.controltype == "D") type = "dropdown";


            let ddlist: any[] = [];
            let lines: string[];
            if (fld.controltype == "D" || fld.controltype == "R") {
              lines = fld.configurations.split(',');
              for (let i = 0; i < lines.length; i++) {
                let Texts: string[];
                Texts = lines[i].split(':');
                ddlist.push({ key: Texts[0], label: Texts[1] });
              }
            }
            if (fld.controltype == "D") {
              list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
            }
            else if (fld.controltype == "C") {
              ddlist.push({ key: fld.fieldname, label: fld.fieldname });
              list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
            }
            else if (fld.controltype == "R") {
              list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
            }
            else if (fld.controltype == "F") {
              list1.push({ type: 'file', name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
            else if (fld.controltype == "M") {
              list1.push({ type: 'text', multiline: true, mobilenumber: false, email: false, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
            else if (fld.controltype == "E") {
              list1.push({ type: 'text', email: true, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
            else if (fld.controltype == "sec") {
              list1.push({ type: 'sec', name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
            else if (fld.controltype == "MN") {
              list1.push({ type: 'text', mobilenumber: true, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
            else {
              list1.push({ type: type, multiline: false, mobilenumber: false, email: false, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
            }
          }
        }
        this.list = list1;
        if (res == null) return null;
        let dynamicform = (res as any).bodynamicform;
        let customfields = {
          fields: this.list,
          formhtml: dynamicform.formhtml,
          cols: dynamicform.cols,
          templatehtml: dynamicform.templatehtml
        }
        return (customfields);


      }
      );
    }
    //
  }

  reset(document: any): any {

    var customfields = {};
    if (this.list != null) {
      this.list.forEach((value: any) => {
        var objName = value.name;
        var objValue1 = (document.all[value.name]) as any;
        if (objValue1 != undefined && objValue1 != null) {
          document.all[value.name].value = "";
        }
      });
    }

  }
  getCustomValues(document: any) {
    ////debugger;
    var customfields = {};
    if (this.list != null) {
      this.list.forEach((value: any) => {
        var objName = value.name;
        var objValue1 = (document.all[value.name]) as any;
        if (objValue1 != undefined && objValue1 != null) {
          var objValue = objValue1.value;
          if (value.mobilenumber != undefined && value.mobilenumber != null && value.mobilenumber != false) {
            customfields[objName] = objValue1.firstElementChild.lastElementChild.value;
          }
          else {
            customfields[objName] = objValue;
          }
        }
      });
    }
    return customfields;
  }
  deletecustomfieldconfiguration(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/customfieldconfiguration' + '/' + id, this.options).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/customfieldconfiguration')
        .toPromise()
        .then((res: any) => this.list = res as any[]);
    }
  }

}

