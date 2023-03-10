import { bodashboardService } from './../../../service/bodashboard.service';
import { bodashboard } from './../../../model/bodashboard.model';
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
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
import { bodashboarddetailComponent } from './../../../pages/forms/bodashboarddetail/bodashboarddetail.component';
import { bodashboarddetailService } from './../../../service/bodashboarddetail.service';
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
    selector: 'app-bodashboard',
    templateUrl: './bodashboard.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class bodashboardComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: bodashboard;
    list: bodashboard[];
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
    bfilterPopulate_bodashboards: boolean = false;
    bfilterPopulate_bodashboarddetails: boolean = false;
    bodashboard_menuactions: any = []
    bodashboarddetail_menuactions: any = []
    bodashboarddetail_visible: boolean = true;
    bodashboarddetail_disabled: boolean = false;
    @ViewChild('tbl_bodashboarddetails', { static: false }) tbl_bodashboarddetails!: ReportViewerCtrlComponent;

    bodashboard_Form: FormGroup;

    dashboardid_List: DropDownValues[];
    dashboardid_Suggestions: any[];
    dashboardid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    bodashboarddetails_visiblelist: any;
    bodashboarddetails_hidelist: any;

    Deleted_bodashboarddetail_IDs: string = "";
    bodashboarddetails_ID: string = "1";
    bodashboarddetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private bodashboard_service: bodashboardService,
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
            this.bodashboard_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                dashboardid: [null],
                dashboardiddesc: [null],
                dashboardname: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                rows: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                cols: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                design: [null, Validators.compose([Validators.maxLength(100)])],
                remarks: [null, Validators.compose([Validators.maxLength(100)])],
                userid: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                module: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                helptext: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.bodashboard_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.bodashboard_Form.dirty && this.bodashboard_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.dashboardid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.dashboardid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.dashboardid && pkDetail) {
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
            let bodashboardid = null;

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
            this.formData = new bodashboard();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = bodashboardid;
            //alert(bodashboardid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bodashboard_service.getDefaultData().then(res => {
                this.dashboardid_List = res.list_dashboardid.value;
                this.dashboardid_Suggestions = this.dashboardid_List;
                if (this.formData?.dashboardid != undefined && this.formData?.dashboardid != null) {
                    this.bodashboard_Form.patchValue({
                        dashboardid: this.sharedService.getValue("value", this.dashboardid_List, this.formData.dashboardid?.toString(), 'dashboardid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.bodashboard_service.get_bodashboards_List().then(res => {
                this.pkList = res as bodashboard[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'bodashboardsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.bodashboard_Form.markAsUntouched();
            this.bodashboard_Form.markAsPristine();
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




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.bodashboard_Form != null)
            this.bodashboard_Form.reset();
        this.bodashboard_Form.patchValue({
        });
        this.tbl_bodashboarddetails?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let dashboardid = this.bodashboard_Form.get('dashboardid').value;
        if (dashboardid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.bodashboard_service.delete_bodashboard(dashboardid);
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
        this.bodashboard_Form.patchValue({
            dashboardid: null
        });
        if (this.formData.dashboardid != null) this.formData.dashboardid = null;
        this.tbl_bodashboarddetails.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.bodashboard_Form.patchValue({
            dashboardid: null
        });
        if (this.formData.dashboardid != null) this.formData.dashboardid = null;
        for (let i = 0; i < this.tbl_bodashboarddetails.data.length; i++) {
            this.tbl_bodashboarddetails.data[i].dashboarddetailid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'dashboardid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "remarks")
                        this.bodashboard_Form.patchValue({ "remarks": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboard_Form.controls[key] != undefined) {
                                this.bodashboard_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
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

    edit_bodashboards() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_bodashboarddetails.fkname = "dashboardid";
            this.tbl_bodashboarddetails.fk = this.formid;
            this.tbl_bodashboarddetails.paramsChange('657');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.bodashboard_service.get_bodashboards_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.bodashboard;
                let formproperty = res.bodashboard.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.bodashboard.pkcol;
                this.formid = res.bodashboard.dashboardid;
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
            this.formData = res.bodashboard;
            this.formid = res.bodashboard.dashboardid;
            this.pkcol = res.bodashboard.pkcol;
            this.bmyrecord = false;
            if ((res.bodashboard as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.bodashboard_Form.patchValue({
                pkcol: res.bodashboard.pkcol,
                dashboardid: this.sharedService.getValue("value", this.dashboardid_List, res.bodashboard.dashboardid, 'dashboardid'),
                dashboardiddesc: res.bodashboard.dashboardiddesc,
                dashboardname: res.bodashboard.dashboardname,
                rows: res.bodashboard.rows,
                cols: res.bodashboard.cols,
                design: res.bodashboard.design,
                remarks: this.sharedService.JSON_parse(res.bodashboard.remarks),
                userid: res.bodashboard.userid,
                module: res.bodashboard.module,
                helptext: res.bodashboard.helptext,
                status: res.bodashboard.status,
                statusdesc: res.bodashboard.statusdesc,
            });
            this.bodashboard_menuactions = res.bodashboard_menuactions;
            this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
            this.bodashboarddetails_visiblelist = res.bodashboarddetails_visiblelist;
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

        for (let key in this.bodashboard_Form.controls) {
            let val = this.bodashboard_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.bodashboard_Form.controls[key] != null) {
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
        formData = this.bodashboard_Form.getRawValue();
        formData.dashboardid = (this.bodashboard_Form.get('dashboardid'))?.value?.value;
        if (this.bodashboard_Form.get('remarks').value != null) formData.remarks = JSON.stringify(this.bodashboard_Form.get('remarks').value);
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.bodashboard_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.dashboardid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.bodashboard_Form.valid) {
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
            Object.keys(this.bodashboard_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.bodashboard_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.bodashboard_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.bodashboard_service.save_bodashboards(this.formData, this.Deleted_bodashboarddetail_IDs, this.tbl_bodashboarddetails?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).bodashboard);
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
                    this.objvalues.push((res as any).bodashboard);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.bodashboard_Form.markAsUntouched();
            this.bodashboard_Form.markAsPristine();
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

    AddOrEdit_bodashboarddetail(event: any, dashboarddetailid: any, dashboardid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, dashboarddetailid: event?.data?.pk, dashboardid, visiblelist: this.bodashboarddetails_visiblelist, hidelist: this.bodashboarddetails_hidelist, ScreenType: 2, dashboardname: this.bodashboard_Form.get('dashboardname').value, status: this.bodashboard_Form.get('status').value };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(bodashboarddetailComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bodashboarddetails.add(res[i]);
                    }
                }
                else {
                    this.tbl_bodashboarddetails.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_bodashboarddetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_bodashboarddetail_IDs += childID + ",";
        this.tbl_bodashboarddetails.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bodashboarddetails
    bodashboarddetails_settings: any;

    show_bodashboarddetails_Checkbox() {
        //debugger;
    }
    delete_bodashboarddetails_All() {
        //this.tbl_bodashboarddetails.source.settings['selectMode'] = 'single';
    }
    show_bodashboarddetails_InActive() {
    }
    enable_bodashboarddetails_InActive() {
    }
    async bodashboarddetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_bodashboarddetails(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_bodashboarddetail(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_bodashboarddetail_IDs += event.data.pk + ",";

        }
    }
    async onCustom_bodashboarddetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "bodashboarddetails");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_bodashboarddetails_GridSelected(event: any) {
        //this.bodashboarddetails_selectedindex=this.tbl_bodashboarddetails.source.data.findIndex(i => i.dashboarddetailid === event.data.dashboarddetailid);
    }
    Is_bodashboarddetails_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_bodashboarddetails_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes bodashboarddetails

}



