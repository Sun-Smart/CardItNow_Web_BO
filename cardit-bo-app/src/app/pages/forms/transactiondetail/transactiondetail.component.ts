import { transactiondetailService } from './../../../service/transactiondetail.service';
import { transactiondetail } from './../../../model/transactiondetail.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
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
    selector: 'app-transactiondetail',
    templateUrl: './transactiondetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class transactiondetailComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: transactiondetail;
    list: transactiondetail[];
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
    bfilterPopulate_transactiondetails: boolean = false;
    transactiondetail_menuactions: any = []

    transactiondetail_Form: FormGroup;

    transactionid_List: DropDownValues[];
    transactionid_Suggestions: any[];
    transactionid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    uid_List: DropDownValues[];
    uid_Suggestions: any[];
    uid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    recipientuid_List: DropDownValues[];
    recipientuid_Suggestions: any[];
    recipientuid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    payid_List: DropDownValues[];
    payid_Suggestions: any[];
    payid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private transactiondetail_service: transactiondetailService,
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
            this.transactiondetail_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                ImageName: [null],
                transactiondetailid: [null],
                transactionid: [null, Validators.compose([Validators.required,])],
                transactioniddesc: [null],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                uiddesc: [null],
                recipientuid: [null, Validators.compose([Validators.required,])],
                recipientuiddesc: [null],
                recipientid: [null, Validators.compose([Validators.required,])],
                payid: [null, Validators.compose([Validators.required,])],
                payiddesc: [null],
                transactiondate: [null, Validators.compose([Validators.required,])],
                transactionamount: [null, Validators.compose([Validators.required,])],
                remarks: [null],
                acquirername: [null, Validators.compose([Validators.maxLength(200)])],
                transactionconfirmnumber: [null, Validators.compose([Validators.maxLength(200)])],
                processedon: [null],
                processedamount: [null],
                acquirercharges: [null],
                amountrecipient: [null],
                carditcharges: [null],
                recipientprocessdate: [null],
                recipientprocesscode: [null, Validators.compose([Validators.maxLength(200)])],
                carditprocessdate: [null],
                carditprocesscode: [null, Validators.compose([Validators.maxLength(32)])],
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

    get f() { return this.transactiondetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.transactiondetail_Form.dirty && this.transactiondetail_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.transactiondetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.transactiondetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.transactiondetailid && pkDetail) {
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
            let transactiondetailid = null;

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
            this.formData = new transactiondetail();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = transactiondetailid;
            //alert(transactiondetailid);

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
            this.transactiondetail_service.getDefaultData().then(res => {
                this.transactionid_List = res.list_transactionid.value;
                this.transactionid_Suggestions = this.transactionid_List;
                if (this.formData?.transactionid != undefined && this.formData?.transactionid != null) {
                    this.transactiondetail_Form.patchValue({
                        transactionid: this.sharedService.getValue('', this.transactionid_List, this.formData.transactionid?.toString(), 'transactionid')
                    });
                }
                this.uid_List = res.list_uid.value;
                this.uid_Suggestions = this.uid_List;
                if (this.formData?.uid != undefined && this.formData?.uid != null) {
                    this.transactiondetail_Form.patchValue({
                        uid: this.sharedService.getValue('uid', this.uid_List, this.formData.uid?.toString(), 'uid')
                    });
                }
                this.recipientuid_List = res.list_recipientuid.value;
                this.recipientuid_Suggestions = this.recipientuid_List;
                if (this.formData?.recipientuid != undefined && this.formData?.recipientuid != null) {
                    this.transactiondetail_Form.patchValue({
                        recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, this.formData.recipientuid?.toString(), 'recipientuid')
                    });
                }
                this.payid_List = res.list_payid.value;
                this.payid_Suggestions = this.payid_List;
                if (this.formData?.payid != undefined && this.formData?.payid != null) {
                    this.transactiondetail_Form.patchValue({
                        payid: this.sharedService.getValue('', this.payid_List, this.formData.payid?.toString(), 'payid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.transactiondetail_service.get_transactiondetails_List().then(res => {
                this.pkList = res as transactiondetail[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'transactiondetailsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.transactiondetail_Form.markAsUntouched();
            this.transactiondetail_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_transactionid(value: any) {
        this.transactionid_Suggestions = this.transactionid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_transactionid(transactionidDetail: any) {
        if (transactionidDetail.value && transactionidDetail) {

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

    onEntered_payid(value: any) {
        this.payid_Suggestions = this.payid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_payid(payidDetail: any) {
        if (payidDetail.value && payidDetail) {

        }
    }

    onCopyRecursive(){}
    onChangeAction(){}


    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.transactiondetail_Form != null)
            this.transactiondetail_Form.reset();
        this.transactiondetail_Form.patchValue({
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let transactiondetailid = this.transactiondetail_Form.get('transactiondetailid').value;
        if (transactiondetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.transactiondetail_service.delete_transactiondetail(transactiondetailid);
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
        this.transactiondetail_Form.patchValue({
            transactiondetailid: null
        });
        if (this.formData.transactiondetailid != null) this.formData.transactiondetailid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.transactiondetail_Form.patchValue({
            transactiondetailid: null
        });
        if (this.formData.transactiondetailid != null) this.formData.transactiondetailid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'transactiondetailid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "transactiondate")
                        this.transactiondetail_Form.patchValue({ "transactiondate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "processedon")
                        this.transactiondetail_Form.patchValue({ "processedon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "recipientprocessdate")
                        this.transactiondetail_Form.patchValue({ "recipientprocessdate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "carditprocessdate")
                        this.transactiondetail_Form.patchValue({ "carditprocessdate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.transactiondetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.transactiondetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.transactiondetail_Form.controls[key] != undefined) {
                                this.transactiondetail_Form.controls[key].disable({ onlySelf: true });
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
        return this.customfieldservice.getcustomfieldconfigurationsByTable("transactiondetails", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    transactionid_onChange(evt: any) {
        let e = this.f.transactionid.value as any;
    }
    uid_onChange(evt: any) {
        let e = this.f.uid.value as any;
    }
    recipientuid_onChange(evt: any) {
        let e = this.f.recipientuid.value as any;
    }
    payid_onChange(evt: any) {
        let e = this.f.payid.value as any;
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



    edit_transactiondetails() {
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
            this.transactiondetail_service.get_transactiondetails_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.transactiondetail;
                let formproperty = res.transactiondetail.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.transactiondetail.pkcol;
                this.formid = res.transactiondetail.transactiondetailid;
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
            this.formData = res.transactiondetail;
            this.formid = res.transactiondetail.transactiondetailid;
            this.pkcol = res.transactiondetail.pkcol;
            this.bmyrecord = false;
            if ((res.transactiondetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.transactiondetail_Form.patchValue({
                pkcol: res.transactiondetail.pkcol,
                transactiondetailid: res.transactiondetail.transactiondetailid,
                transactionid: this.sharedService.getValue('', this.transactionid_List, res.transactiondetail.transactionid, 'transactionid'),
                transactioniddesc: res.transactiondetail.transactioniddesc,
                uid: this.sharedService.getValue('uid', this.uid_List, res.transactiondetail.uid, 'uid'),
                uiddesc: res.transactiondetail.uiddesc,
                recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, res.transactiondetail.recipientuid, 'recipientuid'),
                recipientuiddesc: res.transactiondetail.recipientuiddesc,
                recipientid: res.transactiondetail.recipientid,
                payid: this.sharedService.getValue('', this.payid_List, res.transactiondetail.payid, 'payid'),
                payiddesc: res.transactiondetail.payiddesc,
                transactiondate: res.transactiondetail.transactiondate == null ? null : new Date(res.transactiondetail.transactiondate),
                transactionamount: res.transactiondetail.transactionamount,
                remarks: res.transactiondetail.remarks,
                acquirername: res.transactiondetail.acquirername,
                transactionconfirmnumber: res.transactiondetail.transactionconfirmnumber,
                processedon: res.transactiondetail.processedon == null ? null : new Date(res.transactiondetail.processedon),
                processedamount: res.transactiondetail.processedamount,
                acquirercharges: res.transactiondetail.acquirercharges,
                amountrecipient: res.transactiondetail.amountrecipient,
                carditcharges: res.transactiondetail.carditcharges,
                recipientprocessdate: res.transactiondetail.recipientprocessdate == null ? null : new Date(res.transactiondetail.recipientprocessdate),
                recipientprocesscode: res.transactiondetail.recipientprocesscode,
                carditprocessdate: res.transactiondetail.carditprocessdate == null ? null : new Date(res.transactiondetail.carditprocessdate),
                carditprocesscode: res.transactiondetail.carditprocesscode,
                customfield: res.transactiondetail.customfield,
                attachment: this.sharedService.JSON_parse(res.transactiondetail.attachment),
                status: res.transactiondetail.status,
                statusdesc: res.transactiondetail.statusdesc,
            });
            this.transactiondetail_menuactions = res.transactiondetail_menuactions;
            if (this.transactiondetail_Form.get('customfield').value != null && this.transactiondetail_Form.get('customfield').value != "") this.customFieldJson = this.sharedService.JSON_parse(this.transactiondetail_Form.get('customfield').value);
            this.FillCustomField();
            if (this.transactiondetail_Form.get('attachment').value != null && this.transactiondetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.transactiondetail_Form.get('attachment').value);
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

        for (let key in this.transactiondetail_Form.controls) {
            let val = this.transactiondetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.transactiondetail_Form.controls[key] != null) {
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
        formData = this.transactiondetail_Form.getRawValue();
        var customfields = this.customfieldservice.getCustomValues(document);
        formData.transactionid = (this.transactiondetail_Form.get('transactionid'))?.value?.value;
        formData.uid = (this.transactiondetail_Form.get('uid'))?.value?.uid;
        formData.recipientuid = (this.transactiondetail_Form.get('recipientuid'))?.value?.uid;
        formData.payid = (this.transactiondetail_Form.get('payid'))?.value?.value;
        formData.transactiondate = this.sharedService.getDate(this.transactiondetail_Form.get('transactiondate').value)
        formData.processedon = this.sharedService.getDate(this.transactiondetail_Form.get('processedon').value)
        formData.recipientprocessdate = this.sharedService.getDate(this.transactiondetail_Form.get('recipientprocessdate').value)
        formData.carditprocessdate = this.sharedService.getDate(this.transactiondetail_Form.get('carditprocessdate').value)
        if (customfields != null) formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.transactiondetail_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.transactiondetailid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.transactiondetail_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            Object.keys(this.transactiondetail_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.transactiondetail_Form.get(key).errors;
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


            if (!this.transactiondetail_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            let res = await this.transactiondetail_service.save_transactiondetails(this.formData, this.fileAttachmentList);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).transactiondetail);
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
                    this.objvalues.push((res as any).transactiondetail);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.transactiondetail_Form.markAsUntouched();
            this.transactiondetail_Form.markAsPristine();
            if(bclear == true){
              
                this.router.navigateByUrl['home/boreportviewer/tdtl'];
                this.router.navigate(['home/' + 'boreportviewer' + '/' + 'tdtl' ]);
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
        this.transactiondetail_Form.reset() ;
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



