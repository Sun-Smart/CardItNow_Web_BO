import { transactionmasterService } from './../../../service/transactionmaster.service';
import { transactionmaster } from './../../../model/transactionmaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgxSpinnerService } from "ngx-spinner";
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
import { transactiondetail } from './../../../model/transactiondetail.model';
import { transactiondetailComponent } from './../../../pages/forms/transactiondetail/transactiondetail.component';
import { transactiondetailService } from './../../../service/transactiondetail.service';
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
import { SessionService } from '../../../pages/core/services/session.service';
import { ThemeService } from '../../../pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-transactionmaster',
    templateUrl: './transactionmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class transactionmasterComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: transactionmaster;
    list: transactionmaster[];
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
    action:any;
    bfilterPopulate_transactionmasters: boolean = false;
    bfilterPopulate_transactiondetails: boolean = false;
    transactionmaster_menuactions: any = []
    transactiondetail_menuactions: any = []
    transactiondetail_visible: boolean = true;
    transactiondetail_disabled: boolean = false;
    @ViewChild('tbl_transactiondetails', { static: false }) tbl_transactiondetails!: ReportViewerCtrlComponent;

    transactionmaster_Form: FormGroup;

    uid_List: DropDownValues[];
    uid_Suggestions: any[];
    uid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    recipientuid_List: DropDownValues[];
    recipientuid_Suggestions: any[];
    recipientuid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    transactiontype_List: DropDownValues[];
    transactiontype_Suggestions: any[];
    transactiontype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    payid_List: DropDownValues[];
    payid_Suggestions: any[];
    payid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    paytype_List: DropDownValues[];
    paytype_Suggestions: any[];
    paytype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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



    transactiondetails_visiblelist: any;
    transactiondetails_hidelist: any;

    Deleted_transactiondetail_IDs: string = "";
    transactiondetails_ID: string = "1";
    transactiondetails_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private transactionmaster_service: transactionmasterService,
        private fb: FormBuilder,
        public sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private sanitizer: DomSanitizer,
        private spinner: NgxSpinnerService,
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
            this.transactionmaster_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                ImageName: [null],
                transactionid: [null],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                uiddesc: [null],
                recipientuid: [null, Validators.compose([Validators.required,])],
                recipientuiddesc: [null],
                recipientid: [null, Validators.compose([Validators.required,])],
                transactiontype: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                transactiontypedesc: [null],
                recipientname: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                documentnumber: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                additionaldocumentnumber: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                startdate: [null, Validators.compose([Validators.required,])],
                expirydate: [null, Validators.compose([Validators.required,])],
                address: [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],
                billdate: [null, Validators.compose([Validators.required,])],
                contractamount: [null, Validators.compose([Validators.required,])],
                discount: [null, Validators.compose([Validators.required,])],
                carditconvfee: [null, Validators.compose([Validators.required,])],
                payamount: [null, Validators.compose([Validators.required,])],
                payid: [null, Validators.compose([Validators.required,])],
                payiddesc: [null],
                paytype: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                paytypedesc: [null],
                customfield: [null],
                attachment: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.transactionmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.transactionmaster_Form.dirty && this.transactionmaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    documentnumberexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.documentnumber?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].transactionid?.toString() != this.formid?.toString()) {
                if (confirm("This Document Number value exists in the database.Do you want to display the record ? ")) {
                    this.PopulateScreen(this.pkList[pos].pkcol);
                    return true;
                }
                else {
                    e.stopPropagation();
                    e.preventDefault();
                    e.target.focus();
                    e.target.markAsDirty();
                    return false;
                }
            }
            return true;
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.transactionid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.transactionid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.transactionid && pkDetail) {
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
            let transactionmasterid = null;

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
            this.formData = new transactionmaster();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = transactionmasterid;
            //alert(transactionmasterid);

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
            this.transactionmaster_service.getDefaultData().then(res => {
                this.uid_List = res.list_uid.value;
                this.uid_Suggestions = this.uid_List;
                if (this.formData?.uid != undefined && this.formData?.uid != null) {
                    this.transactionmaster_Form.patchValue({
                        uid: this.sharedService.getValue('uid', this.uid_List, this.formData.uid?.toString(), 'uid')
                    });
                }
                this.recipientuid_List = res.list_recipientuid.value;
                this.recipientuid_Suggestions = this.recipientuid_List;
                if (this.formData?.recipientuid != undefined && this.formData?.recipientuid != null) {
                    this.transactionmaster_Form.patchValue({
                        recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, this.formData.recipientuid?.toString(), 'recipientuid')
                    });
                }
                this.transactiontype_List = res.list_transactiontype.value;
                if (this.formData?.transactiontype != undefined && this.formData?.transactiontype != null) {
                    this.transactionmaster_Form.patchValue({
                        transactiontype: this.formData.transactiontype
                    });
                }
                this.payid_List = res.list_payid.value;
                this.payid_Suggestions = this.payid_List;
                if (this.formData?.payid != undefined && this.formData?.payid != null) {
                    this.transactionmaster_Form.patchValue({
                        payid: this.sharedService.getValue('', this.payid_List, this.formData.payid?.toString(), 'payid')
                    });
                }
                this.paytype_List = res.list_paytype.value;
                if (this.formData?.paytype != undefined && this.formData?.paytype != null) {
                    this.transactionmaster_Form.patchValue({
                        paytype: this.formData.paytype
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.transactionmaster_service.get_transactionmasters_List().then(res => {
                this.pkList = res as transactionmaster[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'transactionmastersList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.transactionmaster_Form.markAsUntouched();
            this.transactionmaster_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_uid(value: any) {
        this.uid_Suggestions = this.uid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_uid(uidDetail: any) {
        if (uidDetail.value && uidDetail) {

        }
    }

    onEntered_recipientuid(value: any) {
        this.recipientuid_Suggestions = this.recipientuid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_recipientuid(recipientuidDetail: any) {
        if (recipientuidDetail.value && recipientuidDetail) {

        }
    }

    onEntered_transactiontype(value: any) {
        this.transactiontype_Suggestions = this.transactiontype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_transactiontype(transactiontypeDetail: any) {
        if (transactiontypeDetail.value && transactiontypeDetail) {

        }
    }

    onEntered_payid(value: any) {
        this.payid_Suggestions = this.payid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_payid(payidDetail: any) {
        if (payidDetail.value && payidDetail) {

        }
    }

    onEntered_paytype(value: any) {
        this.paytype_Suggestions = this.paytype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_paytype(paytypeDetail: any) {
        if (paytypeDetail.value && paytypeDetail) {

        }
    }

    onCopyRecursive(){}
    onChangeAction(){}


    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.transactionmaster_Form != null)
            this.transactionmaster_Form.reset();
        this.transactionmaster_Form.patchValue({
        });
        this.tbl_transactiondetails?.reset();
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let transactionid = this.transactionmaster_Form.get('transactionid').value;
        if (transactionid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.transactionmaster_service.delete_transactionmaster(transactionid);
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
        this.transactionmaster_Form.patchValue({
            transactionid: null
        });
        if (this.formData.transactionid != null) this.formData.transactionid = null;
        this.tbl_transactiondetails.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.transactionmaster_Form.patchValue({
            transactionid: null
        });
        if (this.formData.transactionid != null) this.formData.transactionid = null;
        for (let i = 0; i < this.tbl_transactiondetails.data.length; i++) {
            this.tbl_transactiondetails.data[i].transactiondetailid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'transactionid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "startdate")
                        this.transactionmaster_Form.patchValue({ "startdate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "expirydate")
                        this.transactionmaster_Form.patchValue({ "expirydate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "billdate")
                        this.transactionmaster_Form.patchValue({ "billdate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.transactionmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.transactionmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.transactionmaster_Form.controls[key] != undefined) {
                                this.transactionmaster_Form.controls[key].disable({ onlySelf: true });
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
        return this.customfieldservice.getcustomfieldconfigurationsByTable("transactionmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    uid_onChange(evt: any) {
        let e = this.f.uid.value as any;
    }
    recipientuid_onChange(evt: any) {
        let e = this.f.recipientuid.value as any;
    }
    transactiontype_onChange(evt: any) {
        let e = this.f.transactiontype.value as any;
    }
    payid_onChange(evt: any) {
        let e = this.f.payid.value as any;
    }
    paytype_onChange(evt: any) {
        let e = this.f.paytype.value as any;
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



    edit_transactionmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_transactiondetails.fkname = "transactionid";
            this.tbl_transactiondetails.fk = this.formid;
            this.tbl_transactiondetails.paramsChange('tdtl');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.transactionmaster_service.get_transactionmasters_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.transactionmaster;
                let formproperty = res.transactionmaster.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.transactionmaster.pkcol;
                this.formid = res.transactionmaster.transactionid;
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
            this.formData = res.transactionmaster;
            this.formid = res.transactionmaster.transactionid;
            this.pkcol = res.transactionmaster.pkcol;
            this.bmyrecord = false;
            if ((res.transactionmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.transactionmaster_Form.patchValue({
                pkcol: res.transactionmaster.pkcol,
                transactionid: res.transactionmaster.transactionid,
                uid: this.sharedService.getValue('uid', this.uid_List, res.transactionmaster.uid, 'uid'),
                uiddesc: res.transactionmaster.uiddesc,
                recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, res.transactionmaster.recipientuid, 'recipientuid'),
                recipientuiddesc: res.transactionmaster.recipientuiddesc,
                recipientid: res.transactionmaster.recipientid,
                transactiontype: this.sharedService.getValue('', this.transactiontype_List, res.transactionmaster.transactiontype, 'transactiontype'),
                transactiontypedesc: res.transactionmaster.transactiontypedesc,
                recipientname: res.transactionmaster.recipientname,
                documentnumber: res.transactionmaster.documentnumber,
                additionaldocumentnumber: res.transactionmaster.additionaldocumentnumber,
                startdate: res.transactionmaster.startdate == null ? null : new Date(res.transactionmaster.startdate),
                expirydate: res.transactionmaster.expirydate == null ? null : new Date(res.transactionmaster.expirydate),
                address: res.transactionmaster.address,
                billdate: res.transactionmaster.billdate == null ? null : new Date(res.transactionmaster.billdate),
                contractamount: res.transactionmaster.contractamount,
                discount: res.transactionmaster.discount,
                carditconvfee: res.transactionmaster.carditconvfee,
                payamount: res.transactionmaster.payamount,
                payid: this.sharedService.getValue('', this.payid_List, res.transactionmaster.payid, 'payid'),
                payiddesc: res.transactionmaster.payiddesc,
                paytype: this.sharedService.getValue('', this.paytype_List, res.transactionmaster.paytype, 'paytype'),
                paytypedesc: res.transactionmaster.paytypedesc,
                customfield: res.transactionmaster.customfield,
                attachment: this.sharedService.JSON_parse(res.transactionmaster.attachment),
                status: res.transactionmaster.status,
                statusdesc: res.transactionmaster.statusdesc,
            });
            this.transactionmaster_menuactions = res.transactionmaster_menuactions;
            this.transactiondetail_menuactions = res.transactiondetail_menuactions;
            this.transactiondetails_visiblelist = res.transactiondetails_visiblelist;
            if (this.transactionmaster_Form.get('customfield').value != null && this.transactionmaster_Form.get('customfield').value != "") this.customFieldJson = this.sharedService.JSON_parse(this.transactionmaster_Form.get('customfield').value);
            this.FillCustomField();
            if (this.transactionmaster_Form.get('attachment').value != null && this.transactionmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.transactionmaster_Form.get('attachment').value);
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

        for (let key in this.transactionmaster_Form.controls) {
            let val = this.transactionmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.transactionmaster_Form.controls[key] != null) {
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
        formData = this.transactionmaster_Form.getRawValue();
        var customfields = this.customfieldservice.getCustomValues(document);
        formData.uid = (this.transactionmaster_Form.get('uid'))?.value?.uid;
        formData.recipientuid = (this.transactionmaster_Form.get('recipientuid'))?.value?.uid;
        formData.transactiontype = (this.transactionmaster_Form.get('transactiontype'))?.value?.value;
        formData.startdate = this.sharedService.getDate(this.transactionmaster_Form.get('startdate').value)
        formData.expirydate = this.sharedService.getDate(this.transactionmaster_Form.get('expirydate').value)
        formData.billdate = this.sharedService.getDate(this.transactionmaster_Form.get('billdate').value)
        formData.payid = (this.transactionmaster_Form.get('payid'))?.value?.value;
        formData.paytype = (this.transactionmaster_Form.get('paytype'))?.value?.value;
        if (customfields != null) formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.transactionmaster_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.transactionid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.transactionmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
        debugger;
       this.spinner.show();
        try {
            //debugger;
            this.SetFormValues();
            this.isSubmitted = true;
            let strError = "";
            Object.keys(this.transactionmaster_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.transactionmaster_Form.get(key).errors;
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


            if (!this.transactionmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            let res = await this.transactionmaster_service.save_transactionmasters(this.formData, this.fileAttachmentList, this.Deleted_transactiondetail_IDs, this.tbl_transactiondetails?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.spinner.hide();
            this.objvalues.push((res as any).transactionmaster);
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
                    this.objvalues.push((res as any).transactionmaster);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.transactionmaster_Form.markAsUntouched();
            this.transactionmaster_Form.markAsPristine();

            if(bclear == true){
              
                this.router.navigateByUrl['home/boreportviewer/tm'];
                this.router.navigate(['home/' + 'boreportviewer' + '/' + 'tm' ]);
            }else if(bclear == false){
                this.clearList();
            }
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
        this.resetForm();
        this.transactionmaster_Form.reset() ;
    }

    AddOrEdit_transactiondetail(event: any, transactiondetailid: any, transactionid: any) {
        debugger;
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this
            .pkcol, event, transactiondetailid: event?.data?.pk, transactionid, visiblelist: this.transactiondetails_visiblelist, hidelist: this.transactiondetails_hidelist, ScreenType: 2,
            //  privateid: this.transactionmaster_Form.get('privateid').value?.value, 
            //  privateiddesc: this.transactionmaster_Form.get('privateiddesc').value?.label, 
            //  uid: this.transactionmaster_Form.get('uid').value?.value,
            //   uiddesc: this.transactionmaster_Form.get('uiddesc').value?.label,
            //   recipientuid: this.transactionmaster_Form.get('recipientuid').value?.value,
            //   recipientuiddesc: this.transactionmaster_Form.get('recipientuiddesc').value?.label,
            //   payid: this.transactionmaster_Form.get('payid').value?.value, 
            //   payiddesc: this.transactionmaster_Form.get('payiddesc').value?.label 
            };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(transactiondetailComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_transactiondetails.add(res[i]);
                    }
                }
                else {
                    this.tbl_transactiondetails.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_transactiondetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_transactiondetail_IDs += childID + ",";
        this.tbl_transactiondetails.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes transactiondetails
    transactiondetails_settings: any;

    show_transactiondetails_Checkbox() {
        //debugger;
    }
    delete_transactiondetails_All() {
        //this.tbl_transactiondetails.source.settings['selectMode'] = 'single';
    }
    show_transactiondetails_InActive() {
    }
    enable_transactiondetails_InActive() {
    }
    async transactiondetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_transactiondetails(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_transactiondetail(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_transactiondetail_IDs += event.data.pk + ",";

        }
    }
    async onCustom_transactiondetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "transactiondetails");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_transactiondetails_GridSelected(event: any) {
        //this.transactiondetails_selectedindex=this.tbl_transactiondetails.source.data.findIndex(i => i.transactiondetailid === event.data.transactiondetailid);
    }
    Is_transactiondetails_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.transactiondetails_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_transactiondetails_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.transactiondetails_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes transactiondetails

}



