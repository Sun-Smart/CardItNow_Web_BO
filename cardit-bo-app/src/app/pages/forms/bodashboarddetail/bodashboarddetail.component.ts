import { bodashboarddetailService } from './../../../service/bodashboarddetail.service';
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
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
    selector: 'app-bodashboarddetail',
    templateUrl: './bodashboarddetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bodashboarddetailComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: bodashboarddetail;
    list: bodashboarddetail[];
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
    bfilterPopulate_bodashboarddetails: boolean = false;
    bodashboarddetail_menuactions: any = []

    bodashboarddetail_Form: FormGroup;

    dashboardid_List: DropDownValues[];
    dashboardid_Suggestions: any[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    charttype_List: DropDownValues[];
    charttype_Suggestions: any[];
    charttype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter1type_List: DropDownValues[];
    parameter1type_Suggestions: any[];
    parameter1type_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter1datetype_List: DropDownValues[];
    parameter1datetype_Suggestions: any[];
    parameter1datetype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter2type_List: DropDownValues[];
    parameter2type_Suggestions: any[];
    parameter2type_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter2datetype_List: DropDownValues[];
    parameter2datetype_Suggestions: any[];
    parameter2datetype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter3type_List: DropDownValues[];
    parameter3type_Suggestions: any[];
    parameter3type_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    parameter3datetype_List: DropDownValues[];
    parameter3datetype_Suggestions: any[];
    parameter3datetype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    menuid_List: DropDownValues[];
    menuid_Suggestions: any[];
    menuid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private bodashboarddetail_service: bodashboarddetailService,
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
            this.bodashboarddetail_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                dashboarddetailid: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                dashboardid: [null],
                dashboardiddesc: [null],
                dashboardname: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                title: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                row: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                col: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                charttype: [null, Validators.compose([Validators.required,])],
                charttypedesc: [null],
                tablename: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                recordname: [null, Validators.compose([Validators.maxLength(160)])],
                parameter: [null],
                name: [null, Validators.compose([Validators.maxLength(160)])],
                value: [null, Validators.compose([Validators.maxLength(160)])],
                parameter1variable: [null, Validators.compose([Validators.maxLength(100)])],
                parameter1type: [null],
                parameter1typedesc: [null],
                parameter1datetype: [null],
                parameter1datetypedesc: [null],
                parameter2variable: [null, Validators.compose([Validators.maxLength(100)])],
                parameter2type: [null],
                parameter2typedesc: [null],
                parameter2datetype: [null],
                parameter2datetypedesc: [null],
                parameter3variable: [null, Validators.compose([Validators.maxLength(100)])],
                parameter3type: [null],
                parameter3typedesc: [null],
                parameter3datetype: [null],
                parameter3datetypedesc: [null],
                backgroundcolor: [null, Validators.compose([Validators.maxLength(100)])],
                hoverbackgroundcolor: [null, Validators.compose([Validators.maxLength(100)])],
                bordercolor: [null, Validators.compose([Validators.maxLength(100)])],
                menuid: [null],
                menuiddesc: [null],
                reportid: [null, Validators.compose([Validators.maxLength(10)])],
                helptext: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.bodashboarddetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.bodashboarddetail_Form.dirty && this.bodashboarddetail_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.dashboarddetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.dashboarddetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.dashboarddetailid && pkDetail) {
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
            let bodashboarddetailid = null;

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
            this.formData = new bodashboarddetail();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = bodashboarddetailid;
            //alert(bodashboarddetailid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bodashboarddetail_service.getDefaultData().then(res => {
                this.dashboardid_List = res.list_dashboardid.value;
                this.dashboardid_Suggestions = this.dashboardid_List;
                if (this.formData?.dashboardid != undefined && this.formData?.dashboardid != null) {
                    this.bodashboarddetail_Form.patchValue({
                        dashboardid: this.sharedService.getValue("value", this.dashboardid_List, this.formData.dashboardid?.toString(), 'dashboardid')
                    });
                }
                this.charttype_List = res.list_charttype.value;
                if (this.formData?.charttype != undefined && this.formData?.charttype != null) {
                    this.bodashboarddetail_Form.patchValue({
                        charttype: this.formData.charttype
                    });
                }
                this.parameter1type_List = res.list_parameter1type.value;
                this.parameter1type_Suggestions = this.parameter1type_List;
                if (this.formData?.parameter1type != undefined && this.formData?.parameter1type != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter1type: this.sharedService.getValue("value", this.parameter1type_List, this.formData.parameter1type?.toString(), 'parameter1type')
                    });
                }
                this.parameter1datetype_List = res.list_parameter1datetype.value;
                if (this.formData?.parameter1datetype != undefined && this.formData?.parameter1datetype != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter1datetype: this.formData.parameter1datetype
                    });
                }
                this.parameter2type_List = res.list_parameter2type.value;
                this.parameter2type_Suggestions = this.parameter2type_List;
                if (this.formData?.parameter2type != undefined && this.formData?.parameter2type != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter2type: this.sharedService.getValue("value", this.parameter2type_List, this.formData.parameter2type?.toString(), 'parameter2type')
                    });
                }
                this.parameter2datetype_List = res.list_parameter2datetype.value;
                if (this.formData?.parameter2datetype != undefined && this.formData?.parameter2datetype != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter2datetype: this.formData.parameter2datetype
                    });
                }
                this.parameter3type_List = res.list_parameter3type.value;
                this.parameter3type_Suggestions = this.parameter3type_List;
                if (this.formData?.parameter3type != undefined && this.formData?.parameter3type != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter3type: this.sharedService.getValue("value", this.parameter3type_List, this.formData.parameter3type?.toString(), 'parameter3type')
                    });
                }
                this.parameter3datetype_List = res.list_parameter3datetype.value;
                if (this.formData?.parameter3datetype != undefined && this.formData?.parameter3datetype != null) {
                    this.bodashboarddetail_Form.patchValue({
                        parameter3datetype: this.formData.parameter3datetype
                    });
                }
                this.menuid_List = res.list_menuid.value;
                this.menuid_Suggestions = this.menuid_List;
                if (this.formData?.menuid != undefined && this.formData?.menuid != null) {
                    this.bodashboarddetail_Form.patchValue({
                        menuid: this.sharedService.getValue("value", this.menuid_List, this.formData.menuid?.toString(), 'menuid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.bodashboarddetail_service.get_bodashboarddetails_List().then(res => {
                this.pkList = res as bodashboarddetail[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'bodashboarddetailsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.bodashboarddetail_Form.markAsUntouched();
            this.bodashboarddetail_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_dashboardid(value: any) {
        this.dashboardid_Suggestions = this.dashboardid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_dashboardid(dashboardidDetail: any) {
        if (dashboardidDetail.value && dashboardidDetail) {

        }
    }

    onEntered_charttype(value: any) {
        this.charttype_Suggestions = this.charttype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_charttype(charttypeDetail: any) {
        if (charttypeDetail.value && charttypeDetail) {

        }
    }

    onEntered_parameter1type(value: any) {
        this.parameter1type_Suggestions = this.parameter1type_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter1type(parameter1typeDetail: any) {
        if (parameter1typeDetail.value && parameter1typeDetail) {

        }
    }

    onEntered_parameter1datetype(value: any) {
        this.parameter1datetype_Suggestions = this.parameter1datetype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter1datetype(parameter1datetypeDetail: any) {
        if (parameter1datetypeDetail.value && parameter1datetypeDetail) {

        }
    }

    onEntered_parameter2type(value: any) {
        this.parameter2type_Suggestions = this.parameter2type_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter2type(parameter2typeDetail: any) {
        if (parameter2typeDetail.value && parameter2typeDetail) {

        }
    }

    onEntered_parameter2datetype(value: any) {
        this.parameter2datetype_Suggestions = this.parameter2datetype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter2datetype(parameter2datetypeDetail: any) {
        if (parameter2datetypeDetail.value && parameter2datetypeDetail) {

        }
    }

    onEntered_parameter3type(value: any) {
        this.parameter3type_Suggestions = this.parameter3type_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter3type(parameter3typeDetail: any) {
        if (parameter3typeDetail.value && parameter3typeDetail) {

        }
    }

    onEntered_parameter3datetype(value: any) {
        this.parameter3datetype_Suggestions = this.parameter3datetype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_parameter3datetype(parameter3datetypeDetail: any) {
        if (parameter3datetypeDetail.value && parameter3datetypeDetail) {

        }
    }

    onEntered_menuid(value: any) {
        this.menuid_Suggestions = this.menuid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_menuid(menuidDetail: any) {
        if (menuidDetail.value && menuidDetail) {

        }
    }




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.bodashboarddetail_Form != null)
            this.bodashboarddetail_Form.reset();
        this.bodashboarddetail_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let dashboarddetailid = this.bodashboarddetail_Form.get('dashboarddetailid').value;
        if (dashboarddetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.bodashboarddetail_service.delete_bodashboarddetail(dashboarddetailid);
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
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: null
        });
        if (this.formData.dashboarddetailid != null) this.formData.dashboarddetailid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: null
        });
        if (this.formData.dashboarddetailid != null) this.formData.dashboarddetailid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'dashboarddetailid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboarddetail_Form.controls[key] != undefined) {
                                this.bodashboarddetail_Form.controls[key].disable({ onlySelf: true });
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
    dashboardid_onChange(evt: any) {
        let e = this.f.dashboardid.value as any;
    }
    charttype_onChange(evt: any) {
        let e = this.f.charttype.value as any;
    }
    parameter1type_onChange(evt: any) {
        let e = this.f.parameter1type.value as any;
    }
    parameter1datetype_onChange(evt: any) {
        let e = this.f.parameter1datetype.value as any;
    }
    parameter2type_onChange(evt: any) {
        let e = this.f.parameter2type.value as any;
    }
    parameter2datetype_onChange(evt: any) {
        let e = this.f.parameter2datetype.value as any;
    }
    parameter3type_onChange(evt: any) {
        let e = this.f.parameter3type.value as any;
    }
    parameter3datetype_onChange(evt: any) {
        let e = this.f.parameter3datetype.value as any;
    }
    menuid_onChange(evt: any) {
        let e = this.f.menuid.value as any;
    }

    edit_bodashboarddetails() {
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
            this.bodashboarddetail_service.get_bodashboarddetails_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.bodashboarddetail;
                let formproperty = res.bodashboarddetail.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.bodashboarddetail.pkcol;
                this.formid = res.bodashboarddetail.dashboarddetailid;
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
            this.formData = res.bodashboarddetail;
            this.formid = res.bodashboarddetail.dashboarddetailid;
            this.pkcol = res.bodashboarddetail.pkcol;
            this.bmyrecord = false;
            if ((res.bodashboarddetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.bodashboarddetail_Form.patchValue({
                pkcol: res.bodashboarddetail.pkcol,
                dashboarddetailid: res.bodashboarddetail.dashboarddetailid,
                dashboardid: this.sharedService.getValue("value", this.dashboardid_List, res.bodashboarddetail.dashboardid, 'dashboardid'),
                dashboardiddesc: res.bodashboarddetail.dashboardiddesc,
                dashboardname: res.bodashboarddetail.dashboardname,
                title: res.bodashboarddetail.title,
                row: res.bodashboarddetail.row,
                col: res.bodashboarddetail.col,
                charttype: this.sharedService.getValue("value", this.charttype_List, res.bodashboarddetail.charttype, 'charttype'),
                charttypedesc: res.bodashboarddetail.charttypedesc,
                tablename: res.bodashboarddetail.tablename,
                recordname: res.bodashboarddetail.recordname,
                parameter: res.bodashboarddetail.parameter,
                name: res.bodashboarddetail.name,
                value: res.bodashboarddetail.value,
                parameter1variable: res.bodashboarddetail.parameter1variable,
                parameter1type: this.sharedService.getValue("value", this.parameter1type_List, res.bodashboarddetail.parameter1type, 'parameter1type'),
                parameter1typedesc: res.bodashboarddetail.parameter1typedesc,
                parameter1datetype: this.sharedService.getValue("value", this.parameter1datetype_List, res.bodashboarddetail.parameter1datetype, 'parameter1datetype'),
                parameter1datetypedesc: res.bodashboarddetail.parameter1datetypedesc,
                parameter2variable: res.bodashboarddetail.parameter2variable,
                parameter2type: this.sharedService.getValue("value", this.parameter2type_List, res.bodashboarddetail.parameter2type, 'parameter2type'),
                parameter2typedesc: res.bodashboarddetail.parameter2typedesc,
                parameter2datetype: this.sharedService.getValue("value", this.parameter2datetype_List, res.bodashboarddetail.parameter2datetype, 'parameter2datetype'),
                parameter2datetypedesc: res.bodashboarddetail.parameter2datetypedesc,
                parameter3variable: res.bodashboarddetail.parameter3variable,
                parameter3type: this.sharedService.getValue("value", this.parameter3type_List, res.bodashboarddetail.parameter3type, 'parameter3type'),
                parameter3typedesc: res.bodashboarddetail.parameter3typedesc,
                parameter3datetype: this.sharedService.getValue("value", this.parameter3datetype_List, res.bodashboarddetail.parameter3datetype, 'parameter3datetype'),
                parameter3datetypedesc: res.bodashboarddetail.parameter3datetypedesc,
                backgroundcolor: res.bodashboarddetail.backgroundcolor,
                hoverbackgroundcolor: res.bodashboarddetail.hoverbackgroundcolor,
                bordercolor: res.bodashboarddetail.bordercolor,
                menuid: this.sharedService.getValue("value", this.menuid_List, res.bodashboarddetail.menuid, 'menuid'),
                menuiddesc: res.bodashboarddetail.menuiddesc,
                reportid: res.bodashboarddetail.reportid,
                helptext: res.bodashboarddetail.helptext,
                status: res.bodashboarddetail.status,
                statusdesc: res.bodashboarddetail.statusdesc,
            });
            this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
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

        for (let key in this.bodashboarddetail_Form.controls) {
            let val = this.bodashboarddetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bodashboarddetail_Form.controls[key] != null) {
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
        formData = this.bodashboarddetail_Form.getRawValue();
        formData.dashboardid = (this.bodashboarddetail_Form.get('dashboardid'))?.value?.value;
        formData.charttype = (this.bodashboarddetail_Form.get('charttype'))?.value?.value;
        formData.parameter1type = (this.bodashboarddetail_Form.get('parameter1type'))?.value?.value;
        formData.parameter1datetype = (this.bodashboarddetail_Form.get('parameter1datetype'))?.value?.value;
        formData.parameter2type = (this.bodashboarddetail_Form.get('parameter2type'))?.value?.value;
        formData.parameter2datetype = (this.bodashboarddetail_Form.get('parameter2datetype'))?.value?.value;
        formData.parameter3type = (this.bodashboarddetail_Form.get('parameter3type'))?.value?.value;
        formData.parameter3datetype = (this.bodashboarddetail_Form.get('parameter3datetype'))?.value?.value;
        formData.menuid = (this.bodashboarddetail_Form.get('menuid'))?.value?.uid;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.bodashboarddetail_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.dashboarddetailid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.bodashboarddetail_Form.valid) {
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
            Object.keys(this.bodashboarddetail_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.bodashboarddetail_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.bodashboarddetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.bodashboarddetail_service.save_bodashboarddetails(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).bodashboarddetail);
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
                    this.objvalues.push((res as any).bodashboarddetail);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.bodashboarddetail_Form.markAsUntouched();
            this.bodashboarddetail_Form.markAsPristine();
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



