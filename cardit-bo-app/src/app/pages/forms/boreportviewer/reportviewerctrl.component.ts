declare var $: any;
import { ToastService } from '../../../pages/core/services/toast.service';
import { FooterComponent } from '../../layout/footer/footer.component';
//import { crmtatconfigurationComponent } from '../crmtatconfiguration/crmtatconfiguration.component';
//import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import {

    ViewContainerRef, ViewChildren, QueryList,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory, OnDestroy, Compiler, Injector, NgModuleRef, NgModule
} from '@angular/core'
//, Renderer2
import { BOReportViewerService } from '../../../service/boreportviewer.service';
import { boreport } from '../../../model/boreport.model';

import { menumasterService } from '../../../service/menumaster.service';

import { boreportService } from '../../../service/boreport.service';
import { Component, NgZone, TemplateRef, OnInit, forwardRef, Inject, Optional, ViewChild, AfterViewInit, ElementRef, EventEmitter, Output, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
//import { NbDialogService } from '@nebular/theme';
//import { NbDialogRef } from '@nebular/theme';
import { boconfigvalueService } from '../../../service/boconfigvalue.service';
import moment from 'moment';
//import * as moment from 'moment';
import { SelectItem } from 'primeng/api';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../../service/shared.service';
import { TableModule, Table } from 'primeng/table';
import { TreeTable } from 'primeng/treetable';

//import {DataTable} from 'primeng/components/datatable/datatable';
import { NgxPrintModule } from 'ngx-print';
//import { erpsuppliercertificationService } from '../../../service/erpsuppliercertification.service';
import { DatePipe } from '@angular/common';
import { dataComponent } from '../boreportdata/data.component';


import { Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NgScrollbar } from 'ngx-scrollbar';
import { DialogService } from 'primeng/dynamicdialog';
/*
import { hrmsleaverequestComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsleaverequest/hrmsleaverequest.component';
import { hrmsletterrequestComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsletterrequest/hrmsletterrequest.component';
import { erppurchaserequestComponent } from '../../../pages/forms/erppurchaserequest/erppurchaserequest.component';
import { umscourseComponent } from '../../../../../../n-tire-learn-app/src/app/pages/forms/umscourse/umscourse.component';
*/
//import { MenuItem } from '../../core/models/menu-item.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SessionService } from '../../../pages/core/services/session.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { ThemeService } from '../../../pages/core/services/theme.service';


import { bodlgviewerComponent } from './bodlgviewer.component';

import { FilterMetadata } from 'primeng/api';


import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'ngx-reportviewer',
    templateUrl: './reportviewerctrl.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ReportViewerCtrlComponent),
            multi: true
        }
    ],

    styles: [`

`]
})
//, ControlValueAccessor
export class ReportViewerCtrlComponent implements ControlValueAccessor, OnInit, AfterViewInit {
    style: any = "{width:'100%';max-height:'400px'}";
    customers: any;
    rowData: any;
    menuitems: any[] = [];
    dateFilters: any;
    dateRangeStart: any;
    dateRangeEnd: any;
    blockedDocument: boolean;
    @Input() viewtype: any;


    @Input() customreportid: any;
    @Input() custommenuid: any;
    /*
       
       
   
       @Input() ParamsChange: EventEmitter<any> = new EventEmitter<any>();
       */
    @Input() param: any;
    @Input() sequence: any;
    @Input() reportparameterid: any;
    @Output() onExecute: EventEmitter<any> = new EventEmitter<any>();


    newdata: any = [];

    editable: boolean = false;
    notcreated: boolean = true;
    componentRef: any;
    paginator: boolean = true;
    @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
    //@ViewChildren("container") container: QueryList<ElementRef>;
    container1: any;

    @ViewChild('scrollable', { static: false }) scrollbarRef: NgScrollbar;
    unsubscriber$ = Subscription.EMPTY;
    view: any;
    boreportviewerForm: FormGroup;
    paramid: any;
    filters: any;
    @ViewChild('dt', { static: false }) dt: Table;
    @ViewChild('dt1', { static: false }) dt1: TreeTable;
    page2: number = 0;
    fkname: any;
    fk: any;
    fkname1: any;
    fk1: any;
    outputtype: any = 'list';
    detailtableheader: any = '';
    detailtablefooter: any = '';
    PrevGroupData: any = '';
    pmenuid: any;
    pmenucode: any;
    css = '';
    html = '';

    sortField = '';
    sortMode = '';
    rowGroupMode = '';
    groupRowsBy = '';
    tbl_reorder: any = [];
    showmenu = true;
    cardtype: boolean = false;
    dashboardid: number = 0;
    data: any[];
    header1results: any[];
    data2: any[];
    selecteditems: any[];
    cities: SelectItem[];
    reportlist: any;
    cols: any[];
    header1cols: any[] = [];
    reportid: any;
    reportcode: any;
    sumcols: any[] = [];
    sumcolnames: any[] = [];
    categories: any[];
    rowData1: any;
    groupfield = '';
    groupfieldtext = '';
    numFilter: any;
    numtimeout: any;
    reportheader: any;
    //rowgroupmetadata: any;
    first = 0;
    page = 0;
    page1 = 0;
    rowsdisplay = 5;
    growsdisplay = 20;
    hrowsdisplay = 20;
    showfilter = false;
    showcheckbox = false;
    showgroupcheckbox = false;
    checkboxavailable = false;
    selecteddata: any;
    configdata: any;
    savedviews: any[] = [];
    statusdata: any;
    kanbanview: any;
    kanbankey: any;
    masterkey: any;
    currentp: number = -1;
    menuactions: any = [];
    menumasterdata: any;
    selectionMode: string = "single";
    showtype: string = "";
    treeview: boolean = true;
    data5: any;
    dialogdata: any;
    additionaldata: any;
    parentid: any;
    parentdescription: any;
    parameterid: any;
    bsameform: boolean;
    canadd: boolean;
    canedit: boolean;
    candelete: boolean;
    htmltouch: number = 0;
    expandedRows: {} = {};
    sessiondata: any;
    h1cols: any[] = [];
    savedview: any;
    action: any;
    viewfilter: any;
    theme: string;
    contentAreaid: string = "reportmaincontent";
    filtercols: any = [];

    modulename: any;
    modulepkcol: any;
    scrollheight = "450px";
    thCollection: any = [];


    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    customfieldjson: any;
    customfieldvisible: boolean = true;
    showhideadd: boolean = true;


    constructor(
        private toastr: ToastService,
        private _compiler: Compiler,
        private _injector: Injector,
        private _m: NgModuleRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private router: Router,
        public sharedService: SharedService,
        //private toastr: ToastrService,
        private currentRoute: ActivatedRoute,
        private boreportservice: boreportService,
        private boreportviewerservice: BOReportViewerService,
        private menumasterservice: menumasterService,
        public dialog: DialogService,
        public sessionService: SessionService,
        private themeService: ThemeService,
        private customfieldservice: customfieldconfigurationService, private sanitizer: DomSanitizer,
        //private fb: FormBuilder,
        @Inject(DOCUMENT) private document, private elementRef: ElementRef, private datePipe: DatePipe, private spinner: NgxSpinnerService
    ) {
        //, private renderer: Renderer2
        ////debugger;

        this.theme = this.sessionService.getItem("selected-theme");
        this.dialogdata = this.dynamicconfig;
        if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
        //console.log("cons" + this.sharedService.menuid);

        if (this.sharedService.menuid != undefined) {
            ////console.log(this.sharedService.menuid);
            this.pmenuid = this.sharedService.menuid;
            this.pmenucode = this.sharedService.menucode;
        }

    }


    writeValue(value: any): void {
        //debugger;
        //alert(value);
        //this.paramsChange(value);
        //return;
        //this.sharedService.alert('w');
        /*
                if (value > 0) {
                    //this.value(value);
                    //this.Initialize(this.customreportid, null);
                    if (this.viewtype == "'1'") {
                        this.contentAreaid = "reportmaincontent1";//reportmaincontent1
                        this.customreportid = value;
                        this.Initialize(this.customreportid, null);
                    }
        
                    else if (this.reportparameterid != null) {
                        this.reportparameterid = value;
                        this.Initialize(this.reportparameterid, null);
                        this.paramid = this.reportparameterid;
                    }
                    else {
                        this.Initialize(value, null);
                    }
                }
                */
    }

    // Function to call when the rating changes.
    onChange = (value: any) => {
    };

    // Function to call when the input is touched (when a star is clicked).
    onTouched = () => { };

    get value(): string {

        return this.value;
    }

    set value(value: string) {

    }
    consolelog(dt) {
        console.log(dt);
    }
    registerOnChange(fn: (_: any) => void): void {
        //////debugger;
        this.onChangeFn = fn;

    }

    registerOnTouched(fn: any): void {
    }


    onChangeFn = (_: any) => { };



    filterExists(fieldname) {
        ////debugger;
        return this.filtercols.find(c => c == fieldname);
    }
    SaveView() {
        //debugger;
        this.boreportviewerservice.saveview(this.reportid, this.view, this.dt.filters);
        ////console.log(this.view, this.dt.filters);
    }
    onChangeView(val) {


        //debugger;
        let filters = this.configdata?.filters;
        if (filters != null && filters != undefined) {
            let flds = this.sharedService.JSON_parse(filters);
            if (flds != null && flds != "") {
                for (let i = 0; i < flds.length; i++) {
                    let obj = this.sharedService.JSON_parse(flds[i]);
                    if (obj.view == val) {
                        let filters = this.sharedService.JSON_parse(obj.filters);

                        for (var property in filters) {
                            let fieldname = property;
                            if (filters.hasOwnProperty(property)) {
                                let filtervalues = filters[property];
                                this.dt.filter(filtervalues.value, fieldname, filtervalues.matchMode);
                                if (this.viewfilter != "") this.viewfilter += ",";
                                this.viewfilter += fieldname + " " + filtervalues.matchMode + " " + filtervalues.value + " ";
                            }
                        }

                        /*filters.forEach((filter: any) => {
                            //debugger;
                            //let filtervalues=
                            this.dt.filter(filter.value, "name", filter.matchMode)
                        });*/

                        return;
                    }
                }
            }
        }
    }

    createFilterDate(time) {
        return this.datePipe.transform(new Date(time), 'MMM dd, yyyy').toUpperCase();
    }
    goNextRow(event, columnName: string, index: number = 0) {
        //console.log(event);
        //console.log(index);
        event.stopPropagation();

        let element: HTMLElement = document.getElementById((columnName + (index + 1).toString())) as HTMLElement;
        if (element == undefined || element == null) {
            element = document.getElementById((columnName + (0).toString())) as HTMLElement;
        }
        //console.log(element);
        element.click();
    }
    onEditInit(event, index): void {
        //console.log(event);
        //console.log(index);
        //console.log(this.data);
        //console.log('Edit Init Event Called');
    }
    onEditSave(event): void {
        //console.log(event);
        //console.log(this.data);
        //console.log('Edit save Event Called');
    }
    onEditComplete(event) {
        let obj = { field: event.field, pk: event.data.pk, val: event.data[event.field] };
        this.newdata.push(obj);
        //console.log(event);
        //console.log('Edit complete Called');
    }
    BulkEdit() {
        this.editable = !this.editable;
    }
    UploadData() {
        this.boreportviewerservice.uploaddata(this.reportid, this.newdata);
        //this.editable=false;
        this.newdata = [];
    }
    onEditCancel(index): void {
        //console.log(index);
        //console.log(this.data);
        //console.log('Edit Cancel Event Called');
    }
    reset() {
        this.data = [];
    }
    paramsChange(id) {

        //debugger;
        return this.Initialize(id, null);
        /*
        //this.sharedService.alert('p');
        this.paginator = true;
        if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
        if (this.viewtype == "'1'") {
            this.contentAreaid = "reportmaincontent1";//reportmaincontent1
            this.customreportid = id;
            this.paginator = false;
            this.paramid = this.customreportid;
            id = (this.customreportid);
            //this.showmenu = false;

            return this.Initialize(this.customreportid, null);
        }

        else if (this.reportparameterid != null) {
            this.reportparameterid = id;
            this.paramid = this.reportparameterid;
            return this.Initialize(this.reportparameterid, null);

        }
        else {
            return this.Initialize(id, null);
        }
*/
    }


    ngAfterViewInit() {

        if (this.dt != undefined) {
            this.dt.filterService.filters['customCreatedDateFilter'] = (value: string, filter) => {
                ////debugger;
                if (this.dateRangeStart === value && this.dateRangeEnd === undefined) {
                    return true;
                }

                if (this.dateRangeStart === value || this.dateRangeEnd === value) {
                    return true;
                }

                if (this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined &&
                    moment(this.dateRangeStart).isBefore(value) && moment(this.dateRangeEnd).isAfter(value)) {
                    return true;
                }

                return false;
            };
        }
        if (this.customreportid != null && this.customreportid != undefined && this.customreportid != "") {
            this.rowsdisplay = 5;
            this.Initialize(this.customreportid, "");
        }

    }
    ngOnDestroy() {
        this.unsubscriber$.unsubscribe();
    }

    format(date) {
        return moment(date).format('lll');
    }
    arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });

    }

    selectNode(rowData, e) {
        //debugger;
        ////console.log(e)
        if (e.target.checked)
            this.selecteddata.push(rowData);
        else {
            this.selecteddata = this.arrayRemove(this.selecteddata, rowData);
        }

    }
    dialog_menuactions(action) {
        debugger;
        let e = { action, data: this.selecteddata }
        this.onExecute.emit(e);
        if (action.description == "Delete") {
            let Item = this.data?.find(v => v.pk === this.selecteddata.pk)
            if (Item != undefined) {
                let pos = this.data.indexOf(Item);

                if (pos >= 0) this.data.splice(pos, 1);
            }

        }


    }
    context_menuactions(action) {
        debugger;
        if (this.configdata?.parentid != null && this.configdata?.parentid != "")
            this.buttonactions(action, this.selecteddata.data);
        else
            this.buttonactions(action, this.selecteddata);
    }

    CheckboxSelect(rowData, e) {
        //debugger;
        /*
        ////console.log(e)
        if (e.target.ariaChecked == "true")
            this.selecteddata.push(rowData);
        else {
            this.selecteddata = this.arrayRemove(this.selecteddata, rowData);
        }
*/
    }
    getHtml(rowData) {
        let ret = "";
        /*if (this.outputtype == "html" && this.configdata?.html != "") {
            ////console.log(this.configdata?.html)
            ret = eval(this.configdata?.html);
            ////console.log(ret);
        }*/
        // debugger;
        /* this.sharedService.alert("rowData");
         let s='';
         Object.keys(rowData).forEach(key => s+=','+key);
         this.sharedService.alert(s);
 
         this.sharedService.alert(rowData.isfooter);*/


        if (rowData.isfooter == 1 || rowData.isfooter == '1') return rowData.footerstring;
        if (this.outputtype == "html" && this.configdata?.html != "") {
            ret = this.configdata?.html;

            ret = this.sharedService.ParseCommon(ret);

            this.cols.forEach((col: any) => {
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }
        //if(this.cardtype)ret+="<div role='button' onclick='viewroute()'><i  onclick='viewroute()' class='fa fa-eye' aria-hidden='true'></i></div>";
        //if(this.cardtype)ret+="<button></button>"
        this.htmltouch = 1;
        //return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
        return ret;
    }
    getJsonObject(data) {
        if (data != undefined && data != null) {

            try {
                return this.sharedService.JSON_parse(data);
            } catch (err) {
                return data;
            }

            /*
            let retval="";
            //debugger;
            let cellval=this.sharedService.JSON_parse(rowData[val]);
            //console.log(cellval);
            cellval.forEach(element => {
            retval+=element.name+' ';
            //console.log(element);
            });

            return retval;
            */
        }
    }
    colStyles(bgcolor, forecolor) {
        let ret = "";
        if (bgcolor != "") ret = "background-color:" + bgcolor;
        if (ret != "") ret += ";";
        if (forecolor != "") ret = "color:" + forecolor;
    }


    getcolHtml(rowData, html) {
        //////////debugger;
        let ret = "";
        /*if (this.outputtype == "html" && this.configdata?.html != "") {
            ////console.log(this.configdata?.html)
            ret = eval(this.configdata?.html);
            ////console.log(ret);
        }*/
        if (html != "" && html != undefined) {
            ret = html;
            this.cols.forEach((col: any) => {
                //if (rowData[col.field] == null || rowData[col.field] == undefined) rowData[col.field] = "";
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }
        //if(this.cardtype)ret+="<div role='button' onclick='viewroute()'><i  onclick='viewroute()' class='fa fa-eye' aria-hidden='true'></i></div>";
        //if(this.cardtype)ret+="<button></button>"
        //console.log(html + ret);
        return ret;
    }
    getTag(values) {
        // debugger;
        let ret = "";
        if (values != "" && values != undefined) {
            //   ////////////debugger;
            let flds = this.sharedService.JSON_parse(values);
            if (flds != null && flds != "") {

                let clr = "green";
                for (let i = 0; i < flds.length; i++) {
                    if (i == 0)
                        clr = "green";
                    else if (i == 1)
                        clr = "brown";
                    else if (i == 1)
                        clr = "yellow";
                    else if (i == 1)
                        clr = "red";
                    else if (i == 1)
                        clr = "indigo";
                    else
                        clr = "violet";
                    ret += "<span class='" + clr + " p-badge'>" + flds[i] + "</span>";
                }
            }

        }
        return ret;
    }
    getAddress(values) {

        let ret = "";
        if (values != "" && values != undefined) {
            //   ////////////debugger;
            let flds1 = this.sharedService.JSON_parse(values);
            let flds = this.sharedService.JSON_parse(flds1);
            if (flds != undefined && flds != null && flds != "") {
                //this._value = '{"A1":"' + address1 + '","A2":"' + address2 + '","Dt":"' + district + '","CT":"' + countryid + '","ST":"' + stateid  + '","CY":"' + cityid  + '","Z":"' + pin + '"}';

                ret += flds.A1 + "\n" + flds.A2 + "\n" + flds.A1 + "\n" + flds.Dt + "\n" + flds.CTD + "\n" + flds.STD + "\n" + flds.CYD + "\n" + flds.Z;
            }

        }
        return ret;
    }
    getAccess(values) {
        debugger;
        let ret = "";
        let roleret = "";
        let userret = "";
        if (values != "" && values != undefined) {
            //   ////////////debugger;
            let flds = this.sharedService.JSON_parse(values);
            if (flds != null && flds != "" && flds.role != null && flds.role.length > 0) {

                let clr = "green";

                for (let i = 0; i < flds.role.length; i++) {
                    if (i == 0)
                        clr = "green";
                    else if (i == 1)
                        clr = "brown";
                    else if (i == 1)
                        clr = "yellow";
                    else if (i == 1)
                        clr = "red";
                    else if (i == 1)
                        clr = "indigo";
                    else
                        clr = "violet";
                    roleret += "<span class='" + clr + " p-badge'>" + flds.role[i] + "</span>";
                }
                if (roleret != "") roleret = "Role :" + roleret;
            }
            if (flds != null && flds != "" && flds.user != null && flds.user.length > 0) {

                let clr = "green";

                for (let i = 0; i < flds.user.length; i++) {
                    if (i == 0)
                        clr = "green";
                    else if (i == 1)
                        clr = "brown";
                    else if (i == 1)
                        clr = "yellow";
                    else if (i == 1)
                        clr = "red";
                    else if (i == 1)
                        clr = "indigo";
                    else
                        clr = "violet";
                    userret += "<span class='" + clr + " p-badge'>" + flds.user[i] + "</span>";
                }
                if (userret != "") userret = "User :" + userret;
            }

        }
        ret = roleret + "\r\n" + userret;
        return ret;
    }
    getCustomFields(values) {

        let ret = "";
        if (values != "" && values != "{\"CustomField\":{}}") {
            //   ////////////debugger;
            let flds = this.sharedService.JSON_parse(values);
            if (flds != null && flds != "") {
                let obj = flds.customfield;
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if (ret != "") ret += "\r\n";
                        ret += obj[property];
                    }
                }
            }

        }
        return ret;
    }
    openurl(url) {
        //this.sharedService.alert('d');
        window.open(url, "_blank");
    }
    nextrow(rowData) {
        this.rowData1 = rowData;
        this.page1 = this.page;
        return false;
    }
    getAttachments(values) {
        ////console.log(values);
        let ret: string[] = [];
        if (values != null && values != undefined && values != "" && values != "{\"1\":\"\"}") {
            //    ////////////debugger;
            let flds = this.sharedService.JSON_parse(values);
            // //console.log(flds);
            // //console.log(flds);
            if (flds != null && flds != "") {

                /*flds.forEach((obj: any) => {
                    ret.push(obj.value);
                });*/
                /*
                for (var property in flds) {
                    if (flds.hasOwnProperty(property)) {

                        ret.push(flds[property]);
                    }
                    ////console.log(fileobj);
                }
                */
                for (let i = 0; i < flds.length; i++) {
                    ////console.log(flds[i]);
                    ret.push(flds[i].value);
                }

            }
        }
        //  //console.log(ret);
        return ret;
    }
    showAll() {
        //this.sharedService.alert('s');
        if (this.dt != undefined) this.dt.reset();
        if (this.dt != undefined) this.dt.toggleRowsWithCheckbox(null, false);

        if (this.showtype == "" || this.showtype == "A")
            this.showtype = "all";
        else
            this.showtype = "";
        this.showtype = "all";
        ////debugger;
        this.Initialize(this.paramid, this.showtype);
    }
    goroute(action, recordid, rowData) {
        ////debugger;
        //document.getElementById("contentArea1").scrollTop = 0;
        this.selecteddata = rowData;
        switch (action) {
            case 'url':
                this.route('url', recordid);
                break;
            case 'create':
                this.route('view', recordid);
                break;
            case 'edit':
                this.route('edit', recordid);
                break;
            case 'get':
                this.route('get', recordid);
                break;
            /*case 'view':
                if (this.dialogdata.ScreenType == "2") this.dialogRef.close(this.selecteddata);
                break;*/
        }
    }
    route(action, recordid = null) {
        //debugger;
        //document.getElementById("contentArea1").scrollTop = 0;
        if (this.bsameform) {
            if (action == 'create') {
                this.componentRef.instance.parameterid = null;
            }
            return;
        }
        let formname = "";
        //let recordid = "";


        if (this.configdata?.maintablename == "boreports") {
            formname = "boreports";
            //PK
            //if(this.selecteddata!=null && action!="edit" || action!="delete")
            if (this.selecteddata != null) recordid = this.selecteddata["reportid"];
        }
        else {
            formname = (this.configdata?.component as string);
            if (formname == null || formname == "") {
                formname = (this.configdata?.maintablename as string)?.toLowerCase();

            }


        }
        if (recordid == null) {
            if (this.selecteddata != null && this.selecteddata != undefined && action != "create") {
                if ((action == "edit" || action == "delete") && (this.selecteddata.length > 1 || this.selecteddata.length < 1)) {
                    this.sharedService.alert("Select a record");
                    return;
                }
                if (this.selecteddata instanceof Array) {
                    let firstrow = this.selecteddata[0];
                    recordid = firstrow[((this.configdata?.pk == "" || this.configdata?.pk == undefined || this.configdata?.pk == null) ? this.configdata?.maintableidentityfield : "pkcol")]
                }
                else
                    recordid = this.selecteddata[((this.configdata?.pk == "" || this.configdata?.pk == undefined || this.configdata?.pk == null) ? this.configdata?.maintableidentityfield : "pkcol")];
            }
            else if (action == "edit" || action == "delete" || (this.selecteddata != null && this.selecteddata != undefined && this.selecteddata.length > 1)) {
                this.sharedService.alert("Select a record");
                return;
            }
        }
        let query = "";

        if (this.fkname != null && this.fkname != "" && this.fk != null && this.fk != "") {
            query = "/" + this.fkname + "/" + this.fk;
        }
        if (this.fkname1 != null && this.fkname1 != "" && this.fk1 != null && this.fk1 != "") {
            query = query + "/" + this.fkname1 + "/" + this.fk1;
        }

        let child = false;
        //if(this.menumasterdata!=null && this.menumasterdata!=undefined)child=this.menumasterdata?.childparent;


        switch (action) {
            case 'url':
                query = query + "/menu/hide";
                let url = '/#/home/' + formname + '/edit/' + encodeURIComponent(this.selecteddata['pkcol']) + query;
                this.dialog.open(dataComponent,
                    {
                        data: { url: url, ScreenType: 2 }
                    }
                );
                break
            case 'get':
                if (this.dialogdata.ScreenType == "2") this.dialogRef.close(this.selecteddata);
                break;
            case 'create':
                this.router.navigate(['/home/' + formname + query]);
                break;
            case 'view':
                //this.router.navigate(['/home/boreportviewer/view/' + this.configdata?.reportid + '/' + recordid]);
                this.sessionService.setViewHtml(this.configdata?.viewhtml);
                this.router.navigate(['/home/' + formname + '/view/' + this.selecteddata['pkcol'] + query]);
                break;
            case 'edit':
                this.router.navigate(['/home/' + formname + '/edit/' + this.selecteddata['pkcol'] + query]);

                break;

        }
    }
    onRowDblClick(event) {
        //////////debugger;
        //this.selecteddata=rowData;
        this.route("edit", null);
    }
    selectRow(rowData) {
        ////debugger;
        this.selecteddata = rowData;
    }
    onRowSelect(event) {
        if (this.bsameform) {
            this.selecteddata = event.data;
            if (this.selecteddata != null) this.parameterid = this.selecteddata[((this.configdata?.pk == "" || this.configdata?.pk == undefined) ? this.configdata?.maintableidentityfield : "pkcol")];
            this.componentRef.instance.parameterid = this.parameterid;
        }
        ////////////debugger;
        /*
            this.selecteddata = event.data;
    */

        if (event.originalEvent.target['nodeName'] === "P-TABLECHECKBOX") {

            let recordid = "";
            if (this.selecteddata != null) recordid = this.selecteddata[((this.configdata?.pk == "" || this.configdata?.pk == undefined) ? this.configdata?.maintableidentityfield : "pkcol")];
            this.boreportviewerservice.Insertids.push("" + recordid);

        }

        //  this.sharedService.alert(event.data[this.masterkey]);
    }
    async updatemenu(reportcode) {
        let res = await this.menumasterservice.getListBy_menuurl(reportcode);
        //console.log(res);
        //this.sharedService.alert("res ");
        this.sharedService.menuid = (res as any)[0].menuid;
        this.sharedService.menucode = (res as any)[0].menucode;
        this.pmenuid = this.sharedService.menuid;
        this.pmenucode = this.sharedService.menucode;
        this.router.navigate(['/home/boreportviewer/' + reportcode]);
    }
    add(obj) {
        this.data.push(obj);
        this.data = [...this.data];
        this.rowData = {};
    }
    update(currentobj, obj) {
        debugger;
        let updateItem = this.data?.find(v => v.pkcol === currentobj.pkcol)
        if (updateItem != undefined) {
            let pos = this.data.indexOf(updateItem);

            if (pos >= 0) this.data[pos] = obj;
        }
        this.data = [...this.data];
        this.rowData = {};
    }
    onClose() {
        //debugger;
        this.dialogRef.close();
    }
    processaction(action) {
        debugger;

        let actionid = action.actionid;
        //console.log(this.selecteddata);
        //if(this.selecteddata.data!=null)this.selecteddata=this.selecteddata.data;
        this.boreportviewerservice.formid = 0;
        if (this.dialogdata != null && this.dialogdata["formid"] != null) this.boreportviewerservice.formid = this.dialogdata["formid"];
        this.boreportviewerservice.actionids = [];
        if (this.treeview) {
            this.selecteddata.forEach((d: any) => {
                if (d.children == null || d.children == undefined) {
                    this.boreportviewerservice.actionids.push("" + d.data.pkcol);
                }
            });
        }
        else if (this.showgroupcheckbox) {
            this.boreportviewerservice.actionids.push("" + this.selecteddata.pkcol);
        }
        else if (this.selectionMode == "multiple") {
            this.selecteddata.forEach((d: any) => {
                if (d.children == null || d.children == undefined) {
                    this.boreportviewerservice.actionids.push("" + d.pkcol);
                }
            });
            if ((this.selecteddata != null && this.selecteddata != undefined && this.selecteddata.length == 0)) {
                this.sharedService.alert("Select a record");
                return;
            }
            if (this.selecteddata != null && this.selecteddata != undefined && this.selecteddata.length > 1 && actionid == "-4002") {
                this.sharedService.alert("Select a single record to edit");
                return;
            }
            if (this.selecteddata != null && this.selecteddata != undefined && this.selecteddata.length > 1 && actionid == "-4006") {
                this.sharedService.alert("Select a single record to view");
                return;
            }
        }
        else {
            /*this.selecteddata.forEach((d: any) => {
                this.boreportviewerservice.actionids.push("" + d.pk);
            });
            */
            if (this.selecteddata == null || this.selecteddata == undefined) {
                this.sharedService.alert("Select a record");
                return;
            }
            this.boreportviewerservice.actionids.push("" + this.selecteddata.pkcol);
        }


        if (this.menuactions != null) {
            for (let i = 0; i < this.menuactions?.length; i++) {
                if (this.menuactions[i].actionid == actionid) {
                    //debugger;
                    this.dialogdata.customfield = this.customfieldservice.getCustomValues(document);
                    this.spinner.show();
                    this.boreportviewerservice.action(this.pmenuid, this.menuactions[i], this.pmenucode, this.dialogdata).then((res: any) => {
                        //debugger;
                        //console.log(res);
                        this.spinner.hide();
                        this.sharedService.alert((res as any).resultOutput);
                        this.ReportOutputAction(res);
                    },
                        err => {
                            //debugger;
                            this.spinner.hide();

                            ////console.log(err);

                        });


                    break;
                }
            }
        }

    }
    ReportOutputAction(res) {
        //this.sharedService.alert('r');
        if ((res as any).gotopage != undefined && (res as any).gotopage != null && (res as any).gotopage != "") {
            let formname = (res as any).gotopage;
            let recordid = (res as any).gotoid;
            if (formname == "REPORT") {
                var reportparameters = recordid?.split('#');
                //////debugger;
                this.paramid = reportparameters[0];
                this.updatemenu(this.paramid);



                //
                //this.paramsChange(reportparameters[0]);
            }
            else {
                this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
            }

        }
        else {
            this.Initialize(this.reportcode, "");
        }
    }
    onRowUnselect(event) {
        // this.selecteddata = null;
        // this.sharedService.alert(event.data[this.masterkey]);
    }
    async UpdateSequence() {
        debugger;
        await this.boreportviewerservice.UpdateSequence(this.tbl_reorder.filter(x => (x as any).change == true), this.configdata);
    }
    onRowReorder(event) {
        debugger;
        //this.tbl_reorder.push({"from":event.dragIndex,"to":event.dropIndex}) ;
        let from = event.dragIndex;
        let to = event.dropIndex;
        this.tbl_reorder[event.dragIndex].sequence = to;
        this.tbl_reorder[event.dropIndex].sequence = from;
        this.tbl_reorder[event.dragIndex].change = true;
        this.tbl_reorder[event.dropIndex].change = true;

    }
    buttonactions(action, rowData) {
        //debugger;
        //this.sharedService.alert('a');
        if (action.actionid != "-4002" && action.actionid != "-4006") {
            //if (!confirm("Do you want to proceed with " + action.description + "?")) return;
        }

        let actionid = action.actionid;
        this.boreportviewerservice.formid = 0;
        if (this.dialogdata != null && this.dialogdata["formid"] != null) this.boreportviewerservice.formid = this.dialogdata["formid"];
        //console.log(this.selecteddata);
        this.boreportviewerservice.actionids = [];

        this.boreportviewerservice.actionids.push("" + rowData['pkcol']);

        if (this.menuactions != null) {
            for (let i = 0; i < this.menuactions?.length; i++) {
                if (this.menuactions[i].actionid == actionid) {
                    var objmenuaction = this.menuactions[i];
                    if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "opendialog") {
                        this.opendialog(action, rowData);
                    }
                    else if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "opendialog1") {
                        this.opendialog1(action, rowData);
                    }
                    else if (objmenuaction.actiontype == "F" && objmenuaction.actionname == "openreportdialog") {
                        this.openreportdialog(action, rowData);
                    }
                    else if (action.actionid == "-4002") {
                        this.selecteddata = rowData;
                        this.route('edit');
                    }
                    else if (action.actionid == "-4006") {
                        this.selecteddata = rowData;
                        this.route('view');
                    }

                    else {
                        debugger;
                        this.boreportviewerservice.action(this.pmenuid, this.menuactions[i], this.pmenucode, rowData).then((res: any) => {
                            debugger;
                            //
                            //console.log(res);
                            //this.Initialize(this.paramid, "");
                            this.sharedService.alert((res as any).resultOutput);

                            this.ReportOutputAction(res);

                        });
                    }
                    break;
                }
            }
        }

    }
    openreportdialog(action, rowData) {
        //debugger;
        let stredit = 'edit';
        if (rowData["noneditable"] == '1')
            stredit = 'view';
        //let url = "/#/workflow/" + rowData["modulename"] + "/" + rowData["modulename"] + "/"+stredit+"/" + encodeURIComponent(rowData["pkvalue"]);
        let url = "/#/home/showpopup/mstre/module/" + this.configdata?.maintablename + "/" + encodeURIComponent(rowData["pkcol"]) + "/menu/hide";// + encodeURIComponent(rowData["pkvalue"])
        //this.sharedService.alert(url);
        /*
        this.dialog.open(dataComponent,
            {
                data: { url: url, ScreenType: 2 }
            }
        );
        */
        this.dialog.open(ReportViewerCtrlComponent,
            {
                data: { reportid: 'mstre', modulepkcol: rowData["pkcol"], ScreenType: 3 }
            }
        );
    }

    openApplicant(rowData, modulename,) {
        this.dialog.open(dataComponent,
            {
                data: { modulename: modulename, pkvalue: rowData["pkvalue"], ScreenType: 2 }
            }
        );
    }
    opendialog1(action, rowData) {
        //debugger;
        let stredit = 'edit';
        if (rowData["noneditable"] == '1')
            stredit = 'view';
        stredit = 'view';
        //let url = "/#/workflow/" + rowData["modulename"] + "/" + rowData["modulename"] + "/"+stredit+"/" + encodeURIComponent(rowData["pkvalue"]);
        let url = "#/workflow/" + rowData["module"] + "/" + rowData["module"] + "/" + stredit + "/" + encodeURIComponent(rowData["pkvalue"]);
        // this.sharedService.alert(url);
        this.dialog.open(dataComponent,
            {
                data: { modulename: rowData["module"], pkvalue: rowData["pkvalue"], url: url, ScreenType: 2 }
            }
        );
    }
    opendialog(action, rowData) {
        this.router.navigate(["/home/" + rowData["modulename"] + "/" + rowData["modulename"] + "/edit/" + rowData["pkvalue"] + "/source/workflow/" + rowData["pk"]]);
        return;
        this.dialog.open(bodlgviewerComponent,
            {
                data: { url: "/modal/" + rowData["modulename"] + "/" + rowData["modulename"] + "/edit/" + rowData["pkvalue"] + "/workflow/" + rowData["pk"] }
            }
        ).onClose.subscribe(res => {
        });



    }

    opendialog2(action, rowData) {
        /*
        if (rowData["modulename"] == "hrmsleaverequests") {
            this.dialog.open(hrmsleaverequestComponent,
                {
                    data: { workflowid: rowData["pkcol"], leaverequestid: rowData["pkvalue"], ScreenType: 2 }
                });
        }
        else if (rowData["modulename"] == "hrmsletterrequests") {
            this.dialog.open(hrmsletterrequestComponent,
                {
                    data: { workflowid: rowData["pkcol"], lrequestid: rowData["pkvalue"], ScreenType: 2 }
                });
        }
        else if (rowData["modulename"] == "erppurchaserequests") {
            this.dialog.open(erppurchaserequestComponent,
                {
                    data: { workflowid: rowData["pkcol"], prsid: rowData["pkvalue"], ScreenType: 2 }
                });
        }
        else if (rowData["modulename"] == "umscourses") {
            this.dialog.open(umscourseComponent,
                {
                    data: { workflowid: rowData["pkcol"], courseid: rowData["pkvalue"], ScreenType: 2 }
                });
        }
        */
    }


    showFilter() {
        //debugger;
        //if (this.configdata?.showFilter == "")
        this.showfilter = !this.showfilter;
    }
    alternateview() {
        //////////debugger;
        //console.log(this.configdata['alternateview']);
        if (this.configdata['alternateview'] != null && this.configdata['alternateview'] != '') {
            this.router.navigate(['/home/boreportviewer/' + this.configdata['alternateview']]);
        }

    }
    refreshTable() {

    }
    showCheckbox() {

        //debugger;
        this.showcheckbox = !this.showcheckbox;

        if (this.treeview)
            this.selectionMode = "checkbox";
        else if (this.showcheckbox) {
            this.selectionMode = "multiple";
        }
        else
            this.selectionMode = "single";

        if (this.dt != undefined) this.dt.reset();
        if (this.dt != undefined) this.dt.toggleRowsWithCheckbox(null, false);
        if (this.showcheckbox) {
            this.selecteddata = [];
        }
        else {
            this.selecteddata = null;
        }

    }

    ngOnInit() {
        // return;
        /*
         let checkuser = localStorage.getItem('role');
         
         if (checkuser == '1') {
             this.showhideadd = true;
         } else if (checkuser == '2') {
             this.showhideadd = false;
         } else if (checkuser == '3') {
             this.showhideadd = true;
         }
         this.showhideadd = true;
         //debugger;
 
         if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
 
         this.themeService.theme.subscribe((val: string) => {
             ////debugger;
             this.theme = val;
         });
 
         if (this.ParamsChange) {
             //double
             alert('1')
 
             this.ParamsChange.subscribe(newval => {
                 //debugger;
 
                 //let el = document.getElementById("divsidefilter");
                 //el.innerHTML="";
                 this.showfilter = false;
                 this.paramid = this.reportparameterid;
                 this.Initialize(this.reportparameterid, null);
                 return;
             });
 
         }
 
 
         if (this.viewtype == "'1'") {
             //debugger;
             alert('2')
             this.contentAreaid = "reportmaincontent1";//reportmaincontent1
             ////debugger;
             this.paginator = false;
             this.paramid = this.customreportid;
             
 
             //this.paramsChange(this.customreportid);//Sundar
             //multiple firings
             this.Initialize(this.customreportid, null);
             this.showmenu = false;
 
         }
 
 
         else if (this.dialogdata != null && this.dialogdata.reportid != null && this.dialogdata.reportid != undefined) {
             this.paramid = this.dialogdata.reportid;
             this.showmenu = true;
             this.Initialize(this.paramid, null);
         }
         else {
             this.showmenu = true;
 
             if (this.reportparameterid != null) {
                 this.paramid = this.reportparameterid;
                 //multiple firings
                 // this.Initialize(this.reportparameterid, null);
 
             }
 
         }
         */
    }
    ngOnInit1() {
        ////debugger;

        this.sessiondata = this.sessionService.getSession();

        //console.log("reports");
        if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;

        if (this.dialogdata != null && this.dialogdata.reportid != null && this.dialogdata.reportid != undefined) {
            //this.data=this.dialogdata.results;
            this.treeview = true;
            this.Initialize(this.dialogdata.reportid, null);
            this.paramid = this.dialogdata.reportid;
            this.sharedService.menuid = this.dialogdata.menuid;

        }
        else {
            this.Initialize(this.currentRoute.snapshot.paramMap.get('id'), null);
            this.paramid = this.currentRoute.snapshot.paramMap.get('id');
        }
        if (this.reportparameterid != null) {
            this.Initialize(this.reportparameterid, null);
            this.paramid = this.reportparameterid;
        }
        let currTime = new Date().getTime();
        this.filters = [];
        this.filters.push({ label: 'All days', value: null });
        this.filters.push({ label: 'Last 1 day', value: [this.createFilterDate(currTime)] });
        this.filters.push({ label: 'Last 7 days', value: Array(...new Array(7)).map((item, index) => this.createFilterDate(currTime - index * 1000 * 60 * 60 * 24)) });
        this.filters.push({ label: 'Last 20 days', value: Array(...new Array(20)).map((item, index) => this.createFilterDate(currTime - index * 1000 * 60 * 60 * 24)) });


    }
    async Initialize(initalizeid, status1) {
        //debugger;
        this.theme = this.sessionService.getItem("selected-theme");
        if (this.dt != undefined) this.dt.reset();
        if (this.dt1 != undefined) this.dt1.reset();
        this.savedviews = [];
        this.bsameform = false;

        this.theme = this.sessionService.getItem("selected-theme");

        if (initalizeid == "193") {
            this.bsameform = true;
        }
        /*
        if (this.customreportid != null && this.customreportid != undefined && this.customreportid != "") {
            initalizeid = this.customreportid;
        }
        */
        //////////debugger;
        //let status = "'A'";
        let status = "all";
        if (status1 != "" && status1 != null) status = status1;
        this.showtype = status;
        this.data = [];
        this.data2 = [];
        this.selecteditems = [];
        ////////////debugger;






        if (this.sharedService.menuid == undefined && this.currentRoute.snapshot.paramMap.get('id')) {
            let id = this.currentRoute.snapshot.paramMap.get('id');
            //sharedService.menuid =this.getmenuid(id);
            //this.pmenuid = sharedService.menuid;
            // if (this.customreportid != null && this.customreportid != undefined && this.customreportid != "") id = this.customreportid;
            if ((this.currentRoute.component as any).name?.toLowerCase() == "boreportviewercomponent") {
                let res = await this.menumasterservice.getListBy_menuurl(id);
                //console.log(res);
                //this.sharedService.alert("res ");
                if ((res as any).length > 0) {
                    this.sharedService.menuid = (res as any)[0].menuid;
                    this.sharedService.menucode = (res as any)[0].menucode;
                    this.pmenuid = this.sharedService.menuid;
                    this.pmenucode = this.sharedService.menucode;
                }
            }
        }
        else {
            //console.log("report" + this.sharedService.menuid);
            this.pmenuid = this.sharedService.menuid;
            this.pmenucode = this.sharedService.menucode;
        }

        if (this.sharedService != undefined) this.pmenuid = this.sharedService.menuid;
        if (this.sharedService != undefined) this.pmenucode = this.sharedService.menucode;
        /*
                if (this.custommenuid != null && this.custommenuid != undefined && this.custommenuid != "") {
                    this.pmenuid = this.custommenuid;
                    if (this.param != undefined) this.additionaldata = this.sharedService.JSON_parse('{ "' + this.param + '":"' + this.value + '"}');
                    this.dialogdata = {};
                    // this.dialogdata = new HttpParams().set(this.param, this.value.value.toString())
        
                }
                */

        if (this.param != undefined) this.additionaldata = this.sharedService.JSON_parse('{ "' + this.param + '":"' + this.value + '"}');
        this.dialogdata = {};

        //console.log("menuid");
        //console.log(this.pmenuid);
        //console.log("menuid1");
        //debugger;





        //2

        this.boreportservice.get_boreports_List().then((data) => {
            this.reportlist = data;
        });

        //this.sharedService.alert("this.pmenuid "+this.pmenuid);


        this.reportcode = initalizeid;
        //bomenumasterservice
        ////debugger;
        //if(this.pmenuid==undefined)setTimeout(() => {}, 2000);
        //console.log(initalizeid);
        //console.log(this.pmenuid);

        /*
                this.fkname = "";
                this.fk = "";
                this.fkname1 = "";
                this.fk1 = "";
        */
        this.boreportviewerservice.fkname = this.fkname?.split('#')[0];
        this.boreportviewerservice.fk = this.fk;
        this.boreportviewerservice.fkname1 = this.fkname1?.split('#')[0];
        this.boreportviewerservice.fk1 = this.fk1;

        if (this.currentRoute.snapshot.paramMap.get('fkname') != null && this.currentRoute.snapshot.paramMap.get('fk') != null) {
            this.fkname = this.currentRoute.snapshot.paramMap.get('fkname');
            this.fk = this.currentRoute.snapshot.paramMap.get('fk');
            this.boreportviewerservice.fkname = this.fkname?.split('#')[0];
            this.boreportviewerservice.fk = this.fk;
        }

        if (this.currentRoute.snapshot.paramMap.get('fkname1') != null && this.currentRoute.snapshot.paramMap.get('fk1') != null) {
            this.fkname1 = this.currentRoute.snapshot.paramMap.get('fkname1');
            this.fk1 = this.currentRoute.snapshot.paramMap.get('fk1');

            this.boreportviewerservice.fkname1 = this.fkname1?.split('#')[0];
            this.boreportviewerservice.fk1 = this.fk1;
        }

        if (this.currentRoute.snapshot.paramMap.get('modulename') != null) {

            this.modulename = this.currentRoute.snapshot.paramMap.get('modulename');

        }
        if (this.currentRoute.snapshot.paramMap.get('modulepkcol') != null) {

            this.modulepkcol = decodeURIComponent(this.currentRoute.snapshot.paramMap.get('modulepkcol'));

        }
        if (this.dialogdata != null && this.dialogdata.reportid != null) {
            this.modulepkcol = this.dialogdata.modulepkcol;
        }

        ////debugger;

        this.FillCustomField(this.reportcode);
        this.data = [];
        this.blockedDocument = true;

        if (this.viewtype == "'1'") {
            this.showmenu = false;
        }
        else {
            this.showmenu = true;
        }
        if (this.configdata?.recordtype != '' && this.configdata?.recordtype != null) this.dialogdata["recordtype"] = this.configdata?.recordtype;
        //this.fkname, this.fk, this.fkname1, this.fk1,
        this.boreportviewerservice.getBOReportResultsByID(this.reportcode, status, this.dialogdata, this.additionaldata, null, this.modulename, this.modulepkcol).then((res: any) => {
            debugger;
            this.blockedDocument = false;
            this.reportid = res.boreport.reportid;
            this.configdata = res.boreport;
            let filters = this.configdata?.filters;
            this.sessionService.setViewHtml(this.configdata?.viewhtml);
            this.savedviews = [];
            if (filters != null && filters != undefined) {
                let flds = this.sharedService.JSON_parse(filters);
                if (flds != null && flds != "") {
                    for (let i = 0; i < flds.length; i++) {
                        this.savedviews.push(this.sharedService.JSON_parse(flds[i]).view);
                    }
                }
            }
            this.kanbanview = this.configdata?.kanbanview;
            this.kanbankey = this.configdata?.kanbankey;

            this.statusdata = res.statusdata;
            //console.log(this.statusdata);
            if (this.configdata?.dashboardid && this.configdata?.dashboardid != null) this.dashboardid = this.configdata?.dashboardid;

            this.cardtype = false;
            if (this.configdata?.cardtype == true) this.cardtype = true;



            this.menumasterdata = res.bomenumaster;
            this.pmenuid = this.menumasterdata?.menuid;
            this.sharedService.menuid = this.pmenuid;
            this.pmenucode = this.menumasterdata?.menucode;

            if (this.menumasterdata?.showstatus != "" && this.menumasterdata?.showstatus != null && status1 != "" && (status1 == null || status1 == "")) status = this.menumasterdata?.showstatus;

            this.menuactions = [];
            this.canadd = true;
            this.canedit = true;
            this.candelete = true;

            //console.log(this.menuactions)

            var objmenuaction = {
                actionicon: "fa fa-eye",
                actionid: "-4006",
                //actionname: "sptbldeleterecord",
                actiontype: "S",
                description: "View",
                menuid: this.pmenuid,
                rowselecttype: "S",
                rowselecttypedesc: "Single",
                servicename: ""
            };
            var objviewaction = objmenuaction;
            this.menuactions?.push(objmenuaction);

            var objmenuaction = {
                actionicon: "fa fa-edit",
                actionid: "-4002",
                //actionname: "sptbldeleterecord",
                actiontype: "S",
                description: "Edit",
                menuid: this.pmenuid,
                rowselecttype: "S",
                rowselecttypedesc: "Single",
                servicename: ""
            };
            var objeditaction = objmenuaction;
            if (this.canedit) this.menuactions?.push(objmenuaction);

            var objmenuaction = {
                actionicon: "fa fa-trash",
                actionid: "-4000",
                //actionname: "sptbldeleterecord",
                actiontype: "P",
                description: "Delete",
                menuid: this.pmenuid,
                rowselecttype: "M",
                rowselecttypedesc: "Multiple",
                servicename: ""
            };
            var objdeleteaction = objmenuaction;

            if (this.candelete) this.menuactions?.push(objmenuaction);


            if (this.menuactions != null) {
                if (this.menuactions?.length == 0)
                    this.checkboxavailable = false;
                else
                    this.checkboxavailable = true;
            }

            console.log(this.menuactions)

            if (res.bomenuactions != null && res.bomenuactions != undefined) this.menuactions = this.menuactions?.concat(res.bomenuactions);
            ////////////debugger;
            //console.log(this.menuactions);
            //debugger;
            if (this.menumasterdata?.nonew) this.canadd = false;
            if (this.menumasterdata?.noedit) this.canedit = false;
            if (this.menumasterdata?.nodelete) this.candelete = false;
            this.menuitems = [];

            if (this.viewtype == "'1'") {
                this.showmenu = false;
                this.menuitems = [];
            }
            else {
                this.showmenu = true;
                /*
                if (this.canedit)
                {
                this.menuitems.push({
                    label:'Edit',
                    command: () => this.context_menuactions(objeditaction),
                    icon:'pi pi-fw pi-pencil'
                 })
                }
                if (this.candelete)
                {
                this.menuitems.push({
                    label:'Delete',
                    command: () => this.context_menuactions(objdeleteaction),
                    icon:'pi pi-fw pi-trash'
                 })
                }
                 */
            }
            //dialog_menuactions

            /* this.menuitems.push({
                 label:'View',
                 command: () => this.context_menuactions(objviewaction),
                 icon:'pi pi-fw pi-eye'
              })
              */

            if (this.viewtype == "'1'") {

                this.menuactions.forEach((menu: any) => {
                    let obj = {
                        label: menu.description,
                        command: () => this.dialog_menuactions(menu),
                        icon: 'pi pi-fw pi-pencil'
                    };
                    this.menuitems.push(obj);
                });
            }
            else {
                this.menuactions.forEach((menu: any) => {
                    let obj = {
                        label: menu.description,
                        command: () => this.context_menuactions(menu),
                        icon: 'pi pi-fw pi-pencil'
                    };
                    this.menuitems.push(obj);
                });
            }
            //console.log(this.menuitems);



            /*
                        objmenuaction = {
                            actionicon: "fa fa-check",
                            actionid: "-4001",
                            //actionname: "sptbldeleterecordactive",
                            actiontype: "P",
                            description: "UnDelete",
                            menuid: this.pmenuid,
                            rowselecttype: "M",
                            rowselecttypedesc: "Multiple",
                            servicename: ""
                        };
            
                        this.menuactions?.push(objmenuaction);
            */
            //debugger;
            this.showcheckbox = this.menumasterdata?.showcheckbox;


            if (this.showcheckbox) this.selecteddata = [];

            if (this.showcheckbox) {
                this.selectionMode = "multiple";
            }
            else
                this.selectionMode = "single";



            if (this.menumasterdata && this.menumasterdata?.showcheckbox && !this.checkboxavailable && this.configdata?.groupby != null && this.configdata?.groupby != "") this.showgroupcheckbox = true;

            if (this.menumasterdata && this.menumasterdata?.showcheckbox && this.checkboxavailable && this.configdata?.groupby != null && this.configdata?.groupby != "" && this.menuactions[0].rowselecttype == "S") this.showgroupcheckbox = true;

            if (this.configdata?.maintablename == "boreports") {
                this.masterkey = "reportid";
            }
            else {
                this.masterkey = (this.configdata?.pk == "" || this.configdata?.pk == undefined) ? this.configdata?.maintableidentityfield : "pkcol";//this.configdata?.maintableidentityfield;
            }

            //console.log("masterkey " + this.masterkey);
            //console.log(this.configdata);
            if (this.configdata != '' && this.configdata != null && this.configdata?.html == null) this.configdata.html = "";
            if (this.configdata != undefined && this.configdata?.html != undefined) this.configdata.html = this.configdata?.html.replace(/(?:\r\n|\r|\n)/g, '');

            if (this.configdata?.detailtableheader != undefined && this.configdata?.detailtableheader == null) this.configdata.detailtableheader = "";
            if (this.configdata != undefined && this.configdata?.detailtableheader != undefined) this.configdata.detailtableheader = this.configdata?.detailtableheader.replace(/(?:\r\n|\r|\n)/g, '');

            if (this.configdata?.detailtablefooter == null && this.configdata?.detailtablefooter != undefined) this.configdata.detailtablefooter = "";
            if (this.configdata?.detailtablefooter != undefined) this.configdata.detailtablefooter = this.configdata?.detailtablefooter.replace(/(?:\r\n|\r|\n)/g, '');
            this.outputtype = 'list';
            if (this.configdata?.html != undefined && this.configdata?.html != "") this.outputtype = 'html';

            this.detailtableheader = this.configdata?.detailtableheader;
            this.detailtablefooter = this.configdata?.detailtablefooter;


            this.reportheader = res.boreport.reportname;
            if (this.sharedService.getMobileResolution()) {
                this.cols = [];
                res.boreportcolumns.slice(1, 3).map((item, i) => {
                    this.cols.push(Object.assign({}, item));
                });
            }
            else
                this.cols = res.boreportcolumns;

            debugger;
            console.log(this.cols)
            if (this.cols != undefined) {
                for (let i = 0; i < this.cols.length; i++) {
                    //let s=this.cols[i].header;
                    //this.cols[i].header=this.cols[i].header.trim();
                    //this.cols[i].header=s.charAt(0).toUpperCase() + s.slice(1);
                    Object.defineProperty(this.cols[i], "val", { value: null, writable: true });
                    Object.defineProperty(this.cols[i], "sum", { value: 0, writable: true });
                    Object.defineProperty(this.cols[i], "sort", { value: true, writable: true });
                    Object.defineProperty(this.cols[i], "filter", { value: true, writable: true });

                }
            }
            console.log(this.cols);
            if (this.fkname != '' && this.fkname != undefined && this.fkname != null) {
                this.scrollheight = "400px";
                this.style = "{width:'100%';max-height:'400px'}";
                this.rowsdisplay = 20;
            }
            else {
                this.scrollheight = "450px";
                this.style = "{width:'100%';max-height:'450px'}";
                this.rowsdisplay = 20;
            }

            if (this.customreportid != null && this.customreportid != undefined && this.customreportid != "") {
                this.rowsdisplay = 5;
            }
            this.rowsdisplay = (res.boreport.numrows == null || res.boreport.numrows == "" || res.boreport.numrows == "0") ? this.rowsdisplay : res.boreport.numrows;
            this.hrowsdisplay = this.rowsdisplay;
            this.growsdisplay = this.rowsdisplay;
            if (this.cols != undefined) {
                this.cols.forEach((col: any) => {

                    if (col.sum == true || col.count == true) {
                        let obj = { colname: col.field, sumcondition: (col.sumcondition == null ? "" : col.sumcondition), countcondition: (col.countcondition == null ? "" : col.countcondition) };
                        this.sumcolnames.push(obj);
                    }
                });
                for (let i = 0; i < this.cols.length; i++) {
                    let s = this.cols[i].field;
                    if (s?.toLowerCase() == this.configdata?.maintableidentityfield?.toLowerCase() || s?.toLowerCase() == this.configdata?.pk?.toLowerCase() || s?.toLowerCase() == this.fkname?.toLowerCase() || s?.toLowerCase() == "pk" || s == "pkcol" || s == "companyid" || s == "createdby" && s != "updatedby" && s != "createddate" || s == "updateddate" || s == "customfield" || s == "attachment") this.cols[i].hide = true;

                    this.cols[i].filterMatchMode = "contains";
                    if (this.cols[i].datatype == "date") {
                        ////////////debugger;
                        this.cols[i].min = this.getMin(this.cols[i].field, this.cols[i].datatype); //new Date(1980, 6, 31).getTime();
                        this.cols[i].max = this.getMax(this.cols[i].field, this.cols[i].datatype); //new Date(2050, 6, 31).getTime();
                        this.cols[i].val = this.cols[i].min;
                    }
                    if (this.cols[i].datatype == "number") {
                        ////////////debugger;
                        this.cols[i].min = this.getMin(this.cols[i].field, this.cols[i].datatype);//new Date(1980, 6, 31).getTime();
                        this.cols[i].max = this.getMax(this.cols[i].field, this.cols[i].datatype);//new Date(2050, 6, 31).getTime();
                        this.cols[i].val = this.cols[i].min;
                    }
                }
            }

            this.data = res.results?.Rows;
            //this.sharedService.alert(this.data.length);
            // if (this.data?.length == 0) this.sharedService.alert('No Records Found');
            //console.log(this.data);
            if (this.data?.length > 0) {
                if (this.data[0].header1results != undefined && this.data[0].header1results.length > 0) {
                    let obj = this.data[0].header1results[0];
                    for (var property in obj) {
                        let s = property;
                        if (s?.toLowerCase() != this.configdata?.pk && s?.toLowerCase() != this.fkname && s != "pk" && s != "pkcol" && s != "companyid" && s != "createdby" && s != "updatedby" && s != "createddate" && s != "updateddate" && s != "customfield" && s != "attachment") this.header1cols.push({ field: property, columnheader: property, header: (s.charAt(0).toUpperCase() + s.slice(1)) });
                    }
                }
                if (this.sequence != "") {
                    for (let s = 0; s < this.data?.length; s++) {
                        let obj = { pk: this.data[s].pk, sequence: this.data[s].sequence, change: false }
                        this.tbl_reorder.push(obj);
                    }
                }
            }

            if (this.cols?.length == 0) {
                if (this.data.length > 0) {
                    let obj = this.data[0];
                    for (var property in obj) {
                        let s = property;


                        if (s?.toLowerCase() != this.configdata?.maintableidentityfield?.toLowerCase() && s?.toLowerCase() != this.configdata?.pk?.toLowerCase() && s?.toLowerCase() != this.fkname?.toLowerCase() && s?.toLowerCase() != "pk" && s != "pkcol" && s != "companyid" && s != "createdby" && s != "updatedby" && s != "createddate" && s != "updateddate" && s != "customfield" && s != "attachment") this.cols.push({ field: property, columnheader: property, header: (s.charAt(0).toUpperCase() + s.slice(1)) });

                    }
                }
            }



            this.groupfield = this.configdata?.groupby;
            this.groupfieldtext = (this.configdata?.groupbytext == null ? "" : this.configdata?.groupbytext.replace(/(?:\r\n|\r|\n)/g, ''));
            //alert(this.groupfieldtext)
            if (this.groupfield == null) this.groupfield = "";
            debugger;
            if (this.groupfield != "") {
                this.sortField = this.groupfield;
                this.sortMode = 'single';
                this.rowGroupMode = 'subheader';
                this.groupRowsBy = this.groupfield;
                this.paginator = false;
            }
            else if (this.configdata?.sortby1 != "" && this.configdata?.sortby1 != null && this.configdata?.sortby1 != undefined) {
                this.sortField = this.configdata?.sortby1;
                this.sortMode = 'single';
            }
            else if (this.configdata?.pk != undefined) {
                let cols_shows = this.cols.filter(obj => { return (obj.hide == null || obj.hide == false); });
                if (cols_shows.length > 0) this.sortField = cols_shows[0].field;
                this.sortMode = 'single';
            }
            else {
                this.sortField = "";
                this.sortMode = '';
            }
            // console.log(this.cols)
            // console.log(this.cols.filter(obj => {return (obj.hide==null || obj.hide == false);}))
            //console.log(this.configdata);
            this.treeview = false;
            this.parentid = this.configdata?.parentid;
            this.parentdescription = this.configdata?.parentdescription;

            //this.groupfield != "" || 
            if ((this.configdata?.parentid != "" && this.configdata?.parentid != null))
                this.treeview = true; //TREEVIEW
            //////////debugger;   
            //   this.treeview=false;
            if (this.treeview) {
                //////////debugger;
                if (this.configdata?.parentid != "" && this.configdata?.parentid != null) {

                    this.data = this.convert(this.data, this.configdata?.parentid);
                    this.selectionMode = "checkbox";
                    console.log(this.data)
                }
                else if (this.groupfield != "") {
                    //this.data = this.convert1(this.data, this.groupfield);
                    this.selectionMode = "none";
                }

                //this.sharedService.alert(this.selectionMode);

            }

            ////////////debugger;

            this.showfilter = false;


            //this.showSideFilter();
            if (this.configdata?.sidefilters != null && this.configdata?.sidefilters != undefined) {
                this.filtercols = this.configdata?.sidefilters.split(",").map(function (item) {
                    return item?.toLowerCase().trim();
                });
            }
            this.blockedDocument = false;
            //console.log('data');
            //console.log(this.data);
        }).catch((err) => {
            this.blockedDocument = false;
            //console.log(err);
            this.toastr.addSingle("error", "", err);
        });;



        let group: number = 0;










        //if (this.scrollbarRef != undefined) this.scrollbarRef.scrollToTop().subscribe();
        ////console.log(this.scrollbarRef);




    }

    condition(action, rowData) {
        ////debugger;
        var ret = true;
        let conditiontext = action.actioncondition;
        if (conditiontext != null && conditiontext != undefined) {
            let status = rowData.status;
            let SESSIONUSERID;
            let SESSIONUSERTYPE;
            if (this.sessiondata != null) {
                SESSIONUSERID = this.sessiondata.userid;
                SESSIONUSERTYPE = this.sessiondata.usertype;
            }
            ret = eval(conditiontext);
        }
        return ret;

    }

    List() {
        this.outputtype = 'list';
        this.css = "";
        this.html = "";
        this.groupfieldtext = this.configdata?.groupbytext;
        this.detailtableheader = this.configdata?.detailtableheader;
        this.detailtablefooter = this.configdata?.detailtablefooter;
    }
    card() {
        /*
        this.outputtype='html';
        this.css = '';
        this.html = '';
        this.groupfieldtext='';
        this.detailtableheader='';
        this.detailtablefooter='';
        */
        this.outputtype = 'html';
        this.css = this.configdata?.css;
        this.html = this.configdata?.html;
        //console.log(this.html);

        if (this.css != null && this.css != "") {
            setTimeout(() => {
                const s = this.document.createElement('style');
                s.innerHTML = this.css;
                this.elementRef.nativeElement.appendChild(s);
            }, 300);
        }
    }
    getData(itemcol, rowData, fieldname) {
        let ret;
        if (itemcol?.datatype == 'date') {
            ret = this.datePipe.transform(rowData[fieldname], 'dd/MMM/YYYY');
        }
        else
            ret = rowData[fieldname];
        return ret;
    }
    ExecuteAction() {

        let val = this.action;
        this.onChangeAction(val);
    }
    onChangeFilterType(val) {
        if (val == 'FF')
            this.showfilter = true;
        else
            this.showfilter = false;
        if (this.configdata != undefined) this.configdata.sidefiltertype = val;

    }
    onChangerecordtype(val) {
        debugger;
        if (this.configdata != undefined) this.configdata.recordtype = val;
        this.Initialize(this.reportcode, null);

    }
    async FillCustomField(reportcode) {
        //debugger;
        return this.customfieldservice.getcustomfieldconfigurationsByTable(reportcode, this.CustomFormName, "", "", this.customfieldjson).then(res => {
            this.customfieldservicelist = res;
            if (this.customfieldservicelist != undefined) this.customfieldvisible = (this.customfieldservicelist.fields.length > 0) ? true : false;
            return res;
        });


    }

    onChangeAction(val) {
        //debugger;
        if (val == "") return;
        if (this.menuactions != null) {
            for (let i = 0; i < this.menuactions?.length; i++) {
                if (this.menuactions[i].actionid == val) {
                    this.processaction(this.menuactions[i]);
                }
            }
        }
        if (val == "Add") {
            this.route('create');
        }
        else if (val == "Edit") {
            this.route('edit');
        }
        else if (val == "ShowCheckbox") {
            //this.dt.reset();
            this.showCheckbox();
        }
        else if (val == "BulkEdit") {
            this.BulkEdit();
        }
        else if (val == "Upload") {
            this.UploadData();
        }
        else if (val == "Print") {
            this.print();
        }
        else if (val == "Export") {
            this.export();
        }
        else if (val == "List") {
            this.List();
        }
        else if (val == "AlternateView") {
            this.alternateview();
        }
        else if (val == "ShowAll") {
            this.showAll();
        }
        else if (val == "Filter") {
            this.showFilter();
        }
        else if (val == "SideFilter") {
            this.showSideFilter();
        }
        else if (val == "ClearFilter") {
            this.clearFilter();
        }
        else if (val == "Email") {
            this.email();
        }
    }
    async onDelete(): Promise<any> {
        debugger;
        if ((this.selecteddata.length > 1 || this.selecteddata.length < 1)) {
            this.sharedService.alert("Select a record");
            return;
        }


        if (confirm('Are you sure to delete this record ?')) {
            //let res=await this.legalcustomermaster_service.delete_legalcustomermaster(customerid);
            let res = await this.boreportviewerservice.delete(this.configdata?.reportcode, this.selecteddata.pk);
            debugger;
            this.dialog_menuactions({ description: "Delete" })
            this.toastr.addSingle("success", "", "Successfully Deleted");
            return new Promise(resolve => {
                resolve(true);
            });
        }

    }

    card1() {
        this.outputtype = 'table';
        this.css = '';
        this.html = '';
        this.groupfieldtext = '';
        this.detailtableheader = '';
        this.detailtablefooter = '';
    }

    getSelectionMode() {
        if (this.treeview) return "checkbox";
        else if (this.showcheckbox) return "multiple";
        else return "single";
    }
    getmin(field) {
        return 0
    }
    getmax(field) {
        ////debugger;
        let max = 0;
        let items = this.data.map(item => item[field])
            .filter((value, index, self) => self.indexOf(value) === index);
        ////debugger;
        //let allitems = items.filter(item => item != null);
        max = Math.max.apply(null, items);
        return max;

    }
    onDateSelect($event, field) {
        ////debugger;
        //console.log(this.dateFilters);
        const eventDate = this.formatDate($event);

        if (this.dateRangeStart === undefined) {
            this.dateRangeStart = eventDate;
        } else if (moment($event).isBefore(this.dateRangeStart)) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else if (moment($event).isSame(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd === undefined) {
            this.dateRangeEnd = eventDate;
        } else if (moment($event).isSame(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else if (moment($event).isAfter(this.dateRangeStart) && this.dateRangeStart !== undefined && this.dateRangeEnd !== undefined) {
            this.dateRangeStart = eventDate;
            this.dateRangeEnd = undefined;
        } else {
            this.dateRangeEnd = eventDate;
        }

        this.dt.filter(eventDate, field, 'customCreatedDateFilter');
    }
    onDateClear($event) {
        this.dateRangeStart = undefined;
        this.dateRangeEnd = undefined;
        this.dt.filter('', 'createdDate', 'equals');
    }

    getfilterdata(obj) {
        console.log(obj)
    }

    formatDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }
        return date.getFullYear() + '-' + month + '-' + day;
    }

    customCreatedDateArrayFilter(event) {
        this.dt.filter(event, 'createdDate', 'customCreatedDateFilter');
    }
    filter(datatype, field) {
        //debugger;
        //console.log(this.dt.filters);
        /*
        //debugger;
        if(datatype=='n')
        {
            //if(this.dt.filters[field])delete this.dt.filters[field];
            this.dt.filters[field] = { value: 50000, matchMode: 'equals' };
            
           // this.dt.filter(0, field, 'gt');
            // this.filters[field] = { value: value, matchMode: matchMode }
            //this.dt.reset();
            this.dt.executeLocalFilter(field, this.data, this.dt.filters);
            this.dt.filter(50, field, 'notEquals');
        }
        */
    }
    getdropdownItems(field) {
        // //debugger;
        let items = this.data.map(item => item[field])
            .filter((value, index, self) => self.indexOf(value) === index);
        ////debugger;
        let allitems = items.filter(item => item != null);
        let dpitems = allitems.map(item =>
        ({

            label: this.getText(item),
            value: item
        }));
        dpitems.splice(0, 0, { label: "", value: "" });
        return dpitems;
    }

    getText(html: any) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    GetDetailHeader() {

        let ret = "";
        //    //console.log(this.detailheadertext);
        if (this.detailtableheader != null && this.detailtableheader != '') {
            ret = this.detailtableheader;

        }

        //    //console.log(ret);
        return ret;
    }
    GetDetailFooterLast() {
        ////////debugger;
        this.htmltouch = 0;
        let ret = "";
        let rowData = null;
        if (this.PrevGroupData == null || this.PrevGroupData == "") return "";
        if (this.PrevGroupData != "") rowData = this.PrevGroupData;
        // //console.log(rowData);
        // //console.log(this.detailfootertext);
        if (this.detailtablefooter != null && this.detailtablefooter != '' && rowData != null && rowData != "") {
            ret = this.detailtablefooter;
            this.cols.forEach((col: any) => {
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }

        // //console.log(ret);
        return ret;
    }
    GetDetailFooter() {
        ////////debugger;
        let ret = "";
        let rowData = null;
        if (this.PrevGroupData == null || this.PrevGroupData == "" || this.htmltouch != 1) return "";
        if (this.PrevGroupData != "") rowData = this.PrevGroupData;
        // //console.log(rowData);
        // //console.log(this.detailfootertext);
        if (this.detailtablefooter != null && this.detailtablefooter != '' && rowData != null && rowData != "") {
            ret = this.detailtablefooter;
            this.cols.forEach((col: any) => {
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }

        // //console.log(ret);
        return ret;
    }
    GetValue(rowData, field, tagname) {
        //debugger;
        let ret = field;
        if (ret == undefined) ret = "";
        if (ret != "") {
            if (field != undefined && rowData != undefined) {


                this.cols.forEach((col: any) => {
                    let val = rowData[col.field];
                    if (val == null || val == undefined) val = '';
                    ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                    ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
                });

            }
            if (this.groupfield != "" && tagname == "group") {
                // //debugger;
                let cnt = 0;

                if (this.data) {
                    for (let obj of this.data) {
                        if (obj[this.groupfield] === rowData[this.groupfield]) {
                            cnt++;
                        }
                    }
                }

                ret = ret.replace(new RegExp('##groupcount##', 'g'), cnt);

                this.cols.forEach((col: any) => {
                    if (col['datatype'] == 'n') {
                        let sum = 0;
                        for (let obj of this.data) {
                            let val = obj[col.field];
                            sum += val ?? 0;
                        }
                        ret = ret.replace(new RegExp('##grouptotal_' + col.field + '##', 'g'), sum);
                    }

                });

                ////debugger;
                /*
                var _in = document.getElementById(tagname);
                var scriptNode = document.createElement('script');
                scriptNode.innerHTML = ret;
                _in.appendChild(scriptNode);
                */
            }
            if (tagname == "footer") {
                // //debugger;
                let cnt = 0;
                cnt = this.data.length;
                if (this.data) {
                    cnt = this.data.length;

                    this.cols.forEach((col: any) => {
                        if (col['datatype'] == 'n') {
                            let sum = 0;
                            for (let obj of this.data) {
                                let val = obj[col.field];
                                sum += val ?? 0;
                            }
                            ret = ret.replace(new RegExp('##footertotal_' + col.field + '##', 'g'), sum);
                        }

                    });


                }

                ret = ret.replace(new RegExp('##footercount##', 'g'), cnt);

            }
            ////debugger;
            return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
        }
        return "";
        //return ret;
    }
    PushFooter(rowData) {
        ////////debugger;
        let ret = "";
        // //console.log(rowData);
        // //console.log(this.detailfootertext);
        if (this.detailtablefooter != null && this.detailtablefooter != '' && rowData != null && rowData != "") {
            ret = this.detailtablefooter;
            this.cols.forEach((col: any) => {
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }

        // //console.log(ret);
        return ret;
    }

    GetGroupByText(rowData) {
        //debugger;
        this.htmltouch = 0;
        let ret = "";
        if (this.parentid != "" && this.parentid != null) {
            if (this.parentdescription != null && this.parentdescription != '')
            //ret = eval(this.parentdescription);
            {
                ret = (this.parentdescription);
                this.cols.forEach((col: any) => {
                    let val = rowData[col.field];
                    if (val == null || val == undefined) val = '';
                    ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                    ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
                });
            }
            else
                ret = this.parentid;
        }
        else {
            this.PrevGroupData = rowData;
            if (this.groupfieldtext != null && this.groupfieldtext != '') {
                ret = (this.groupfieldtext);
                this.cols.forEach((col: any) => {
                    let val = rowData[col.field];
                    if (val == null || val == undefined) val = '';
                    ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                    ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
                });
            }
            else
                ret = this.groupfield;
        }



        return ret;
    }
    onNumChange(event, dt, col, datatype) {
        //////////debugger;
        if (this.numtimeout) {
            clearTimeout(this.numtimeout);
        }

        this.numtimeout = setTimeout(() => {
            // //////////debugger;
            if (datatype == "date") {
                //console.log(new Date(col));
                //console.log(new Date(event.value));

                dt.filter(new Date(event.value), col, 'gt');

            }
            else {
                dt.filter(event.value, col, 'gt');
            }

        }, 250);

    }


    onPageChange(event) {


    }

    GetColHeading(colname) {
        /*
                let col= (this.cols.find(c => c.field == colname));
                if (col!=undefined)   return col.header;
                return "";
        */
        for (let i = 0; i < this.cols.length; i++) {
            let col = this.cols[i];
            if (col.field == colname) {
                return col.header;
            }
        }

    }




    clearFilter() {
        //debugger;
        this.dt.filters = {};
        this.dt.reset();
        this.showfilter = false;
    }
    showSideFilter() {
        //debugger;
        if (this.configdata?.sidefilter == "") return;
        this.showfilter = true;
        let el = document.getElementById("divsidefilter");
        el.innerHTML = "";
        setTimeout(() => {

            el.style.display = "display:block!important";
            let rowfilter = document.getElementById("divsidefilter");

            rowfilter.appendChild(document.getElementById("dsidefilter"));


            this.showfilter = false;

        }, 1000);
    }

    getColName(title: string) {


        for (let i = 0; i < this.cols.length; i++) {
            let col = this.cols[i];
            if (col.header != null && col.header?.toLowerCase().replace(/\s/g, '').trim() == title.replace(/\s/g, '')) {
                return col.field;
            }
        }
        //debugger;
        return "";
    }
    export(): void {
        this.dt.exportCSV();
    }




    json2table(json) {
        var cols = Object.keys(json[0]);

        var headerRow = '';
        var bodyRows = '';



        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        cols.map(function (col) {
            headerRow += '<th style="background-color: #628DB6;color:white">' + capitalizeFirstLetter(col) + '</th>';
        });

        json.map(function (row) {
            bodyRows += '<tr>';

            cols.map(function (colName) {
                let strdata = "";
                if (row[colName] != null && row[colName] != undefined) strdata = row[colName];

                bodyRows += '<td>' + strdata + '</td>';
            })

            bodyRows += '</tr>';
        });

        return '<table><thead><tr>' +
            headerRow +
            '</tr></thead><tbody>' +
            bodyRows +
            '</tbody></table>';
    }
    email() {
        ////debugger;
        this.boreportviewerservice.runemail(this.pmenuid, this.json2table(this.data)).then((res: any) => {
            this.sharedService.alert("successfully sent email");
        });
    }
    getReportHtml(rowData) {
        let ret = "";
        /*if (this.outputtype == "html" && this.configdata?.html != "") {
            ////console.log(this.configdata?.html)
            ret = eval(this.configdata?.html);
            ////console.log(ret);
        }*/
        if (this.outputtype == "html" && this.configdata?.html != "") {
            ret = this.configdata?.html;
            this.cols.forEach((col: any) => {
                let val = rowData[col.field];
                if (val == null || val == undefined) val = '';
                ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
                ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
            });
        }
        //if(this.cardtype)ret+="<div role='button' onclick='viewroute()'><i  onclick='viewroute()' class='fa fa-eye' aria-hidden='true'></i></div>";
        //if(this.cardtype)ret+="<button></button>"
        return ret;
    }
    print(): void {
        ////debugger;
        let printContents, popupWin;
        let rowData = this.selecteddata;
        if (this.selecteddata == null) {
            if (this.configdata?.reporthtml != "" && this.configdata?.reporthtml != null) {
                for (let i = 0; i < this.data.length; i++) {
                    let rowData = this.data[i];
                    printContents += "<br>" + this.getReportHtml(rowData);
                }
            }
            else if (this.outputtype == "html" && this.configdata?.html != "") {
                for (let i = 0; i < this.data.length; i++) {
                    let rowData = this.data[i];
                    printContents += "<br>" + this.getHtml(rowData);
                }
            }
            else {
                printContents = this.json2table(this.data);
                ////console.log(printContents);
            }
        }
        else {
            if (this.configdata?.reporthtml != "") {
                printContents = this.getReportHtml(rowData);
            }
            else if (this.outputtype == "html" && this.configdata?.html != "") {
                printContents = this.getHtml(rowData);
            }
            else {
                printContents = this.json2table(this.data);
                ////console.log(printContents);
            }
        }
        //printContents = eval(this.configdata?.reporthtml);;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        let css = '';
        if (this.configdata?.css != null) css = this.configdata?.css;
        popupWin.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
              </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        //  popupWin.document.close();
    }


    moreclick(rowIndex) {
        //  //debugger;
        // $(".moredrop").remove();
        // $(".more.open").removeClass("open");
        // $(this).addClass("open");

        ////console.log(document.all['divrow'+rowIndex]);

        //document.all['divrow'+rowIndex].innerHTML="<div class='moredrop'><ul><li><i class='material-icons'>edit</i><span class='label'>Edit</span></li><li (click)='bgclick()'><i class='material-icons'>delete</i><span class='label'>Delete</span></li><li><i class='material-icons'>delete</i><span class='label'>Cancel</span></li></ul></div>";
        var Elements = document.getElementsByClassName("moredrop");
        var Divs = Array.prototype.filter.call(Elements, function (Element) {
            return Element.style = 'display:none';
        });
        document.all['divrow' + rowIndex].style = 'display:block';
        //console.log(document.all['divrow' + rowIndex]);
        return false;
        //"<div class='moredrop'><ul><li><i class='material-icons'>edit</i><span class='label'>Edit</span></li><li><i class='material-icons'>delete</i><span class='label'>Delete</span></li></ul></div>"
        /*
  
        */
    }
    bgclick(rowIndex) {
        var Elements = document.getElementsByClassName("moredrop");
        var Divs = Array.prototype.filter.call(Elements, function (Element) {
            return Element.style = 'display:none';
        });
    }

    getColLength() {
        ////////////debugger;
        this.cols.length;
    }
    setcolor(itemcol, rowData) {
        // return 'background-color:red!important';
        //return { color: "red" };

        //////debugger;
        // return 'background-color:'+itemcol.bgcolor+';color:'+itemcol.forecolor;
        //&& (itemcol.forecolor==null ? {'color': ''} : {'color': itemcol.forecolor})
        //(itemcol.bgcolor==null? {'background-color': ''} : {'background-color': itemcol.bgcolor}) 
        ////debugger;
        if (itemcol.conditionstyle != null) {
            let ret = eval(itemcol.conditionstyle);
            return { 'background-color': ret };
        }

        return { 'background-color': itemcol.bgcolor, 'color': itemcol.forecolor };

    }
    getColTotal(colname) {
        // ////////////debugger;
        let ret = "";
        if (this.sumcolnames.findIndex(x => x.colname === colname) < 0) {
            return "";
        }
        let index = this.cols.findIndex(x => x.field === colname);
        ret = (this.cols[index].sum == null ? "" : this.cols[index].sum);
        return "Total: " + ret;
    }


    GetConditions(strCondition) {
        var ret: any[] = [];
        var conds = strCondition.split(';');
        for (let i = 0; i < conds.length; i++) {
            var condsplits = conds[i].split(':');
            ret.push({ header: condsplits[0], condition: condsplits[1], value: 0 });
        }
        return ret;
    }
    evaluate(expression, rowData) {
        // return expression;
        //////////////debugger;
        let ret = expression;
        this.cols.forEach((col: any) => {
            let val = rowData[col.field];
            if (val == null || val == undefined) val = '';
            ret = ret.replace(new RegExp('##' + col.tablealias + "." + col.field + '##', 'g'), val);
            ret = ret.replace(new RegExp('##' + col.field + '##', 'g'), val);
        });
        let val = rowData['pkcol'];
        ret = ret.replace(new RegExp('##m.pkcol##', 'g'), val);
        ret = ret.replace(new RegExp('##pkcol##', 'g'), val);

        //return eval(expression);
        return ret;
    }
    runsp(spname, rowData) {
        //////////debugger;
        this.boreportviewerservice.formid = 0;
        if (this.dialogdata != null && this.dialogdata["formid"] != null) this.boreportviewerservice.formid = this.dialogdata["formid"];
        this.boreportviewerservice.runsp(this.pmenuid, spname, rowData["pkcol"], this.pmenucode).then((res: any) => {
            this.sharedService.alert("successfully executed");
        });
    }
    getMin(colname, datatype) {
        ////////////debugger;
        let min = null;
        for (let i = 0; i < this.data.length; i++) {
            let rowData = this.data[i];
            if (rowData[colname] != null) {
                let d = null;
                if (datatype == "date") d = new Date(rowData[colname]);
                else
                    d = 0 + rowData[colname];
                if (min == null) min = d;
                else if (min > d) min = d;
            }
        }
        if (datatype == "date" && min != null) return min.getTime();
        return min;
    }
    getMax(colname, datatype) {
        let max = null;
        for (let i = 0; i < this.data.length; i++) {
            let rowData = this.data[i];
            if (rowData[colname] != null) {
                let d = null;
                if (datatype == "date") d = new Date(rowData[colname]);
                else
                    d = rowData[colname];
                if (max == null) max = d;
                else if (d > max) max = d;
            }
        }
        if (datatype == "date" && max != null) return max.getTime();
        return max;
    }


    convert(array, parentid) {
        ////////debugger;

        let category = parentid;

        var map = {};

        for (var i = 0; i < array.length; i++) {
            var obj: any = { data: array[i], partialSelected: true };


            map[obj.data.pk] = obj;



            var parent = array[i][category] || '-';
            if (!map[parent]) {
                map[parent] = {
                    children: []
                };
            }
            if (map[parent].children == undefined || map[parent].children == null) {

                map[parent].children = [];
            }
            else {
                map[parent].icon = 'pi pi-fw pi-download';
            }

            map[parent].children.push(obj);
        }
        // ////////debugger;

        return map['-'].children;


    }





}
