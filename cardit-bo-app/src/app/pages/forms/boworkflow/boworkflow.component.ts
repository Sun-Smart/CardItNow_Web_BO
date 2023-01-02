import { boworkflowService } from './../../../service/boworkflow.service';
import { boworkflow } from './../../../model/boworkflow.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ReportViewerCtrlComponent } from '../../../pages/forms/boreportviewer/reportviewerctrl.component';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicdialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { ThemeService } from '../../../pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-boworkflow',
    templateUrl: './boworkflow.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowComponent implements OnInit {
    action:any;
    blockedDocument: boolean = false;
    formData: boworkflow;
    list: boworkflow[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    keylist: any = [];
    objvalues: any = [];
    viewHtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    //formdata: any;//current form data
    shortcuts: ShortcutInput[] = [];//keyboard keys
    showSubmit: boolean = true;//button to show
    showGoWorkFlow: boolean = false;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    toolbarVisible: boolean = true;
    customFieldServiceList: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    @ViewChild('panelscroller') private panelscroller: ElementRef;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_boworkflows: boolean = false;
    boworkflow_menuactions: any = []

    boworkflow_Form: FormGroup;

    currentapproved_List: DropDownValues[];
    currentapproved_Suggestions: any[];
    currentapproved_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    standardrating_List: DropDownValues[];
    standardrating_Suggestions: any[];
    standardrating_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    performancerating_List: DropDownValues[];
    performancerating_Suggestions: any[];
    performancerating_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    performancestatus_List: DropDownValues[];
    performancestatus_Suggestions: any[];
    performancestatus_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    workflowstatus_List: DropDownValues[];
    workflowstatus_Suggestions: any[];
    workflowstatus_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    customFieldJson: any;
    customFieldVisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;






    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflow_service: boworkflowService,
        private fb: FormBuilder,
        public sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute) {
        try {
            this.sessionData = this.sessionService.getSession();
            if (this.sessionData != null) {
                this.translate.use(this.sessionData.language);
            }
            this.data = dynamicconfig;
            this.p_menuid = sharedService.menuid;
            this.p_currenturl = sharedService.currenturl;
            this.keyboard.add([
                {
                    key: 'cmd l',
                    command: () => this.router.navigate(["/home/" + this.p_currenturl]),
                    preventDefault: true
                },
                {
                    key: 'cmd s',
                    command: () => this.onSubmitData(false),
                    preventDefault: true
                },
                {
                    key: 'cmd f',
                    command: () => this.resetForm(),
                    preventDefault: true
                }
            ]);
            this.boworkflow_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                ImageName: [null],
                workflowid: [null],
                workflowmasterid: [null, Validators.compose([Validators.required,])],
                currentstepno: [null, Validators.compose([Validators.required,])],
                modulename: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/),])],
                pkvalue: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                currentapproved: [null],
                currentapproveddesc: [null],
                currentapprovers: [null, Validators.compose([Validators.maxLength(200)])],
                nextapprovers: [null, Validators.compose([Validators.maxLength(200)])],
                assigneddatetime: [null],
                closeddatetime: [null],
                standardrating: [null],
                standardratingdesc: [null],
                performancerating: [null],
                performanceratingdesc: [null],
                performancestatus: [null, Validators.compose([Validators.maxLength(10)])],
                performancestatusdesc: [null],
                exception: [null],
                approvedusers: [null, Validators.compose([Validators.maxLength(200)])],
                stepapprovedusers: [null],
                approvedcondition: [null, Validators.compose([Validators.maxLength(200)])],
                tathours: [null, Validators.compose([Validators.maxLength(20)])],
                totalactualtime: [null, Validators.compose([Validators.maxLength(20)])],
                processid: [null],
                workflowdetails: [null],
                comments: [null],
                history: [null],
                lastapprover: [null, Validators.compose([Validators.maxLength(100)])],
                cc: [null, Validators.compose([Validators.maxLength(100)])],
                customfield: [null],
                attachment: [null],
                workflowstatus: [null, Validators.compose([Validators.maxLength(10)])],
                workflowstatusdesc: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.boworkflow_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.boworkflow_Form.dirty && this.boworkflow_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        try {
            if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
            //session & theme
            this.themeService.theme.subscribe((val: string) => {
                this.theme = val;
            });

            this.sessionData = this.sessionService.getSession();
            if (this.sessionData != null) {
                this.SESSIONUSERID = this.sessionData.userid;
            }

            this.theme = this.sessionService.getItem('selected-theme');
            //this.viewHtml=this.sessionService.getViewHtml();

            //debugger;
            //getting data - from list page, from other screen through dialog
            if (this.data != null && this.data.data != null) {
                this.data = this.data.data;
                this.maindata = this.data;
            }
            if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
            if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
                this.viewHtml = '';
            }
            if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
            if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
                this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
            }
            let boworkflowid = null;

            //if view button(eye) is clicked
            if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
                this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
                this.showview = true;
                //this.viewHtml=this.sessionService.getViewHtml();
            }
            else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
                this.pkcol = this.sessionService.getItem('usersource');
            }
            else if (this.data != null && this.data.pkcol != null) {
                this.pkcol = this.data.pkcol;
            }
            else {
                this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
                this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
            }
            //copy the data from previous dialog 
            this.viewHtml = ``;
            this.formData = new boworkflow();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = boworkflowid;
            //alert(boworkflowid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.FillCustomField();
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boworkflow_service.getDefaultData().then(res => {
                this.currentapproved_List = res.list_currentapproved.value;
                this.currentapproved_Suggestions = this.currentapproved_List;
                if (this.formData?.currentapproved != undefined && this.formData?.currentapproved != null) {
                    this.boworkflow_Form.patchValue({
                        currentapproved: this.sharedService.getValue("value", this.currentapproved_List, this.formData.currentapproved?.toString(), 'currentapproved')
                    });
                }
                this.standardrating_List = res.list_standardrating.value;
                if (this.formData?.standardrating != undefined && this.formData?.standardrating != null) {
                    this.boworkflow_Form.patchValue({
                        standardrating: this.formData.standardrating
                    });
                }
                this.performancerating_List = res.list_performancerating.value;
                if (this.formData?.performancerating != undefined && this.formData?.performancerating != null) {
                    this.boworkflow_Form.patchValue({
                        performancerating: this.formData.performancerating
                    });
                }
                this.performancestatus_List = res.list_performancestatus.value;
                if (this.formData?.performancestatus != undefined && this.formData?.performancestatus != null) {
                    this.boworkflow_Form.patchValue({
                        performancestatus: this.formData.performancestatus
                    });
                }
                this.workflowstatus_List = res.list_workflowstatus.value;
                if (this.formData?.workflowstatus != undefined && this.formData?.workflowstatus != null) {
                    this.boworkflow_Form.patchValue({
                        workflowstatus: this.formData.workflowstatus
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.boworkflow_service.get_boworkflows_List().then(res => {
                this.pkList = res as boworkflow[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'boworkflowsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.boworkflow_Form.markAsUntouched();
            this.boworkflow_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_currentapproved(value: any) {
        this.currentapproved_Suggestions = this.currentapproved_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_currentapproved(currentapprovedDetail: any) {
        if (currentapprovedDetail.value && currentapprovedDetail) {

        }
    }

    onEntered_standardrating(value: any) {
        this.standardrating_Suggestions = this.standardrating_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_standardrating(standardratingDetail: any) {
        if (standardratingDetail.value && standardratingDetail) {

        }
    }

    onEntered_performancerating(value: any) {
        this.performancerating_Suggestions = this.performancerating_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_performancerating(performanceratingDetail: any) {
        if (performanceratingDetail.value && performanceratingDetail) {

        }
    }

    onEntered_performancestatus(value: any) {
        this.performancestatus_Suggestions = this.performancestatus_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_performancestatus(performancestatusDetail: any) {
        if (performancestatusDetail.value && performancestatusDetail) {

        }
    }

    onEntered_workflowstatus(value: any) {
        this.workflowstatus_Suggestions = this.workflowstatus_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_workflowstatus(workflowstatusDetail: any) {
        if (workflowstatusDetail.value && workflowstatusDetail) {

        }
    }




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.boworkflow_Form != null)
            this.boworkflow_Form.reset();
        this.boworkflow_Form.patchValue({
            currentapproved: this.sessionData.userid,
            currentapproveddesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let workflowid = this.boworkflow_Form.get('workflowid').value;
        if (workflowid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.boworkflow_service.delete_boworkflow(workflowid);
                this.toastr.addSingle("success", "", "Successfully Deleted");
                this.resetForm();
                return new Promise(resolve => {
                    resolve(true);
                });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.formid = null;
        this.boworkflow_Form.patchValue({
            workflowid: null
        });
        if (this.formData.workflowid != null) this.formData.workflowid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.boworkflow_Form.patchValue({
            workflowid: null
        });
        if (this.formData.workflowid != null) this.formData.workflowid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'workflowid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "currentapprovers")
                        this.boworkflow_Form.patchValue({ "currentapprovers": mainscreendata[key] });
                    else if (key == "nextapprovers")
                        this.boworkflow_Form.patchValue({ "nextapprovers": mainscreendata[key] });
                    else if (key == "assigneddatetime")
                        this.boworkflow_Form.patchValue({ "assigneddatetime": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "closeddatetime")
                        this.boworkflow_Form.patchValue({ "closeddatetime": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "approvedusers")
                        this.boworkflow_Form.patchValue({ "approvedusers": mainscreendata[key] });
                    else if (key == "comments")
                        this.boworkflow_Form.patchValue({ "comments": mainscreendata[key] });
                    else if (key == "lastapprover")
                        this.boworkflow_Form.patchValue({ "lastapprover": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflow_Form.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflow_Form.controls[key] != undefined) {
                                this.boworkflow_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                                this.keylist.push(key);
                                this.formData[key] = this.f[key]?.value;
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("boworkflows", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(null);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(false);
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
        }
        else {
            this.onSubmitData(false);
        }
    }
    onSubmit() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    currentapproved_onChange(evt: any) {
        let e = this.f.currentapproved.value as any;
    }
    standardrating_onChange(evt: any) {
        let e = this.f.standardrating.value as any;
    }
    performancerating_onChange(evt: any) {
        let e = this.f.performancerating.value as any;
    }
    performancestatus_onChange(evt: any) {
        let e = this.f.performancestatus.value as any;
    }
    workflowstatus_onChange(evt: any) {
        let e = this.f.workflowstatus.value as any;
    }
    attachmentuploader(e: any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max)?.toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max)?.toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }



    edit_boworkflows() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.boworkflow_service.get_boworkflows_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.boworkflow;
                let formproperty = res.boworkflow.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.boworkflow.pkcol;
                this.formid = res.boworkflow.workflowid;
                setTimeout(() => {
                    this.InitializeGrid();
                    this.FillData(res)
                }, 500);
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'filldata ' + err);
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    FillData(res: any) {
        try {
            this.formData = res.boworkflow;
            this.formid = res.boworkflow.workflowid;
            this.pkcol = res.boworkflow.pkcol;
            this.bmyrecord = false;
            if ((res.boworkflow as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.boworkflow_Form.patchValue({
                pkcol: res.boworkflow.pkcol,
                workflowid: res.boworkflow.workflowid,
                workflowmasterid: res.boworkflow.workflowmasterid,
                currentstepno: res.boworkflow.currentstepno,
                modulename: res.boworkflow.modulename,
                pkvalue: res.boworkflow.pkvalue,
                currentapproved: this.sharedService.getValue("value", this.currentapproved_List, res.boworkflow.currentapproved, 'currentapproved'),
                currentapproveddesc: res.boworkflow.currentapproveddesc,
                currentapprovers: this.sharedService.JSON_parse(res.boworkflow.currentapprovers),
                nextapprovers: this.sharedService.JSON_parse(res.boworkflow.nextapprovers),
                assigneddatetime: res.boworkflow.assigneddatetime == null ? null : new Date(res.boworkflow.assigneddatetime),
                closeddatetime: res.boworkflow.closeddatetime == null ? null : new Date(res.boworkflow.closeddatetime),
                standardrating: this.sharedService.getValue("value", this.standardrating_List, res.boworkflow.standardrating, 'standardrating'),
                standardratingdesc: res.boworkflow.standardratingdesc,
                performancerating: this.sharedService.getValue("value", this.performancerating_List, res.boworkflow.performancerating, 'performancerating'),
                performanceratingdesc: res.boworkflow.performanceratingdesc,
                performancestatus: this.sharedService.getValue("value", this.performancestatus_List, res.boworkflow.performancestatus, 'performancestatus'),
                performancestatusdesc: res.boworkflow.performancestatusdesc,
                exception: res.boworkflow.exception,
                approvedusers: this.sharedService.JSON_parse(res.boworkflow.approvedusers),
                stepapprovedusers: res.boworkflow.stepapprovedusers,
                approvedcondition: res.boworkflow.approvedcondition,
                tathours: res.boworkflow.tathours,
                totalactualtime: res.boworkflow.totalactualtime,
                processid: res.boworkflow.processid,
                workflowdetails: res.boworkflow.workflowdetails,
                comments: this.sharedService.JSON_parse(res.boworkflow.comments),
                history: res.boworkflow.history,
                lastapprover: this.sharedService.JSON_parse(res.boworkflow.lastapprover),
                cc: this.sharedService.JSON_parse(res.boworkflow.cc),
                customfield: res.boworkflow.customfield,
                attachment: this.sharedService.JSON_parse(res.boworkflow.attachment),
                workflowstatus: this.sharedService.getValue("value", this.workflowstatus_List, res.boworkflow.workflowstatus, 'workflowstatus'),
                workflowstatusdesc: res.boworkflow.workflowstatusdesc,
                status: res.boworkflow.status,
                statusdesc: res.boworkflow.statusdesc,
            });
            this.boworkflow_menuactions = res.boworkflow_menuactions;
            if (this.boworkflow_Form.get('customfield').value != null && this.boworkflow_Form.get('customfield').value != "") this.customFieldJson = this.sharedService.JSON_parse(this.boworkflow_Form.get('customfield').value);
            this.FillCustomField();
            if (this.boworkflow_Form.get('attachment').value != null && this.boworkflow_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.boworkflow_Form.get('attachment').value);
            //Child Tables if any
            setTimeout(() => {
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;

        for (let key in this.boworkflow_Form.controls) {
            let val = this.boworkflow_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boworkflow_Form.controls[key] != null) {
                if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + this.sharedService.JSON_parse(this.formData[key])[0]["name"]);
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
    }


    SetFormValues() {
    }

    GetFormValues() {
        let formData: any;
        formData = this.boworkflow_Form.getRawValue();
        var customfields = this.customfieldservice.getCustomValues(document);
        formData.currentapproved = (this.boworkflow_Form.get('currentapproved'))?.value?.value;
        if (this.boworkflow_Form.get('currentapprovers').value != null) formData.currentapprovers = JSON.stringify(this.boworkflow_Form.get('currentapprovers').value);
        if (this.boworkflow_Form.get('nextapprovers').value != null) formData.nextapprovers = JSON.stringify(this.boworkflow_Form.get('nextapprovers').value);
        formData.assigneddatetime = this.sharedService.getDate(this.boworkflow_Form.get('assigneddatetime').value)
        formData.closeddatetime = this.sharedService.getDate(this.boworkflow_Form.get('closeddatetime').value)
        formData.standardrating = (this.boworkflow_Form.get('standardrating'))?.value?.value;
        formData.performancerating = (this.boworkflow_Form.get('performancerating'))?.value?.value;
        formData.performancestatus = (this.boworkflow_Form.get('performancestatus'))?.value?.value;
        if (this.boworkflow_Form.get('approvedusers').value != null) formData.approvedusers = JSON.stringify(this.boworkflow_Form.get('approvedusers').value);
        if (this.boworkflow_Form.get('comments').value != null) formData.comments = JSON.stringify(this.boworkflow_Form.get('comments').value);
        if (this.boworkflow_Form.get('lastapprover').value != null) formData.lastapprover = JSON.stringify(this.boworkflow_Form.get('lastapprover').value);
        if (this.boworkflow_Form.get('cc').value != null) formData.cc = JSON.stringify(this.boworkflow_Form.get('cc').value);
        if (customfields != null) formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        formData.workflowstatus = (this.boworkflow_Form.get('workflowstatus'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.boworkflow_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.workflowid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.GetFormValues();
        console.log(obj);
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
    }

    //This has to come from bomenuactions & procedures
    afterAction(mode: any) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }



    async onSubmitData(bclear: any): Promise<any> {
        try {
            //debugger;
            this.SetFormValues();
            this.isSubmitted = true;
            let strError = "";
            Object.keys(this.boworkflow_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.boworkflow_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (this.customform != undefined) {
                Object.keys(this.customform?.form?.controls).forEach(key => {
                    const controlErrors: ValidationErrors = this.customform.form.get(key).errors;
                    if (controlErrors != null) {
                        Object.keys(controlErrors).forEach(keyError => {
                            strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                        });
                    }
                });
            }
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.boworkflow_service.save_boworkflows(this.formData, this.fileAttachmentList);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).boworkflow);
            if (!bclear && (this.formid != null && this.formid != "")) this.showview = true;
            if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
            if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                this.dialogRef.close(this.objvalues);
                return;
            }
            else {
                if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
            }
            this.clearList();
            if (bclear) {
                this.resetForm();
            }
            else {
                if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.objvalues.push((res as any).boworkflow);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.boworkflow_Form.markAsUntouched();
            this.boworkflow_Form.markAsPristine();
            return new Promise(resolve => {
                resolve(res);
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }


    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



