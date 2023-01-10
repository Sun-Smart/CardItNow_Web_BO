import { Injectable } from '@angular/core'
import { AppConstants } from '../shared/helper'
import { HttpClient, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { TranslateService } from "@ngx-translate/core";
import { bousermasterService } from './../service/bousermaster.service';
import { bomenuactionService } from './../service/bomenuaction.service';
import { bouserrolemasterService } from './../service/bouserrolemaster.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MenuItems } from '../pages/core/models/menu-item.model';

import { SafePipe } from './../service/safe.pipe';
//import * as JSZip from 'jszip';
import { async } from 'rxjs/internal/scheduler/async';

import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { openfileComponent } from '../custom/openfile.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
//import { bomenuactionService } from './../service/bomenuaction.service';
import { SessionService } from './../pages/core/services/session.service';

import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common'
//declare const Buffer;
//import * as Buffer from "Buffer";
//const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55aWQiOiIxIiwicGtjb2wiOiJORHN5TURJeUxUQTJMVEUzSURFNE9qTTNPalExTGprek5USTVLekExT2pNdyIsImNvZGUiOiJFMDAwMSIsInVzZXJuYW1lIjoiU3VuZGFyIiwidXNlcmlkIjoiNCIsInVzZXJ0eXBlIjoiNiIsImVtcGxveWVlaWQiOiIxIiwidXNlcnJvbGVpZCI6IjYiLCJyb2xlIjoiMSIsImJyYW5jaGlkIjoiMiIsImJyYW5jaGlkZGVzYyI6IiIsImZpbnllYXJpZCI6IiIsImZpbnllYXJkZXNjIjoiIiwiY3VycmVuY3kiOiIiLCJlbWFpbCI6InNyaW1hdGhpc3VuZGFyMTAxQGdtYWlsLmNvbSIsInVzZXJzb3VyY2UiOiIiLCJlbWFpbGlkIjoic3JpbWF0aGlzdW5kYXIxMDFAZ21haWwuY29tIiwiZGVmYXVsdHBhZ2UiOiIvaG9tZS9zaG93ZGFzaGJvYXJkLzEiLCJjb3VudHJ5Y29kZSI6IiIsImxheW91dHBhZ2UiOiIxIiwidGhlbWUiOiJncmV5LXRoZW1lIiwibG9naW5kYXRlIjoiMTctMDYtMjAyMiAxODozNzo0NSIsImV4cCI6MTY1NTY1MTI2NSwiaXNzIjoiaHR0cDovLzEwOC42MC4yMTkuNDQ6NjM5MzkvIiwiYXVkIjoiaHR0cDovLzEwOC42MC4yMTkuNDQ6NjM5MzkvIn0.dr4Loogsaxzu7fFWn9avm0uLEoYkkIVw3ScCFQR_kAI'
  mainScreenSize: any = { 'width': '98%', 'height': '500px' };
  dialogScreenSize: any = { 'width': '98%', 'height': '500px', 'max-height': '500px' };
  tableScreenSize: any = { 'width': '900px', 'height': '480px' };
  public menuid: any;
  public menucode: any;
  public currenturl: any;
  readonly rootURL = AppConstants.ntireboURL;
  readonly uploadURL = AppConstants.UploadURL;
  isMobileResolution: boolean = false;
  readonly AttachmentURL = "http://localhost:5002/Resources/images1/";
  IsDebug: boolean = true;
  public tablepaging: any[];
  progress: any;
  uidesign = "primeNG"
  cleanURL: any;
  images: any[];
  blob: any;
  doc: any;


  currentmodule: any;
  email: any = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
  protected get useraccesslistusers(): any { return this.useraccesslistusersval; };
  protected get useraccesslistroles(): any { return this.useraccesslistrolesval; };

  private useraccesslistusersval: any;
  private useraccesslistrolesval: any;

  constructor(private router: Router, private http: HttpClient, public translate: TranslateService, private sanitizer: DomSanitizer,
    private bousermasterservice: bousermasterService,
    private bomenuactionservice: bomenuactionService,
    private sessionService: SessionService,
    private bouserrolemasterservice: bouserrolemasterService,
    private messageService: MessageService,
    private ngbDateParserFormatter: NgbDateParserFormatter, public dialog: DialogService, public datepipe: DatePipe
  ) {
    this.tablepaging = [
      { key: '20', value: '20' },
      { key: '50', value: '50' },
      { key: '100', value: '100' }
    ];
    // this.FillData();
  }
  getMobileResolution() {
    if (window.innerWidth <= 992) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    return this.isMobileResolution;
  }
  public headeroptions() {
    let obj = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
    return obj;
  }
  public saveoptions() {
    let obj = { headers: new HttpHeaders({ 'Accept': 'application/json', Authorization: 'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '') }) };
    return obj;
  }
  getFormData(body, filearraylist) {
    const formData = new FormData();
    for (let i = 0; i < filearraylist.length; i++) {
      let uploaded_files = filearraylist[i];
      if (uploaded_files.length > 0) {
        for (let file of uploaded_files) {
          formData.append(file.filekey, file);
        }
      }
    }

    formData.append("formData", JSON.stringify(body));
    return formData;
  }
  getErrorText(key, err, errobj) {
    debugger;
    let ret = "";
    if (err == "maxlength" || err == "minlength")
      ret = key + " - Required Length is " + errobj.requiredLength + ".But Actual Length is " + errobj.actualLength
    else if (err == "pattern")
      ret = key + " - Required Pattern is " + errobj.requiredPattern + ".But Actual Value is " + errobj.actualValue
    else if (err == "min")
      ret = key + " - Min is " + errobj.min + ".But Actual Value is " + errobj.actual
    else if (err == "max")
      ret = key + " - Max is " + errobj.max + ".But Actual Value is " + errobj.actual
    else if (err == "required")
      ret = key + " is " + err
    else if (err == "email")
      ret = key + " is not an Email"
    else
      ret = key + " is " + err
    return ret;
  }
  JSON_parse(response) {
    let ret = null;
    try {
      ret = JSON.parse(response);
    } catch (e) {
      //alert(e); // error in the above string (in this case, yes)!
    }
    //console.log(response);
    //console.log(ret)
    return ret;
  }
  getDate(input) {
    // debugger;
    if (input == null) return null;
    //const date = new Date(+timestamp);
    let timestamp = this.datepipe.transform(input);//, 'd/M/YY'
    const date = new Date(timestamp);
    const offset = date.getTimezoneOffset();
    if (offset < 0) {
      date.setHours(12, 0, 0);
    }
    return date.toISOString().substring(0, 10);
  }
  setCurrentModule(modulename) {
    this.currentmodule = modulename;
    if (modulename == "nTireCAMS") {
      this.mainScreenSize = { width: '1000px', height: '500px' };
      this.dialogScreenSize = { width: '800px', height: '500px' };
    }
    else if (modulename == "nTireCRM" || modulename == "nTireProperty") {
      this.mainScreenSize = { width: '1280px', height: '500px' };
      this.dialogScreenSize = { width: '800px', height: '500px' };
    }

  }
  ParseCommon(html) {
    let ret = html;
    ret = ret.replace(new RegExp('##AttachmentURL##', 'g'), AppConstants.AttachmentURL);
    return ret;
  }
  OpenURL(url, menucode, menuid) {
    //debugger;
    if (url != null && url != "") {

      this.menuid = menuid;
      this.menucode = menucode;
      this.currenturl = url;

      this.router.navigate([url]);
    }

  }
  getValue(name, _List, val, field = "") {

    debugger;
    // if(_List==undefined || _List==null || _List.length==0)
    //   this.messageService.add({ severity: 'error', summary: name+" list length is 0", detail: _List, life: 3000 });

    try {
      if (name == "" || name == "value")

        return (_List == undefined || _List == null || val == null || _List?.length == 0) ? null : _List?.find(v => v.value + "" === val + "")
      else
        return (_List == undefined || _List == null || val == null || _List?.length == 0) ? null : _List?.find(v => v[name] + "" === val + "")
      //name?.find(v => v["uid"] + "" === "123" + "").uid
    } catch (e) {
      return null;
    }
  }
  error(e) {
    //console.log(e)
    let err = e;
    if (e?.error != undefined) {
      if (e?.error.errors != undefined) {
        err = ""
        Object.keys(e?.error.errors).forEach(keyError => {
          err += keyError + ":" + e?.error.errors[keyError] + '\n';
        });
      }
    }
    /*
    let emsg = err
      ? err.error
        ? err.error
        : JSON.stringify(err)
      : e.statusText || 'unknown error';
      */
    this.alert(err)
  }
  alert(message) {
    debugger;
    //alert(message);
    // this.messageService.add({ severity: 'success', summary: message, detail: message });
    this.messageService.add({ severity: 'error', summary: "Errorlist", detail: message, life: 3000 });
  alert(message);
  }
  async FillData() {
    await this.bousermasterservice.get_bousermasters_List().then((res: any) => {
      //debugger;
      this.useraccesslistusersval = res;
    });
    await this.bouserrolemasterservice.get_bouserrolemasters_List().then((res: any) => {
      this.useraccesslistrolesval = res;
    });
  }
  totalValues(nestedObjects) {
    debugger;
    return nestedObjects.reduce(
      (totalValue: any = [], nestedObject: any) => {
        // Add the current object's value
        if (totalValue == 0) totalValue = [];
        if (nestedObject.value + "" != "0") totalValue.push(nestedObject.value);

        // If we have children, let's add their values too
        if (nestedObject.children && nestedObject.children.length > 0) {

          totalValue.push(this.totalValues(nestedObject.children));
        }

        // Return the new total
        return totalValue;
      },
      0,
    );
  };


  convert(inputarray, parentid, label, key) {
    debugger
    let array = inputarray.sort((a, b) => (a.parentid < b.parentid ? -1 : 1));
    let ret = [];
    ret.push({
      label: "root", data: { "value": "0", "label": "root" }, expandedIcon: "pi pi-folder-open", collapsedIcon: "pi pi-folder", children: [], parentid: 0, value: 0
    });
    var roots = array.filter(i => (i.parentid == null || i.parentid == 0));//&& i.menudescription!=undefined && i.menudescription.toLowerCase()!='root'
    var json;
    var list = [];
    for (let i = 0; i < roots.length; i++) {
      let root = roots[i];
      root.label = root.menudescription;
      root.children = [...this.BuildTree(root, array, key)];
      list.push(root);//ret[0].children
    }
    ret[0].children = list;

    //var json = JsonConvert.SerializeObject(roots, Formatting.Indented);
    console.log(ret)
    return ret;//ret[0].children[0];

  }
  BuildTree(current, allItems, key) {
    var childs = allItems.filter(c => c.parentid == current[key] && c.menudescription != undefined && c.menudescription.toLowerCase() != 'root');
    for (let i = 0; i < childs.length; i++) {
      let child = childs[i];
      child.label = child.menudescription;
      child.children = this.BuildTree(child, allItems, key);
    }
    current.children = childs;
    return childs;
  }
  convert1(inputarray, parentid, label) {
    ////////debugger;
    let array = inputarray.sort((a, b) => (a.parentid < b.parentid ? -1 : 1));
    let category = parentid;

    var map = [];
    /* map.push( [{
       label:"root",data:{"value":"0","label":"root"},expandedIcon: "pi pi-folder-open",collapsedIcon: "pi pi-folder",children: [],parentid:0,value:0
     }]);*/
    debugger;
    for (var i = 0; i < array.length; i++) {
      /*
        var obj: any = { data: array[i], partialSelected: true };

        obj.label=obj.data.label;
        obj.value=obj.data.value;
        obj.parentid=(obj.data.parentid==null || obj.data.parentid==undefined)?0:obj.data.parentid;
        obj.expandedIcon= "pi pi-folder-open";
        obj.collapsedIcon= "pi pi-folder";
        
        map[obj.data.value] = obj;



        var parent = obj.parentid;//array[i].parentid;
        if(parent==null || parent==undefined)parent=0;
        */
      var obj: any = array[i];
      obj.children = [];
      if (obj.parentid == null || obj.parentid == undefined) obj.parentid = 0;
      //map[obj.value] = obj;
      /*
      if (!map[obj.parentid]) {
        map[obj.parentid] = {
          children: []
        };
      }
      */
      /*
      if (map[obj.parentid].children == undefined || map[obj.parentid].children == null) {

        map[obj.parentid].children = [];
      }
      else {
        map[obj.parentid].icon = 'pi pi-fw pi-download';
      }
*/

      if (obj.label != "Root") {
        if (obj.parentid == 0) {

          if (!map[obj.parentid]) {
            map[obj.parentid] = {
              children: []
            };
          }

          if (map[obj.parentid].children[obj.menuid] == undefined || map[obj.parentid].children[obj.menuid] == null) {
            /* map[obj.parentid].children[obj.pk] = {
               children: []
             };*/
            map[obj.parentid].children[obj.menuid] = (obj);
          }
        }
        else {
          if (map[0].children[obj.parentid] == undefined || map[0].children[obj.parentid] == null) {
            //debugger;
            map[0].children[obj.parentid] = {
              children: []
            };
          }

          if (map[0].children[obj.parentid].children == undefined || map[0].children[obj.parentid].children == null) map[0].children[obj.parentid].children = [];
          map[0].children[obj.parentid].children[obj.menuid] = (obj);
        }

      }


      //if (obj.label != "Root") map[0].children[obj.parentid].children.push(obj);
    }
    debugger;


    //  return map[0];//[0].children;
    let ret = [];
    ret.push({
      label: "root", data: { "value": "0", "label": "root" }, expandedIcon: "pi pi-folder-open", collapsedIcon: "pi pi-folder", children: [], parentid: 0, value: 0
    });
    if (map.length > 0 && map[0] != undefined && map[0].children != undefined) ret[0].children = [...map[0].children.filter((obj) => obj.menuid != null)];
    return ret;
  }

  public getTime(time) {

    if (time != null && time != undefined) return time.hour + ":" + time.minute + ":" + time.second;
  }
  public getUserAccess(json) {

    //debugger;
    let ret = "";
    let users = json.user;
    let roles = json.role;

    //console.log(users);
    //console.log(roles);

    if (users != undefined) {
      for (let i = 0; i < users.length; i++) {
        let obj = (this.getUser(users[i]) as any);
        ret += obj.username;
      }
    }

    //console.log(ret);

    if (roles != undefined) {
      for (let i = 0; i < roles.length; i++) {
        let obj = (this.getRole(roles[i]) as any);
        ret += obj.userrole;
      }
    }
    return ret;
  }
  public getUser(userid) {
    if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
      this.FillData();
    }

    return this.useraccesslistusersval.filter(x => x.userid == userid)[0]

  }
  public getRole(roleid) {
    if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
      this.FillData();
    }

    return this.useraccesslistrolesval.filter(x => x.userroleid == roleid)[0]

  }
  public clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }
  public HtmlValue(row, cell) {
    //debugger;
    for (const key in row) {
      let val = row[key];
      if (val == 'null' || val == null || val == undefined || val == 'undefined') val = '';
      if (cell != undefined) {
        if (key == "attachment" || this.isAttachment(val)) {
          //debugger;
          val = this.getAttachmentValue(val);

          cell = cell.replace(new RegExp('##' + key + '##', 'g'), val);

          ////console.log(cell);
        }
        else
          cell = cell.replace(new RegExp('##' + key + '##', 'g'), val);
      }

    }
    var re = /##(\w+)##/g;
    cell = cell.replace(re, '');
    return this.sanitizer.bypassSecurityTrustHtml(cell);
  }

  onCustomAction(event: any, modulename) {
    //debugger;
    let actionid = event.action;
    return this.bomenuactionservice.getListBy_actionid(actionid).then((res: any) => {
      let objbomenuaction = res[0];
      ////console.log(objbomenuaction);
      var action = { actionid: actionid, actionname: event.action, modulename: 'mstapplicantachievementdetails', actiontype: objbomenuaction.actiontype };
      if (objbomenuaction.actiontype == "D") {
        return objbomenuaction;
      }
      else {
        this.action(null, action, event.data.achievementid, this.sessionService.getSession().userid, null, null).then((res: any) => {
          //debugger;
          ////console.log(res);
          this.alert((res as any).resultOutput);
          if ((res as any).gotopage != undefined && (res as any).gotopage != null && (res as any).gotopage != "") {
            let formname = (res as any).gotopage;
            let recordid = (res as any).gotoid;
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
          }
        });
      }

    });
  }
  action(menuid, action, pk, SessionUser, modulename, dialogdata = null) {
    //debugger;
    let v_dialogdata = null;
    if (dialogdata != null) v_dialogdata = JSON.stringify(dialogdata);
    if (action.modulename != undefined) modulename = action.modulename;
    let actionids = [];
    actionids.push(pk);
    {
      var body = {
        menuid: "" + menuid,
        actionid: "" + action.actionid,
        ids: actionids,
        formid: 0,
        actionname: action.actionname,
        SessionUser: SessionUser,
        fkname: '',
        fkname1: '',
        fk: 0,
        fk1: 0,
        modulename: modulename,
        dialogdata: v_dialogdata
      };
      if (action.actiontype == "P") {

        return this.http.post(AppConstants.ntireboURL + '/ReportViewer/runprocedure', body, this.options).toPromise();
      }
      else {
        return this.http.post(AppConstants.ntireboURL + '/' + action.servicename + '/' + action.actionname, body, this.options).toPromise();
      }
    }
  }

  isJson(item) {
    item = typeof item !== "string"
      ? JSON.stringify(item)
      : item;

    try {
      item = this.JSON_parse(item);
    } catch (e) {
      return false;
    }

    if (typeof item === "object" && item !== null) {
      return true;
    }

    return false;
  }
  isAttachment(item) {
    if (this.isJson(item)) {
      let cellval = this.JSON_parse(item);
      if (cellval.length > 0 && cellval[0].filekey != '') return true;
    }
    return false;
  }


  public getAttachmentValue(cell) {

    //debugger;
    if (cell != null && cell != undefined && cell != "") {
      let cellval = this.JSON_parse(cell);
      let retval = "";
      try {
        if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
          cellval.forEach(element => {
            retval += "<a target='_blank' href='" + AppConstants.AttachmentURL + element.name + "' >" + element.name + "</a> ";
          });
        }
      } catch (err) {
        //console.log(err)
      }
      if (retval == 'null' || retval == null || retval == undefined || retval == 'undefined') retval = '';

      //console.log(retval)
      return retval;
    }
  }
  public getCustomValue(cell) {
    //debugger;
    let cellval = cell
    let retval = "";
    try {
      if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
        cellval.forEach(element => {
          retval += element.name + ' ';
        });
      }
    } catch (err) {
      //console.log(err)
    }
    if (retval == 'null' || retval == null || retval == undefined || retval == 'undefined') retval = '';
    return retval;
  }
  public ParseComment(cell) {
    //debugger;
    let ret = "";
    if (cell == null || cell == undefined || cell == "") return "";
    try {
      if (cell != "" && cell != "null" && cell != null && cell != undefined) {
        let comments = this.JSON_parse(cell);
        for (let comment of comments) {
          //if (ret != "") ret += "\r\n";
          let dt = this.ngbDateParserFormatter.parse(comment.currentDate);// 
          ret += "<p class='nogap'><span class='frontcolor'>" + dt.year + "-" + dt.month + "-" + dt.day + "</span> : " + comment.commentTxt + "</p>";
          //replyComment
        }
        return ret;
      }

    } catch (err) {
      //console.log(err)
    }
    return ret;
  }
  public ParseUserAccess(cell) {
    let ret = this.ParseUserAccessDetails(cell);
    return ret;
  }

  public ParseUserAccessDetails(cell) {

    if (cell == null || cell == undefined || cell == "") return "";
    //debugger;
    let ret = "";
    let json1;

    let json;
    //console.log(cell);
    try {
      json1 = this.JSON_parse(cell);
      //console.log(json1);
      try {
        json = this.JSON_parse(json1);
      } catch (e: any) {
        json = json1;
      }
      /* json1=json;
         try {
           json=this.JSON_parse(json1);
         } catch (e:any) {
             json=json1;
         }*/

      //console.log(json);

      let users = json.user;
      let roles = json.role;

      //console.log(users);
      //console.log(roles);

      if (users != undefined) {
        for (let i = 0; i < users.length; i++) {
          let obj = (this.getUser(users[i]) as any);
          ret += obj.username;
        }
      }

      //console.log(ret);

      if (roles != undefined) {
        for (let i = 0; i < roles.length; i++) {
          let obj = (this.getRole(roles[i]) as any);
          ret += obj.userrole;
        }
      }

      //console.log(ret);

    } catch (e: any) {
    }
    return ret;
  }

  //
  addMonths(d, val) {
    return d.setMonth(d.getMonth() + val);
  };
  addDays(d, val) {
    return d.setDate(d.getDay() + val);
  };
  /*
  getList(key:string) {
  
      return this.http.get(AppConstants.ntireboURL + '/umssectionmaster'+'/param/'+key,this.options).toPromise();
  
    }
  */
  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  //
  showAttachment(e, filename) {
    ////debugger;
    e.preventDefault();
    window.open('http://localhost:5002/Resources/images1/' + filename, '', 'width=200, height=100');
    return false;
  }
  pk_encode(strInput: any) {
    //debugger;
    strInput += ";" + "01-01-2000";
    let ret = window.btoa(strInput);//new Buffer(strInput, 'utf-8').toString('base64');//encode(strInput.toString());
    return ret;
  }

  async geturl(filename: string, filetype: string) {
    //debugger;

    this.dialog.open(openfileComponent,
      {
        data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
        header: filename
      }
    );

    return;

  }

  async convertMenu(array) {
    //debugger;
    //var map = {};
    var map = [];
    for (var i = 0; i < array.length; i++) {
      var obj: MenuItems;
      obj = new MenuItems();
      obj.id = array[i].menuid;
      //obj.menucode = array[i].menucode;
      //obj.label = array[i].menudescription;
      let desc = array[i].menuname;
      if (desc == null) desc = ""

      //console.log(desc)
      if (desc != '' && desc != null && this.translate.get(desc) != null && this.translate.get(desc) != undefined)
        obj.label = await this.translate.get(desc).toPromise();
      else
        obj.label = desc;
      obj.tooltip = desc;
      obj.title = desc;
      //'<img src="http://localhost:5002/MyResources/workflow.webp"></img>'
      //obj.icon=array[i].menudescription.toLowerCase().replace(/ /g, '');
      //obj.escape= false;
      obj.icon = array[i].iconname;

      let link = array[i].menulocation;


      obj.routerLink = link;
      obj.command = (e: any) => { this.OpenPage(e); };
      //  obj.IsChildVisible=true;
      // obj.expanded = true;
      // obj.children = [];
      // obj.IsChildVisible=false;
      map[obj.id] = obj;


      var parent = array[i].parentid || '-';
      if (!map[parent]) {
        map[parent] = {
          items: []
        };
      }
      if (map[parent].items == undefined || map[parent].items == null) {

        map[parent].items = [];
      }
      else {
        // map[parent].icon = 'pi pi-fw';  //
      }

      map[parent].items.push(obj);
    }
    //debugger;
    var ret = {}
    ret[0] = {
      label: "root", items: map, parentid: 0
    };
    //return map['1'].items;
    return map['-'].items;
    // return map.items;
  }
  OpenPage(e: any) {
    ////debugger;
    if (e.item.routerLink != null && e.item.routerLink != "") {
      //console.log("layout" + e.item.id);
      this.menuid = e.item.id;
      this.menucode = e.item.menucode;
      this.currenturl = e.item.routerLink;
      this.router.navigate([e.item.routerLink]);
    }

  }

  async upload(files: File[], folderid: any = 0) {
    debugger
    //debugger;
    const formData = new FormData();
    formData.append("folderid", folderid.toString());
    if (files.length > 0) {
      for (let file of files) {
        formData.append(file.name, file);

      }

      //const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
      //headers:headers
      const uploadReq = new HttpRequest('POST', this.uploadURL, formData, {
        reportProgress: true
      });

      this.http.request(uploadReq).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          //console.log(this.progress);
        }
      });

    }

    //    return this.http.post(this.uploadURL, formData,this.options).toPromise();

    return new Promise(resolve => {
      resolve(true);
    });

  }
}