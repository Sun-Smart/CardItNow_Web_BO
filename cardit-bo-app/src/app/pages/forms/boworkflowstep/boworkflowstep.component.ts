import { boworkflowstepService } from './../../../service/boworkflowstep.service';
import { boworkflowstep } from './../../../model/boworkflowstep.model';
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

@Component({
    selector: 'app-boworkflowstep',
    templateUrl: './boworkflowstep.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowstepComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: boworkflowstep;
    list: boworkflowstep[];
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
    action:any;
    bfilterPopulate_boworkflowsteps: boolean = false;
    boworkflowstep_menuactions: any = []

    boworkflowstep_Form: FormGroup;

    task_List: DropDownValues[];
    task_Suggestions: any[];
    task_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    yesstep_List: DropDownValues[];
    yesstep_Suggestions: any[];
    yesstep_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    nostep_List: DropDownValues[];
    nostep_Suggestions: any[];
    nostep_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    workflowuserfieldtype_List: DropDownValues[];
    workflowuserfieldtype_Suggestions: any[];
    workflowuserfieldtype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parentid_List: DropDownValues[];
    parentid_Suggestions: any[];
    parentid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    customfieldid_List: DropDownValues[];
    customfieldid_Suggestions: any[];
    customfieldid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
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
        private boworkflowstep_service: boworkflowstepService,
        private fb: FormBuilder,
        public sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
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
            this.boworkflowstep_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                workflowstepid: [null],
                workflowmasterid: [null, Validators.compose([Validators.required,])],
                stepno: [null],
                stepname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(100)])],
                tat: [null, Validators.compose([Validators.maxLength(20)])],
                task: [null, Validators.compose([Validators.maxLength(10)])],
                taskdesc: [null],
                condition: [null, Validators.compose([Validators.maxLength(200)])],
                yesstep: [null],
                yesstepdesc: [null],
                nostep: [null],
                nostepdesc: [null],
                approver: [null, Validators.compose([Validators.maxLength(100)])],
                action: [null, Validators.compose([Validators.maxLength(100)])],
                actiontype: [null, Validators.compose([Validators.maxLength(10)])],
                minapprovers: [null],
                workflowuserfieldtype: [null, Validators.compose([Validators.maxLength(10)])],
                workflowuserfieldtypedesc: [null],
                workflowuserfieldname: [null, Validators.compose([Validators.pattern(/^[a-zA-Z ]*$/), Validators.maxLength(100)])],
                parentid: [null],
                parentiddesc: [null],
                noedittransaction: [null],
                autoapproval: [null],
                autodenial: [null],
                waitduration: [null, Validators.compose([Validators.maxLength(20)])],
                remainderduration: [null, Validators.compose([Validators.maxLength(100)])],
                escalationuser: [null, Validators.compose([Validators.maxLength(100)])],
                cc: [null, Validators.compose([Validators.maxLength(100)])],
                customfieldid: [null],
                customfieldiddesc: [null],
                predecessor: [null, Validators.compose([Validators.maxLength(4)])],
                processid: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.boworkflowstep_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.boworkflowstep_Form.dirty && this.boworkflowstep_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.workflowstepid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowstepid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowstepid && pkDetail) {
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
            let boworkflowstepid = null;

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
            this.formData = new boworkflowstep();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = boworkflowstepid;
            //alert(boworkflowstepid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boworkflowstep_service.getDefaultData().then(res => {
                this.task_List = res.list_task.value;
                if (this.formData?.task != undefined && this.formData?.task != null) {
                    this.boworkflowstep_Form.patchValue({
                        task: this.formData.task
                    });
                }
                this.yesstep_List = res.list_yesstep.value;
                this.yesstep_Suggestions = this.yesstep_List;
                if (this.formData?.yesstep != undefined && this.formData?.yesstep != null) {
                    this.boworkflowstep_Form.patchValue({
                        yesstep: this.sharedService.getValue("value", this.yesstep_List, this.formData.yesstep?.toString(), 'yesstep')
                    });
                }
                this.nostep_List = res.list_nostep.value;
                this.nostep_Suggestions = this.nostep_List;
                if (this.formData?.nostep != undefined && this.formData?.nostep != null) {
                    this.boworkflowstep_Form.patchValue({
                        nostep: this.sharedService.getValue("value", this.nostep_List, this.formData.nostep?.toString(), 'nostep')
                    });
                }
                this.workflowuserfieldtype_List = res.list_workflowuserfieldtype.value;
                if (this.formData?.workflowuserfieldtype != undefined && this.formData?.workflowuserfieldtype != null) {
                    this.boworkflowstep_Form.patchValue({
                        workflowuserfieldtype: this.formData.workflowuserfieldtype
                    });
                }
                this.parentid_List = res.list_parentid.value;
                this.parentid_Suggestions = this.parentid_List;
                if (this.formData?.parentid != undefined && this.formData?.parentid != null) {
                    this.boworkflowstep_Form.patchValue({
                        parentid: this.sharedService.getValue("value", this.parentid_List, this.formData.parentid?.toString(), 'parentid')
                    });
                }
                this.customfieldid_List = res.list_customfieldid.value;
                this.customfieldid_Suggestions = this.customfieldid_List;
                if (this.formData?.customfieldid != undefined && this.formData?.customfieldid != null) {
                    this.boworkflowstep_Form.patchValue({
                        customfieldid: this.sharedService.getValue("value", this.customfieldid_List, this.formData.customfieldid?.toString(), 'customfieldid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.boworkflowstep_service.get_boworkflowsteps_List().then(res => {
                this.pkList = res as boworkflowstep[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'boworkflowstepsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.boworkflowstep_Form.markAsUntouched();
            this.boworkflowstep_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_task(value: any) {
        this.task_Suggestions = this.task_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_task(taskDetail: any) {
        if (taskDetail.value && taskDetail) {

        }
    }

    onEntered_yesstep(value: any) {
        this.yesstep_Suggestions = this.yesstep_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_yesstep(yesstepDetail: any) {
        if (yesstepDetail.value && yesstepDetail) {

        }
    }

    onEntered_nostep(value: any) {
        this.nostep_Suggestions = this.nostep_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_nostep(nostepDetail: any) {
        if (nostepDetail.value && nostepDetail) {

        }
    }

    onEntered_workflowuserfieldtype(value: any) {
        this.workflowuserfieldtype_Suggestions = this.workflowuserfieldtype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_workflowuserfieldtype(workflowuserfieldtypeDetail: any) {
        if (workflowuserfieldtypeDetail.value && workflowuserfieldtypeDetail) {

        }
    }

    onEntered_parentid(value: any) {
        this.parentid_Suggestions = this.parentid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parentid(parentidDetail: any) {
        if (parentidDetail.value && parentidDetail) {

        }
    }

    onEntered_customfieldid(value: any) {
        this.customfieldid_Suggestions = this.customfieldid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_customfieldid(customfieldidDetail: any) {
        if (customfieldidDetail.value && customfieldidDetail) {

        }
    }
    onCopyRecursive(){}
    onChangeAction(){}


    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.boworkflowstep_Form != null)
            this.boworkflowstep_Form.reset();
        this.boworkflowstep_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let workflowstepid = this.boworkflowstep_Form.get('workflowstepid').value;
        if (workflowstepid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.boworkflowstep_service.delete_boworkflowstep(workflowstepid);
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
        this.boworkflowstep_Form.patchValue({
            workflowstepid: null
        });
        if (this.formData.workflowstepid != null) this.formData.workflowstepid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.boworkflowstep_Form.patchValue({
            workflowstepid: null
        });
        if (this.formData.workflowstepid != null) this.formData.workflowstepid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'workflowstepid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "approver")
                        this.boworkflowstep_Form.patchValue({ "approver": mainscreendata[key] });
                    else if (key == "escalationuser")
                        this.boworkflowstep_Form.patchValue({ "escalationuser": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflowstep_Form.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflowstep_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowstep_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowstep_Form.controls[key] != undefined) {
                                this.boworkflowstep_Form.controls[key].disable({ onlySelf: true });
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
    onClose() {
        this.dialogRef.close(null);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.stepname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.stepname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    task_onChange(evt: any) {
        let e = this.f.task.value as any;
    }
    yesstep_onChange(evt: any) {
        let e = this.f.yesstep.value as any;
    }
    nostep_onChange(evt: any) {
        let e = this.f.nostep.value as any;
    }
    workflowuserfieldtype_onChange(evt: any) {
        let e = this.f.workflowuserfieldtype.value as any;
    }
    parentid_onChange(evt: any) {
        let e = this.f.parentid.value as any;
    }
    customfieldid_onChange(evt: any) {
        let e = this.f.customfieldid.value as any;
    }

    edit_boworkflowsteps() {
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
            this.boworkflowstep_service.get_boworkflowsteps_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.boworkflowstep;
                let formproperty = res.boworkflowstep.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.boworkflowstep.pkcol;
                this.formid = res.boworkflowstep.workflowstepid;
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
            debugger;
            this.formData = res.boworkflowstep;
            this.formid = res.boworkflowstep.workflowstepid;
            this.pkcol = res.boworkflowstep.pkcol;
            this.bmyrecord = false;
            if ((res.boworkflowstep as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.boworkflowstep_Form.patchValue({
                pkcol: res.boworkflowstep.pkcol,
                workflowstepid: res.boworkflowstep.workflowstepid,
                workflowmasterid: res.boworkflowstep.workflowmasterid,
                stepno: res.boworkflowstep.stepno,
                stepname: res.boworkflowstep.stepname,
                tat: res.boworkflowstep.tat,
                task: this.sharedService.getValue("value", this.task_List, res.boworkflowstep.task, 'task'),
                taskdesc: res.boworkflowstep.taskdesc,
                condition: res.boworkflowstep.condition,
                yesstep: this.sharedService.getValue("value", this.yesstep_List, res.boworkflowstep.yesstep, 'yesstep'),
                yesstepdesc: res.boworkflowstep.yesstepdesc,
                nostep: this.sharedService.getValue("value", this.nostep_List, res.boworkflowstep.nostep, 'nostep'),
                nostepdesc: res.boworkflowstep.nostepdesc,
                approver: this.sharedService.JSON_parse(res.boworkflowstep.approver),
                action: res.boworkflowstep.action,
                actiontype: res.boworkflowstep.actiontype,
                minapprovers: res.boworkflowstep.minapprovers,
                workflowuserfieldtype: this.sharedService.getValue("value", this.workflowuserfieldtype_List, res.boworkflowstep.workflowuserfieldtype, 'workflowuserfieldtype'),
                workflowuserfieldtypedesc: res.boworkflowstep.workflowuserfieldtypedesc,
                workflowuserfieldname: res.boworkflowstep.workflowuserfieldname,
                parentid: this.sharedService.getValue("value", this.parentid_List, res.boworkflowstep.parentid, 'parentid'),
                parentiddesc: res.boworkflowstep.parentiddesc,
                noedittransaction: res.boworkflowstep.noedittransaction,
                autoapproval: res.boworkflowstep.autoapproval,
                autodenial: res.boworkflowstep.autodenial,
                waitduration: res.boworkflowstep.waitduration,
                remainderduration: res.boworkflowstep.remainderduration,
                escalationuser: this.sharedService.JSON_parse(res.boworkflowstep.escalationuser),
                cc: this.sharedService.JSON_parse(res.boworkflowstep.cc),
                customfieldid: this.sharedService.getValue("value", this.customfieldid_List, res.boworkflowstep.customfieldid, 'customfieldid'),
                customfieldiddesc: res.boworkflowstep.customfieldiddesc,
                predecessor: res.boworkflowstep.predecessor,
                processid: res.boworkflowstep.processid,
                status: res.boworkflowstep.status,
                statusdesc: res.boworkflowstep.statusdesc,
            });
            this.boworkflowstep_menuactions = res.boworkflowstep_menuactions;
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

        for (let key in this.boworkflowstep_Form.controls) {
            let val = this.boworkflowstep_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boworkflowstep_Form.controls[key] != null) {
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
        formData = this.boworkflowstep_Form.getRawValue();
        formData.task = (this.boworkflowstep_Form.get('task'))?.value?.value;
        formData.yesstep = (this.boworkflowstep_Form.get('yesstep'))?.value?.value;
        formData.nostep = (this.boworkflowstep_Form.get('nostep'))?.value?.value;
        if (this.boworkflowstep_Form.get('approver').value != null) formData.approver = JSON.stringify(this.boworkflowstep_Form.get('approver').value);
        formData.workflowuserfieldtype = (this.boworkflowstep_Form.get('workflowuserfieldtype'))?.value?.value;
        formData.parentid = (this.boworkflowstep_Form.get('parentid'))?.value?.value;
        if (this.boworkflowstep_Form.get('escalationuser').value != null) formData.escalationuser = JSON.stringify(this.boworkflowstep_Form.get('escalationuser').value);
        if (this.boworkflowstep_Form.get('cc').value != null) formData.cc = JSON.stringify(this.boworkflowstep_Form.get('cc').value);
        formData.customfieldid = (this.boworkflowstep_Form.get('customfieldid'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.boworkflowstep_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.workflowstepid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boworkflowstep_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
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
            Object.keys(this.boworkflowstep_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.boworkflowstep_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.boworkflowstep_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.boworkflowstep_service.save_boworkflowsteps(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).boworkflowstep);
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
                    this.objvalues.push((res as any).boworkflowstep);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.boworkflowstep_Form.markAsUntouched();
            this.boworkflowstep_Form.markAsPristine();
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



