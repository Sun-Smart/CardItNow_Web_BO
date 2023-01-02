import { boreportcolumnService } from './../../../service/boreportcolumn.service';
import { boreportcolumn } from './../../../model/boreportcolumn.model';
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
    selector: 'app-boreportcolumn',
    templateUrl: './boreportcolumn.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boreportcolumnComponent implements OnInit {
    action:any;
    blockedDocument: boolean = false;
    formData: boreportcolumn;
    list: boreportcolumn[];
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

    bfilterPopulate_boreportcolumns: boolean = false;
    boreportcolumn_menuactions: any = []

    boreportcolumn_Form: FormGroup;

    datatype_List: DropDownValues[];
    datatype_Suggestions: any[];
    datatype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    filtertype_List: DropDownValues[];
    filtertype_Suggestions: any[];
    filtertype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private boreportcolumn_service: boreportcolumnService,
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
            this.boreportcolumn_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                reportcolumnid: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                reportid: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                tablealias: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                field: [null, Validators.compose([Validators.required, Validators.maxLength(160)])],
                header: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                columnalias: [null, Validators.compose([Validators.maxLength(100)])],
                hide: [null],
                derived: [null],
                datatype: [null, Validators.compose([Validators.maxLength(100)])],
                datatypedesc: [null],
                fkfilter: [null],
                filtertype: [null, Validators.compose([Validators.maxLength(10)])],
                filtertypedesc: [null],
                width: [null],
                nofilter: [null],
                groupby: [null],
                sum: [null],
                count: [null],
                colhtml: [null, Validators.compose([Validators.maxLength(400)])],
                poptitle: [null, Validators.compose([Validators.maxLength(100)])],
                link: [null],
                linkurl: [null, Validators.compose([Validators.pattern(/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),])],
                service: [null],
                servicename: [null],
                sp: [null],
                spname: [null],
                alert: [null],
                caps: [null],
                bold: [null],
                italic: [null],
                strikethrough: [null],
                bgcolor: [null],
                forecolor: [null],
                conditionstyle: [null, Validators.compose([Validators.maxLength(1000)])],
                performancestatusvalues: [null, Validators.compose([Validators.maxLength(200)])],
                status: [null],
                statusdesc: [null],
                notsortable: [null],
                sequence: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                sumcondition: [null],
                countcondition: [null],
                min: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                max: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                maxchars: [null],
                helptext: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.boreportcolumn_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.boreportcolumn_Form.dirty && this.boreportcolumn_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.reportcolumnid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.reportcolumnid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.reportcolumnid && pkDetail) {
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
            let boreportcolumnid = null;

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
            this.formData = new boreportcolumn();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = boreportcolumnid;
            //alert(boreportcolumnid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boreportcolumn_service.getDefaultData().then(res => {
                this.datatype_List = res.list_datatype.value;
                if (this.formData?.datatype != undefined && this.formData?.datatype != null) {
                    this.boreportcolumn_Form.patchValue({
                        datatype: this.formData.datatype
                    });
                }
                this.filtertype_List = res.list_filtertype.value;
                if (this.formData?.filtertype != undefined && this.formData?.filtertype != null) {
                    this.boreportcolumn_Form.patchValue({
                        filtertype: this.formData.filtertype
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.boreportcolumn_service.get_boreportcolumns_List().then(res => {
                this.pkList = res as boreportcolumn[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'boreportcolumnsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.boreportcolumn_Form.markAsUntouched();
            this.boreportcolumn_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_datatype(value: any) {
        this.datatype_Suggestions = this.datatype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_datatype(datatypeDetail: any) {
        if (datatypeDetail.value && datatypeDetail) {

        }
    }

    onEntered_filtertype(value: any) {
        this.filtertype_Suggestions = this.filtertype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_filtertype(filtertypeDetail: any) {
        if (filtertypeDetail.value && filtertypeDetail) {

        }
    }

    boreportcolumnsmoveUp(){}
    boreportcolumnsmoveDown(){}

    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.boreportcolumn_Form != null)
            this.boreportcolumn_Form.reset();
        this.boreportcolumn_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let reportcolumnid = this.boreportcolumn_Form.get('reportcolumnid').value;
        if (reportcolumnid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.boreportcolumn_service.delete_boreportcolumn(reportcolumnid);
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
        this.boreportcolumn_Form.patchValue({
            reportcolumnid: null
        });
        if (this.formData.reportcolumnid != null) this.formData.reportcolumnid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.boreportcolumn_Form.patchValue({
            reportcolumnid: null
        });
        if (this.formData.reportcolumnid != null) this.formData.reportcolumnid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'reportcolumnid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.boreportcolumn_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreportcolumn_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreportcolumn_Form.controls[key] != undefined) {
                                this.boreportcolumn_Form.controls[key].disable({ onlySelf: true });
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
    datatype_onChange(evt: any) {
        let e = this.f.datatype.value as any;
    }
    filtertype_onChange(evt: any) {
        let e = this.f.filtertype.value as any;
    }

    edit_boreportcolumns() {
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
            this.boreportcolumn_service.get_boreportcolumns_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.boreportcolumn;
                let formproperty = res.boreportcolumn.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.boreportcolumn.pkcol;
                this.formid = res.boreportcolumn.reportcolumnid;
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
            this.formData = res.boreportcolumn;
            this.formid = res.boreportcolumn.reportcolumnid;
            this.pkcol = res.boreportcolumn.pkcol;
            this.bmyrecord = false;
            if ((res.boreportcolumn as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.boreportcolumn_Form.patchValue({
                pkcol: res.boreportcolumn.pkcol,
                reportcolumnid: res.boreportcolumn.reportcolumnid,
                reportid: res.boreportcolumn.reportid,
                tablealias: res.boreportcolumn.tablealias,
                field: res.boreportcolumn.field,
                header: res.boreportcolumn.header,
                columnalias: res.boreportcolumn.columnalias,
                hide: res.boreportcolumn.hide,
                derived: res.boreportcolumn.derived,
                datatype: this.sharedService.getValue("value", this.datatype_List, res.boreportcolumn.datatype, 'datatype'),
                datatypedesc: res.boreportcolumn.datatypedesc,
                fkfilter: res.boreportcolumn.fkfilter,
                filtertype: this.sharedService.getValue("value", this.filtertype_List, res.boreportcolumn.filtertype, 'filtertype'),
                filtertypedesc: res.boreportcolumn.filtertypedesc,
                width: res.boreportcolumn.width,
                nofilter: res.boreportcolumn.nofilter,
                groupby: res.boreportcolumn.groupby,
                sum: res.boreportcolumn.sum,
                count: res.boreportcolumn.count,
                colhtml: res.boreportcolumn.colhtml,
                poptitle: res.boreportcolumn.poptitle,
                link: res.boreportcolumn.link,
                linkurl: res.boreportcolumn.linkurl,
                service: res.boreportcolumn.service,
                servicename: res.boreportcolumn.servicename,
                sp: res.boreportcolumn.sp,
                spname: res.boreportcolumn.spname,
                alert: res.boreportcolumn.alert,
                caps: res.boreportcolumn.caps,
                bold: res.boreportcolumn.bold,
                italic: res.boreportcolumn.italic,
                strikethrough: res.boreportcolumn.strikethrough,
                bgcolor: res.boreportcolumn.bgcolor,
                forecolor: res.boreportcolumn.forecolor,
                conditionstyle: res.boreportcolumn.conditionstyle,
                performancestatusvalues: res.boreportcolumn.performancestatusvalues,
                status: res.boreportcolumn.status,
                statusdesc: res.boreportcolumn.statusdesc,
                notsortable: res.boreportcolumn.notsortable,
                sequence: res.boreportcolumn.sequence,
                sumcondition: res.boreportcolumn.sumcondition,
                countcondition: res.boreportcolumn.countcondition,
                min: res.boreportcolumn.min,
                max: res.boreportcolumn.max,
                maxchars: res.boreportcolumn.maxchars,
                helptext: res.boreportcolumn.helptext,
            });
            this.boreportcolumn_menuactions = res.boreportcolumn_menuactions;
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

        for (let key in this.boreportcolumn_Form.controls) {
            let val = this.boreportcolumn_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boreportcolumn_Form.controls[key] != null) {
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
        formData = this.boreportcolumn_Form.getRawValue();
        formData.datatype = (this.boreportcolumn_Form.get('datatype'))?.value?.value;
        formData.filtertype = (this.boreportcolumn_Form.get('filtertype'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.boreportcolumn_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.reportcolumnid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boreportcolumn_Form.valid) {
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
            Object.keys(this.boreportcolumn_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.boreportcolumn_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.boreportcolumn_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.boreportcolumn_service.save_boreportcolumns(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).boreportcolumn);
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
                    this.objvalues.push((res as any).boreportcolumn);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.boreportcolumn_Form.markAsUntouched();
            this.boreportcolumn_Form.markAsPristine();
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



