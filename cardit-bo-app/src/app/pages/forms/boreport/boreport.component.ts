import { boreportService } from './../../../service/boreport.service';
import { boreport } from './../../../model/boreport.model';
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
import { boreportdetail } from './../../../model/boreportdetail.model';
import { boreportdetailComponent } from './../../../pages/forms/boreportdetail/boreportdetail.component';
import { boreportdetailService } from './../../../service/boreportdetail.service';
import { boreportothertable } from './../../../model/boreportothertable.model';
import { boreportothertableComponent } from './../../../pages/forms/boreportothertable/boreportothertable.component';
import { boreportothertableService } from './../../../service/boreportothertable.service';
import { boreportcolumn } from './../../../model/boreportcolumn.model';
import { boreportcolumnComponent } from './../../../pages/forms/boreportcolumn/boreportcolumn.component';
import { boreportcolumnService } from './../../../service/boreportcolumn.service';
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
    selector: 'app-boreport',
    templateUrl: './boreport.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boreportComponent implements OnInit {
    action:any;
    blockedDocument: boolean = false;
    formData: boreport;
    list: boreport[];
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

    bfilterPopulate_boreports: boolean = false;
    bfilterPopulate_boreportdetails: boolean = false;
    bfilterPopulate_boreportothertables: boolean = false;
    bfilterPopulate_boreportcolumns: boolean = false;
    boreport_menuactions: any = []
    boreportdetail_menuactions: any = []
    boreportdetail_visible: boolean = true;
    boreportdetail_disabled: boolean = false;
    @ViewChild('tbl_boreportdetails', { static: false }) tbl_boreportdetails!: ReportViewerCtrlComponent;
    boreportothertable_menuactions: any = []
    boreportothertable_visible: boolean = true;
    boreportothertable_disabled: boolean = false;
    @ViewChild('tbl_boreportothertables', { static: false }) tbl_boreportothertables!: ReportViewerCtrlComponent;
    boreportcolumn_menuactions: any = []
    boreportcolumn_visible: boolean = true;
    boreportcolumn_disabled: boolean = false;
    @ViewChild('tbl_boreportcolumns', { static: false }) tbl_boreportcolumns!: ReportViewerCtrlComponent;

    boreport_Form: FormGroup;

    reportmodule_List: DropDownValues[];
    reportmodule_Suggestions: any[];
    reportmodule_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    reporttype_List: DropDownValues[];
    reporttype_Suggestions: any[];
    reporttype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    sidefiltertype_List: DropDownValues[];
    sidefiltertype_Suggestions: any[];
    sidefiltertype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    datefiltertype_List: DropDownValues[];
    datefiltertype_Suggestions: any[];
    datefiltertype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    groupbyrelationship_List: DropDownValues[];
    groupbyrelationship_Suggestions: any[];
    groupbyrelationship_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    jointype_List: DropDownValues[];
    jointype_Suggestions: any[];
    jointype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    reportoutputtype_List: DropDownValues[];
    reportoutputtype_Suggestions: any[];
    reportoutputtype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    viewhtmltype_List: DropDownValues[];
    viewhtmltype_Suggestions: any[];
    viewhtmltype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    workflowhtmltype_List: DropDownValues[];
    workflowhtmltype_Suggestions: any[];
    workflowhtmltype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    recordtype_List: DropDownValues[];
    recordtype_Suggestions: any[];
    recordtype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    dashboardid_List: DropDownValues[];
    dashboardid_Suggestions: any[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    schedule_List: DropDownValues[];
    schedule_Suggestions: any[];
    schedule_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    boreportdetails_visiblelist: any;
    boreportdetails_hidelist: any;
    boreportothertables_visiblelist: any;
    boreportothertables_hidelist: any;
    boreportcolumns_visiblelist: any;
    boreportcolumns_hidelist: any;

    tbl_boreportcolumns_selectedindex: any;
    Deleted_boreportdetail_IDs: string = "";
    boreportdetails_ID: string = "1";
    boreportdetails_selectedindex: any;
    Deleted_boreportothertable_IDs: string = "";
    boreportothertables_ID: string = "2";
    boreportothertables_selectedindex: any;
    Deleted_boreportcolumn_IDs: string = "";
    boreportcolumns_ID: string = "3";
    boreportcolumns_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boreport_service: boreportService,
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
            this.boreport_Form = this.fb.group({
                pkcol: [null],
                reportid: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                reportcode: [null, Validators.compose([Validators.required, Validators.maxLength(10)])],
                reportname: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                reportmodule: [null, Validators.compose([Validators.maxLength(10)])],
                reportmoduledesc: [null],
                actionkey: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                reporttype: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                reporttypedesc: [null],
                columns: [null],
                sidefilter: [null],
                sidefiltertype: [null, Validators.compose([Validators.maxLength(10)])],
                sidefiltertypedesc: [null],
                sidefilters: [null, Validators.compose([Validators.maxLength(140)])],
                maintablename: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                maintablealias: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                maintableidentityfield: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                pk: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                query: [null, Validators.compose([Validators.maxLength(4000)])],
                postquery: [null, Validators.compose([Validators.maxLength(400)])],
                wherecondition: [null, Validators.compose([Validators.maxLength(100)])],
                cardtype: [null],
                html: [null],
                calendar: [null],
                kanbanview: [null],
                kanbankey: [null, Validators.compose([Validators.maxLength(100)])],
                datefilter: [null],
                datefiltercolumnname: [null, Validators.compose([Validators.maxLength(160)])],
                datefiltertype: [null, Validators.compose([Validators.maxLength(100)])],
                datefiltertypedesc: [null],
                groupby: [null, Validators.compose([Validators.maxLength(160)])],
                groupbytext: [null],
                groupby2: [null, Validators.compose([Validators.maxLength(100)])],
                groupby2text: [null],
                groupbyrelationship: [null, Validators.compose([Validators.maxLength(10)])],
                groupbyrelationshipdesc: [null],
                sortby1: [null, Validators.compose([Validators.maxLength(160)])],
                sortby2: [null, Validators.compose([Validators.maxLength(160)])],
                sortby3: [null, Validators.compose([Validators.maxLength(160)])],
                parentid: [null, Validators.compose([Validators.maxLength(100)])],
                parentdescription: [null, Validators.compose([Validators.maxLength(100)])],
                detailtablename: [null, Validators.compose([Validators.maxLength(160)])],
                detailtablealias: [null, Validators.compose([Validators.maxLength(160)])],
                jointype: [null, Validators.compose([Validators.maxLength(20)])],
                jointypedesc: [null],
                detailtableidentityfield: [null, Validators.compose([Validators.maxLength(160)])],
                detailtablefk: [null, Validators.compose([Validators.maxLength(160)])],
                detailtableconcatenate: [null],
                detailtableheader: [null],
                detailtablefooter: [null],
                detailtablequery: [null, Validators.compose([Validators.maxLength(100)])],
                masterdetailwhere: [null, Validators.compose([Validators.maxLength(100)])],
                numrows: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                reportoutputtype: [null, Validators.compose([Validators.maxLength(100)])],
                reportoutputtypedesc: [null],
                noheader: [null],
                header: [null],
                footer: [null],
                headerquery: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery: [null, Validators.compose([Validators.maxLength(100)])],
                headerquery1: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery1: [null, Validators.compose([Validators.maxLength(100)])],
                headerquery2: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery2: [null, Validators.compose([Validators.maxLength(100)])],
                headerquery3: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery3: [null, Validators.compose([Validators.maxLength(100)])],
                headerquery4: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery4: [null, Validators.compose([Validators.maxLength(100)])],
                headerquery5: [null, Validators.compose([Validators.maxLength(100)])],
                footerquery5: [null, Validators.compose([Validators.maxLength(100)])],
                header1: [null],
                footer1: [null],
                header2: [null],
                footer2: [null],
                header3: [null],
                footer3: [null],
                header4: [null],
                footer4: [null],
                header5: [null],
                footer5: [null],
                status: [null],
                statusdesc: [null],
                css: [null],
                viewhtmltype: [null, Validators.compose([Validators.maxLength(10)])],
                viewhtmltypedesc: [null],
                viewhtml: [null],
                viewcss: [null],
                reporthtml: [null],
                workflowhtmltype: [null, Validators.compose([Validators.maxLength(10)])],
                workflowhtmltypedesc: [null],
                workflowhtml: [null],
                component: [null, Validators.compose([Validators.maxLength(160)])],
                alternateview: [null, Validators.compose([Validators.maxLength(40)])],
                recordtype: [null, Validators.compose([Validators.maxLength(4)])],
                recordtypedesc: [null],
                userfield: [null, Validators.compose([Validators.maxLength(100)])],
                employeefield: [null, Validators.compose([Validators.maxLength(100)])],
                userfiltertype: [null, Validators.compose([Validators.maxLength(100)])],
                rolefield: [null, Validators.compose([Validators.maxLength(100)])],
                dashboardid: [null],
                dashboardiddesc: [null],
                tableheader: [null],
                reportjsondata: [null],
                helptext: [null],
                filters: [null, Validators.compose([Validators.maxLength(100)])],
                filtercolumns: [null, Validators.compose([Validators.maxLength(100)])],
                groupbyfooter: [null, Validators.compose([Validators.maxLength(100)])],
                email: [null, Validators.compose([Validators.maxLength(100)])],
                schedule: [null, Validators.compose([Validators.maxLength(10)])],
                scheduledesc: [null],
                nextschedule: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.boreport_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.boreport_Form.dirty && this.boreport_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.reportid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.reportid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.reportid && pkDetail) {
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
            let boreportid = null;

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
            this.formData = new boreport();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = boreportid;
            //alert(boreportid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boreport_service.getDefaultData().then(res => {
                this.reportmodule_List = res.list_reportmodule.value;
                if (this.formData?.reportmodule != undefined && this.formData?.reportmodule != null) {
                    this.boreport_Form.patchValue({
                        reportmodule: this.formData.reportmodule
                    });
                }
                this.reporttype_List = res.list_reporttype.value;
                if (this.formData?.reporttype != undefined && this.formData?.reporttype != null) {
                    this.boreport_Form.patchValue({
                        reporttype: this.formData.reporttype
                    });
                }
                this.sidefiltertype_List = res.list_sidefiltertype.value;
                if (this.formData?.sidefiltertype != undefined && this.formData?.sidefiltertype != null) {
                    this.boreport_Form.patchValue({
                        sidefiltertype: this.formData.sidefiltertype
                    });
                }
                this.datefiltertype_List = res.list_datefiltertype.value;
                if (this.formData?.datefiltertype != undefined && this.formData?.datefiltertype != null) {
                    this.boreport_Form.patchValue({
                        datefiltertype: this.formData.datefiltertype
                    });
                }
                this.groupbyrelationship_List = res.list_groupbyrelationship.value;
                if (this.formData?.groupbyrelationship != undefined && this.formData?.groupbyrelationship != null) {
                    this.boreport_Form.patchValue({
                        groupbyrelationship: this.formData.groupbyrelationship
                    });
                }
                this.jointype_List = res.list_jointype.value;
                if (this.formData?.jointype != undefined && this.formData?.jointype != null) {
                    this.boreport_Form.patchValue({
                        jointype: this.formData.jointype
                    });
                }
                this.reportoutputtype_List = res.list_reportoutputtype.value;
                if (this.formData?.reportoutputtype != undefined && this.formData?.reportoutputtype != null) {
                    this.boreport_Form.patchValue({
                        reportoutputtype: this.formData.reportoutputtype
                    });
                }
                this.viewhtmltype_List = res.list_viewhtmltype.value;
                if (this.formData?.viewhtmltype != undefined && this.formData?.viewhtmltype != null) {
                    this.boreport_Form.patchValue({
                        viewhtmltype: this.formData.viewhtmltype
                    });
                }
                this.workflowhtmltype_List = res.list_workflowhtmltype.value;
                if (this.formData?.workflowhtmltype != undefined && this.formData?.workflowhtmltype != null) {
                    this.boreport_Form.patchValue({
                        workflowhtmltype: this.formData.workflowhtmltype
                    });
                }
                this.recordtype_List = res.list_recordtype.value;
                if (this.formData?.recordtype != undefined && this.formData?.recordtype != null) {
                    this.boreport_Form.patchValue({
                        recordtype: this.formData.recordtype
                    });
                }
                this.dashboardid_List = res.list_dashboardid.value;
                this.dashboardid_Suggestions = this.dashboardid_List;
                if (this.formData?.dashboardid != undefined && this.formData?.dashboardid != null) {
                    this.boreport_Form.patchValue({
                        dashboardid: this.sharedService.getValue("value", this.dashboardid_List, this.formData.dashboardid?.toString(), 'dashboardid')
                    });
                }
                this.schedule_List = res.list_schedule.value;
                if (this.formData?.schedule != undefined && this.formData?.schedule != null) {
                    this.boreport_Form.patchValue({
                        schedule: this.formData.schedule
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.boreport_service.get_boreports_List().then(res => {
                this.pkList = res as boreport[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'boreportsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.boreport_Form.markAsUntouched();
            this.boreport_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_reportmodule(value: any) {
        this.reportmodule_Suggestions = this.reportmodule_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_reportmodule(reportmoduleDetail: any) {
        if (reportmoduleDetail.value && reportmoduleDetail) {

        }
    }

    onEntered_reporttype(value: any) {
        this.reporttype_Suggestions = this.reporttype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_reporttype(reporttypeDetail: any) {
        if (reporttypeDetail.value && reporttypeDetail) {

        }
    }

    onEntered_sidefiltertype(value: any) {
        this.sidefiltertype_Suggestions = this.sidefiltertype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_sidefiltertype(sidefiltertypeDetail: any) {
        if (sidefiltertypeDetail.value && sidefiltertypeDetail) {

        }
    }

    onEntered_datefiltertype(value: any) {
        this.datefiltertype_Suggestions = this.datefiltertype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_datefiltertype(datefiltertypeDetail: any) {
        if (datefiltertypeDetail.value && datefiltertypeDetail) {

        }
    }

    onEntered_groupbyrelationship(value: any) {
        this.groupbyrelationship_Suggestions = this.groupbyrelationship_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_groupbyrelationship(groupbyrelationshipDetail: any) {
        if (groupbyrelationshipDetail.value && groupbyrelationshipDetail) {

        }
    }

    onEntered_jointype(value: any) {
        this.jointype_Suggestions = this.jointype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_jointype(jointypeDetail: any) {
        if (jointypeDetail.value && jointypeDetail) {

        }
    }

    onEntered_reportoutputtype(value: any) {
        this.reportoutputtype_Suggestions = this.reportoutputtype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_reportoutputtype(reportoutputtypeDetail: any) {
        if (reportoutputtypeDetail.value && reportoutputtypeDetail) {

        }
    }

    onEntered_viewhtmltype(value: any) {
        this.viewhtmltype_Suggestions = this.viewhtmltype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_viewhtmltype(viewhtmltypeDetail: any) {
        if (viewhtmltypeDetail.value && viewhtmltypeDetail) {

        }
    }

    onEntered_workflowhtmltype(value: any) {
        this.workflowhtmltype_Suggestions = this.workflowhtmltype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_workflowhtmltype(workflowhtmltypeDetail: any) {
        if (workflowhtmltypeDetail.value && workflowhtmltypeDetail) {

        }
    }

    onEntered_recordtype(value: any) {
        this.recordtype_Suggestions = this.recordtype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_recordtype(recordtypeDetail: any) {
        if (recordtypeDetail.value && recordtypeDetail) {

        }
    }

    onEntered_dashboardid(value: any) {
        this.dashboardid_Suggestions = this.dashboardid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_dashboardid(dashboardidDetail: any) {
        if (dashboardidDetail.value && dashboardidDetail) {

        }
    }

    onEntered_schedule(value: any) {
        this.schedule_Suggestions = this.schedule_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_schedule(scheduleDetail: any) {
        if (scheduleDetail.value && scheduleDetail) {

        }
    }
    boreportcolumnsmoveUp(){}
    boreportcolumnsmoveDown(){}


    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.boreport_Form != null)
            this.boreport_Form.reset();
        this.boreport_Form.patchValue({
        });
        this.tbl_boreportdetails?.reset();
        this.tbl_boreportothertables?.reset();
        this.tbl_boreportcolumns?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let reportid = this.boreport_Form.get('reportid').value;
        if (reportid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.boreport_service.delete_boreport(reportid);
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
        this.boreport_Form.patchValue({
            reportid: null
        });
        if (this.formData.reportid != null) this.formData.reportid = null;
        this.tbl_boreportdetails.data = [];
        this.tbl_boreportothertables.data = [];
        this.tbl_boreportcolumns.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.boreport_Form.patchValue({
            reportid: null
        });
        if (this.formData.reportid != null) this.formData.reportid = null;
        for (let i = 0; i < this.tbl_boreportdetails.data.length; i++) {
            this.tbl_boreportdetails.data[i].reportdetailid = null;
        }
        for (let i = 0; i < this.tbl_boreportothertables.data.length; i++) {
            this.tbl_boreportothertables.data[i].othertableid = null;
        }
        for (let i = 0; i < this.tbl_boreportcolumns.data.length; i++) {
            this.tbl_boreportcolumns.data[i].reportcolumnid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'reportid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "nextschedule")
                        this.boreport_Form.patchValue({ "nextschedule": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreport_Form.controls[key] != undefined) {
                                this.boreport_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    reportmodule_onChange(evt: any) {
        let e = this.f.reportmodule.value as any;
    }
    reporttype_onChange(evt: any) {
        let e = this.f.reporttype.value as any;
    }
    sidefiltertype_onChange(evt: any) {
        let e = this.f.sidefiltertype.value as any;
    }
    datefiltertype_onChange(evt: any) {
        let e = this.f.datefiltertype.value as any;
    }
    groupbyrelationship_onChange(evt: any) {
        let e = this.f.groupbyrelationship.value as any;
    }
    jointype_onChange(evt: any) {
        let e = this.f.jointype.value as any;
    }
    reportoutputtype_onChange(evt: any) {
        let e = this.f.reportoutputtype.value as any;
    }
    viewhtmltype_onChange(evt: any) {
        let e = this.f.viewhtmltype.value as any;
    }
    workflowhtmltype_onChange(evt: any) {
        let e = this.f.workflowhtmltype.value as any;
    }
    recordtype_onChange(evt: any) {
        let e = this.f.recordtype.value as any;
    }
    dashboardid_onChange(evt: any) {
        let e = this.f.dashboardid.value as any;
    }
    schedule_onChange(evt: any) {
        let e = this.f.schedule.value as any;
    }

    edit_boreports() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_boreportdetails.fkname = "reportid";
            this.tbl_boreportdetails.fk = this.formid;
            this.tbl_boreportdetails.paramsChange('670');
            this.tbl_boreportothertables.fkname = "reportid";
            this.tbl_boreportothertables.fk = this.formid;
            this.tbl_boreportothertables.paramsChange('671');
            this.tbl_boreportcolumns.fkname = "reportid";
            this.tbl_boreportcolumns.fk = this.formid;
            this.tbl_boreportcolumns.paramsChange('xkxtx');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.boreport_service.get_boreports_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.boreport;
                let formproperty = res.boreport.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.boreport.pkcol;
                this.formid = res.boreport.reportid;
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
            this.formData = res.boreport;
            this.formid = res.boreport.reportid;
            this.pkcol = res.boreport.pkcol;
            this.bmyrecord = false;
            if ((res.boreport as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.boreport_Form.patchValue({
                pkcol: res.boreport.pkcol,
                reportid: res.boreport.reportid,
                reportcode: res.boreport.reportcode,
                reportname: res.boreport.reportname,
                reportmodule: this.sharedService.getValue("value", this.reportmodule_List, res.boreport.reportmodule, 'reportmodule'),
                reportmoduledesc: res.boreport.reportmoduledesc,
                actionkey: res.boreport.actionkey,
                reporttype: this.sharedService.getValue("value", this.reporttype_List, res.boreport.reporttype, 'reporttype'),
                reporttypedesc: res.boreport.reporttypedesc,
                columns: res.boreport.columns,
                sidefilter: res.boreport.sidefilter,
                sidefiltertype: this.sharedService.getValue("value", this.sidefiltertype_List, res.boreport.sidefiltertype, 'sidefiltertype'),
                sidefiltertypedesc: res.boreport.sidefiltertypedesc,
                sidefilters: res.boreport.sidefilters,
                maintablename: res.boreport.maintablename,
                maintablealias: res.boreport.maintablealias,
                maintableidentityfield: res.boreport.maintableidentityfield,
                pk: res.boreport.pk,
                query: res.boreport.query,
                postquery: res.boreport.postquery,
                wherecondition: res.boreport.wherecondition,
                cardtype: res.boreport.cardtype,
                html: res.boreport.html,
                calendar: res.boreport.calendar,
                kanbanview: res.boreport.kanbanview,
                kanbankey: res.boreport.kanbankey,
                datefilter: res.boreport.datefilter,
                datefiltercolumnname: res.boreport.datefiltercolumnname,
                datefiltertype: this.sharedService.getValue("value", this.datefiltertype_List, res.boreport.datefiltertype, 'datefiltertype'),
                datefiltertypedesc: res.boreport.datefiltertypedesc,
                groupby: res.boreport.groupby,
                groupbytext: res.boreport.groupbytext,
                groupby2: res.boreport.groupby2,
                groupby2text: res.boreport.groupby2text,
                groupbyrelationship: this.sharedService.getValue("value", this.groupbyrelationship_List, res.boreport.groupbyrelationship, 'groupbyrelationship'),
                groupbyrelationshipdesc: res.boreport.groupbyrelationshipdesc,
                sortby1: res.boreport.sortby1,
                sortby2: res.boreport.sortby2,
                sortby3: res.boreport.sortby3,
                parentid: res.boreport.parentid,
                parentdescription: res.boreport.parentdescription,
                detailtablename: res.boreport.detailtablename,
                detailtablealias: res.boreport.detailtablealias,
                jointype: this.sharedService.getValue("value", this.jointype_List, res.boreport.jointype, 'jointype'),
                jointypedesc: res.boreport.jointypedesc,
                detailtableidentityfield: res.boreport.detailtableidentityfield,
                detailtablefk: res.boreport.detailtablefk,
                detailtableconcatenate: res.boreport.detailtableconcatenate,
                detailtableheader: res.boreport.detailtableheader,
                detailtablefooter: res.boreport.detailtablefooter,
                detailtablequery: res.boreport.detailtablequery,
                masterdetailwhere: res.boreport.masterdetailwhere,
                numrows: res.boreport.numrows,
                reportoutputtype: this.sharedService.getValue("value", this.reportoutputtype_List, res.boreport.reportoutputtype, 'reportoutputtype'),
                reportoutputtypedesc: res.boreport.reportoutputtypedesc,
                noheader: res.boreport.noheader,
                header: res.boreport.header,
                footer: res.boreport.footer,
                headerquery: res.boreport.headerquery,
                footerquery: res.boreport.footerquery,
                headerquery1: res.boreport.headerquery1,
                footerquery1: res.boreport.footerquery1,
                headerquery2: res.boreport.headerquery2,
                footerquery2: res.boreport.footerquery2,
                headerquery3: res.boreport.headerquery3,
                footerquery3: res.boreport.footerquery3,
                headerquery4: res.boreport.headerquery4,
                footerquery4: res.boreport.footerquery4,
                headerquery5: res.boreport.headerquery5,
                footerquery5: res.boreport.footerquery5,
                header1: res.boreport.header1,
                footer1: res.boreport.footer1,
                header2: res.boreport.header2,
                footer2: res.boreport.footer2,
                header3: res.boreport.header3,
                footer3: res.boreport.footer3,
                header4: res.boreport.header4,
                footer4: res.boreport.footer4,
                header5: res.boreport.header5,
                footer5: res.boreport.footer5,
                status: res.boreport.status,
                statusdesc: res.boreport.statusdesc,
                css: res.boreport.css,
                viewhtmltype: this.sharedService.getValue("value", this.viewhtmltype_List, res.boreport.viewhtmltype, 'viewhtmltype'),
                viewhtmltypedesc: res.boreport.viewhtmltypedesc,
                viewhtml: res.boreport.viewhtml,
                viewcss: res.boreport.viewcss,
                reporthtml: res.boreport.reporthtml,
                workflowhtmltype: this.sharedService.getValue("value", this.workflowhtmltype_List, res.boreport.workflowhtmltype, 'workflowhtmltype'),
                workflowhtmltypedesc: res.boreport.workflowhtmltypedesc,
                workflowhtml: res.boreport.workflowhtml,
                component: res.boreport.component,
                alternateview: res.boreport.alternateview,
                recordtype: this.sharedService.getValue("value", this.recordtype_List, res.boreport.recordtype, 'recordtype'),
                recordtypedesc: res.boreport.recordtypedesc,
                userfield: res.boreport.userfield,
                employeefield: res.boreport.employeefield,
                userfiltertype: res.boreport.userfiltertype,
                rolefield: res.boreport.rolefield,
                dashboardid: this.sharedService.getValue("value", this.dashboardid_List, res.boreport.dashboardid, 'dashboardid'),
                dashboardiddesc: res.boreport.dashboardiddesc,
                tableheader: res.boreport.tableheader,
                reportjsondata: res.boreport.reportjsondata,
                helptext: res.boreport.helptext,
                filters: res.boreport.filters,
                filtercolumns: res.boreport.filtercolumns,
                groupbyfooter: res.boreport.groupbyfooter,
                email: res.boreport.email,
                schedule: this.sharedService.getValue("value", this.schedule_List, res.boreport.schedule, 'schedule'),
                scheduledesc: res.boreport.scheduledesc,
                nextschedule: res.boreport.nextschedule == null ? null : new Date(res.boreport.nextschedule),
            });
            this.boreport_menuactions = res.boreport_menuactions;
            this.boreportdetail_menuactions = res.boreportdetail_menuactions;
            this.boreportdetails_visiblelist = res.boreportdetails_visiblelist;
            this.boreportothertable_menuactions = res.boreportothertable_menuactions;
            this.boreportothertables_visiblelist = res.boreportothertables_visiblelist;
            this.boreportcolumn_menuactions = res.boreportcolumn_menuactions;
            this.boreportcolumns_visiblelist = res.boreportcolumns_visiblelist;
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

        for (let key in this.boreport_Form.controls) {
            let val = this.boreport_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boreport_Form.controls[key] != null) {
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
        formData = this.boreport_Form.getRawValue();
        formData.reportmodule = (this.boreport_Form.get('reportmodule'))?.value?.value;
        formData.reporttype = (this.boreport_Form.get('reporttype'))?.value?.value;
        formData.sidefiltertype = (this.boreport_Form.get('sidefiltertype'))?.value?.value;
        formData.datefiltertype = (this.boreport_Form.get('datefiltertype'))?.value?.value;
        formData.groupbyrelationship = (this.boreport_Form.get('groupbyrelationship'))?.value?.value;
        formData.jointype = (this.boreport_Form.get('jointype'))?.value?.value;
        formData.reportoutputtype = (this.boreport_Form.get('reportoutputtype'))?.value?.value;
        formData.viewhtmltype = (this.boreport_Form.get('viewhtmltype'))?.value?.value;
        formData.workflowhtmltype = (this.boreport_Form.get('workflowhtmltype'))?.value?.value;
        formData.recordtype = (this.boreport_Form.get('recordtype'))?.value?.value;
        formData.dashboardid = (this.boreport_Form.get('dashboardid'))?.value?.value;
        formData.schedule = (this.boreport_Form.get('schedule'))?.value?.value;
        formData.nextschedule = this.sharedService.getDate(this.boreport_Form.get('nextschedule').value)
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.boreport_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.reportid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boreport_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.GetFormValues();
        console.log(obj);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
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
            Object.keys(this.boreport_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.boreport_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.boreport_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.boreport_service.save_boreports(this.formData, this.Deleted_boreportdetail_IDs, this.Deleted_boreportothertable_IDs, this.Deleted_boreportcolumn_IDs, this.tbl_boreportdetails?.data, this.tbl_boreportothertables?.data, this.tbl_boreportcolumns?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).boreport);
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
                    this.objvalues.push((res as any).boreport);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.boreport_Form.markAsUntouched();
            this.boreport_Form.markAsPristine();
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

    AddOrEdit_boreportdetail(event: any, reportdetailid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportdetailid: event?.data?.pk, reportid, visiblelist: this.boreportdetails_visiblelist, hidelist: this.boreportdetails_hidelist, ScreenType: 2, status: this.boreport_Form.get('status').value, wherecondition: this.boreport_Form.get('wherecondition').value, footer: this.boreport_Form.get('footer').value, header: this.boreport_Form.get('header').value };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(boreportdetailComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportdetails.add(res[i]);
                    }
                }
                else {
                    this.tbl_boreportdetails.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportdetail_IDs += childID + ",";
        this.tbl_boreportdetails.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boreportothertable(event: any, othertableid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, othertableid: event?.data?.pk, reportid, visiblelist: this.boreportothertables_visiblelist, hidelist: this.boreportothertables_hidelist, ScreenType: 2, status: this.boreport_Form.get('status').value, wherecondition: this.boreport_Form.get('wherecondition').value, jointype: this.boreport_Form.get('jointype').value?.value, jointypedesc: this.boreport_Form.get('jointypedesc').value?.label };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(boreportothertableComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportothertables.add(res[i]);
                    }
                }
                else {
                    this.tbl_boreportothertables.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportothertable(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportothertable_IDs += childID + ",";
        this.tbl_boreportothertables.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boreportcolumn(event: any, reportcolumnid: any, reportid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportcolumnid: event?.data?.pk, reportid, visiblelist: this.boreportcolumns_visiblelist, hidelist: this.boreportcolumns_hidelist, ScreenType: 2, header: this.boreport_Form.get('header').value, status: this.boreport_Form.get('status').value, groupby: this.boreport_Form.get('groupby').value };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(boreportcolumnComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportcolumns.add(res[i]);
                    }
                }
                else {
                    this.tbl_boreportcolumns.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boreportcolumn(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boreportcolumn_IDs += childID + ",";
        this.tbl_boreportcolumns.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    MakeAllHide() {

        for (let i = 0; i < this.tbl_boreportcolumns.data.length; i++) {
            this.tbl_boreportcolumns.data[i].hide = true;
        }

        this.onSubmitData(false);
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boreportdetails
    boreportdetails_settings: any;

    show_boreportdetails_Checkbox() {
        //debugger;
    }
    delete_boreportdetails_All() {
        //this.tbl_boreportdetails.source.settings['selectMode'] = 'single';
    }
    show_boreportdetails_InActive() {
    }
    enable_boreportdetails_InActive() {
    }
    async boreportdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_boreportdetails(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_boreportdetail(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_boreportdetail_IDs += event.data.pk + ",";

        }
    }
    async onCustom_boreportdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportdetails");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_boreportdetails_GridSelected(event: any) {
        //this.boreportdetails_selectedindex=this.tbl_boreportdetails.source.data.findIndex(i => i.reportdetailid === event.data.reportdetailid);
    }
    Is_boreportdetails_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_boreportdetails_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes boreportdetails
    //start of Grid Codes boreportothertables
    boreportothertables_settings: any;

    show_boreportothertables_Checkbox() {
        //debugger;
    }
    delete_boreportothertables_All() {
        //this.tbl_boreportothertables.source.settings['selectMode'] = 'single';
    }
    show_boreportothertables_InActive() {
    }
    enable_boreportothertables_InActive() {
    }
    async boreportothertables_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_boreportothertables(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_boreportothertable(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_boreportothertable_IDs += event.data.pk + ",";

        }
    }
    async onCustom_boreportothertables_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportothertables");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_boreportothertables_GridSelected(event: any) {
        //this.boreportothertables_selectedindex=this.tbl_boreportothertables.source.data.findIndex(i => i.othertableid === event.data.othertableid);
    }
    Is_boreportothertables_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_boreportothertables_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes boreportothertables
    //start of Grid Codes boreportcolumns
    boreportcolumns_settings: any;

    show_boreportcolumns_Checkbox() {
        //debugger;
    }
    delete_boreportcolumns_All() {
        //this.tbl_boreportcolumns.source.settings['selectMode'] = 'single';
    }
    show_boreportcolumns_InActive() {
    }
    enable_boreportcolumns_InActive() {
    }
    async boreportcolumns_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_boreportcolumns(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_boreportcolumn(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_boreportcolumn_IDs += event.data.pk + ",";

        }
    }
    async onCustom_boreportcolumns_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boreportcolumns");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_boreportcolumns_GridSelected(event: any) {
        //this.boreportcolumns_selectedindex=this.tbl_boreportcolumns.source.data.findIndex(i => i.reportcolumnid === event.data.reportcolumnid);
    }
    Is_boreportcolumns_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_boreportcolumns_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes boreportcolumns

}



