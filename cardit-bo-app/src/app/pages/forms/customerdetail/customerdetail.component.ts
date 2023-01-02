import { customerdetailService } from './../../../service/customerdetail.service';
import { customerdetail } from './../../../model/customerdetail.model';
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
    selector: 'app-customerdetail',
    templateUrl: './customerdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class customerdetailComponent implements OnInit {
    action:any;
    blockedDocument: boolean = false;
    formData: customerdetail;
    list: customerdetail[];
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

    bfilterPopulate_customerdetails: boolean = false;
    customerdetail_menuactions: any = []

    customerdetail_Form: FormGroup;

    customerid_List: DropDownValues[];
    customerid_Suggestions: any[];
    customerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    uid_List: DropDownValues[];
    uid_Suggestions: any[];
    uid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    geoid_List: DropDownValues[];
    geoid_Suggestions: any[];
    geoid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    cityid_List: DropDownValues[];
    cityid_Suggestions: any[];
    cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    divmode_List: DropDownValues[];
    divmode_Suggestions: any[];
    divmode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    divstatus_List: DropDownValues[];
    divstatus_Suggestions: any[];
    divstatus_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    amlcheckstatus_List: DropDownValues[];
    amlcheckstatus_Suggestions: any[];
    amlcheckstatus_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
    @ViewChild('livestockphoto', { static: false }) livestockphoto: AttachmentComponent;
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
        private customerdetail_service: customerdetailService,
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
            this.customerdetail_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                ImageName: [null],
                customerdetailid: [null],
                customerid: [null, Validators.compose([Validators.required,])],
                customeriddesc: [null],
                type: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                uiddesc: [null],
                address: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
                geoid: [null, Validators.compose([Validators.required,])],
                geoiddesc: [null],
                cityid: [null, Validators.compose([Validators.required,])],
                cityiddesc: [null],
                postalcode: [null, Validators.compose([Validators.maxLength(20)])],
                identificationdocumenttype: [null, Validators.compose([Validators.required,])],
                idnumber: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                idissuedate: [null, Validators.compose([Validators.required,])],
                idexpirydate: [null, Validators.compose([Validators.required,])],
                livestockphoto: [null],//,Validators.compose([ Validators.required,])
                divmode: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                divmodedesc: [null],
                divref: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                divsubmissionon: [null, Validators.compose([Validators.required,])],
                divstatus: [null, Validators.compose([Validators.maxLength(2)])],
                divstatusdesc: [null],
                divremarks: [null],
                amlcheckstatus: [null, Validators.compose([Validators.maxLength(2)])],
                amlcheckstatusdesc: [null],
                amlremarks: [null],
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

    get f() { return this.customerdetail_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.customerdetail_Form.dirty && this.customerdetail_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.customerdetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.customerdetailid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.customerdetailid && pkDetail) {
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
            let customerdetailid = null;

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
            this.formData = new customerdetail();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = customerdetailid;
            //alert(customerdetailid);

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
            this.customerdetail_service.getDefaultData().then(res => {
                this.customerid_List = res.list_customerid.value;
                this.customerid_Suggestions = this.customerid_List;
                if (this.formData?.customerid != undefined && this.formData?.customerid != null) {
                    this.customerdetail_Form.patchValue({
                        customerid: this.sharedService.getValue('', this.customerid_List, this.formData.customerid?.toString(), 'customerid')
                    });
                }
                this.uid_List = res.list_uid.value;
                this.uid_Suggestions = this.uid_List;
                if (this.formData?.uid != undefined && this.formData?.uid != null) {
                    this.customerdetail_Form.patchValue({
                        uid: this.sharedService.getValue('uid', this.uid_List, this.formData.uid?.toString(), 'uid')
                    });
                }
                this.geoid_List = res.list_geoid.value;
                this.geoid_Suggestions = this.geoid_List;
                if (this.formData?.geoid != undefined && this.formData?.geoid != null) {
                    this.customerdetail_Form.patchValue({
                        geoid: this.sharedService.getValue('', this.geoid_List, this.formData.geoid?.toString(), 'geoid')
                    });
                }
                if (this.formData?.geoid && this.formData?.geoid?.toString() != "" && this.formData?.geoid != null) {
                    this.customerdetail_service.getList_cityid(this.formData?.geoid).then(res => {
                        this.cityid_List = res as DropDownValues[];
                        this.customerdetail_Form.patchValue({
                            cityid: this.sharedService.getValue('', this.cityid_List, this.formData.cityid?.toString(), 'cityid')
                        });
                    });
                }
                this.divmode_List = res.list_divmode.value;
                if (this.formData?.divmode != undefined && this.formData?.divmode != null) {
                    this.customerdetail_Form.patchValue({
                        divmode: this.formData.divmode
                    });
                }
                this.divstatus_List = res.list_divstatus.value;
                if (this.formData?.divstatus != undefined && this.formData?.divstatus != null) {
                    this.customerdetail_Form.patchValue({
                        divstatus: this.formData.divstatus
                    });
                }
                this.amlcheckstatus_List = res.list_amlcheckstatus.value;
                if (this.formData?.amlcheckstatus != undefined && this.formData?.amlcheckstatus != null) {
                    this.customerdetail_Form.patchValue({
                        amlcheckstatus: this.formData.amlcheckstatus
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.customerdetail_service.get_customerdetails_List().then(res => {
                this.pkList = res as customerdetail[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'customerdetailsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.customerdetail_Form.markAsUntouched();
            this.customerdetail_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_customerid(value: any) {
        this.customerid_Suggestions = this.customerid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_customerid(customeridDetail: any) {
        if (customeridDetail.value && customeridDetail) {

        }
    }

    onEntered_uid(value: any) {
        this.uid_Suggestions = this.uid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_uid(uidDetail: any) {
        if (uidDetail.value && uidDetail) {

        }
    }

    onEntered_geoid(value: any) {
        this.geoid_Suggestions = this.geoid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_geoid(geoidDetail: any) {
        if (geoidDetail.value && geoidDetail) {
            this.customerdetail_service.getList_cityid(geoidDetail.value).then(res => {
                this.cityid_List = res as DropDownValues[]
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocompleteselection  cityid ' + err);
            });

        }
    }

    onEntered_cityid(value: any) {
        this.cityid_Suggestions = this.cityid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_cityid(cityidDetail: any) {
        if (cityidDetail.value && cityidDetail) {

        }
    }

    onEntered_divmode(value: any) {
        this.divmode_Suggestions = this.divmode_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_divmode(divmodeDetail: any) {
        if (divmodeDetail.value && divmodeDetail) {

        }
    }

    onEntered_divstatus(value: any) {
        this.divstatus_Suggestions = this.divstatus_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_divstatus(divstatusDetail: any) {
        if (divstatusDetail.value && divstatusDetail) {

        }
    }

    onEntered_amlcheckstatus(value: any) {
        this.amlcheckstatus_Suggestions = this.amlcheckstatus_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_amlcheckstatus(amlcheckstatusDetail: any) {
        if (amlcheckstatusDetail.value && amlcheckstatusDetail) {

        }
    }




    getlivestockphoto() {
        //debugger;
        if (this.livestockphoto?.getAttachmentList()?.length > 0) {
            let file = this.livestockphoto.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }

    onCopyRecursive(){}
    onChangeAction(){}

    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.customerdetail_Form != null)
            this.customerdetail_Form.reset();
        this.customerdetail_Form.patchValue({
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let customerdetailid = this.customerdetail_Form.get('customerdetailid').value;
        if (customerdetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.customerdetail_service.delete_customerdetail(customerdetailid);
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
        this.customerdetail_Form.patchValue({
            customerdetailid: null
        });
        if (this.formData.customerdetailid != null) this.formData.customerdetailid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.customerdetail_Form.patchValue({
            customerdetailid: null
        });
        if (this.formData.customerdetailid != null) this.formData.customerdetailid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'customerdetailid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "idissuedate")
                        this.customerdetail_Form.patchValue({ "idissuedate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "idexpirydate")
                        this.customerdetail_Form.patchValue({ "idexpirydate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "divsubmissionon")
                        this.customerdetail_Form.patchValue({ "divsubmissionon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.customerdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.customerdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.customerdetail_Form.controls[key] != undefined) {
                                this.customerdetail_Form.controls[key].disable({ onlySelf: true });
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
        return this.customfieldservice.getcustomfieldconfigurationsByTable("customerdetails", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    customerid_onChange(evt: any) {
        let e = this.f.customerid.value as any;
    }
    uid_onChange(evt: any) {
        let e = this.f.uid.value as any;
    }
    geoid_onChange(evt: any) {
        let e = this.f.geoid.value as any;
    }
    cityid_onChange(evt: any) {
        let e = this.f.cityid.value as any;
    }
    divmode_onChange(evt: any) {
        let e = this.f.divmode.value as any;
    }
    divstatus_onChange(evt: any) {
        let e = this.f.divstatus.value as any;
    }
    amlcheckstatus_onChange(evt: any) {
        let e = this.f.amlcheckstatus.value as any;
    }
    attachmentuploader(e: any) {
        debugger;
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



    edit_customerdetails() {
        this.showview = false;
        setTimeout(() => {
            if (this.livestockphoto != null && this.livestockphoto != undefined) this.livestockphoto.setattachmentlist(this.customerdetail_Form.get('livestockphoto').value);
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
            this.customerdetail_service.get_customerdetails_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.customerdetail;
                let formproperty = res.customerdetail.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.customerdetail.pkcol;
                this.formid = res.customerdetail.customerdetailid;
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
            this.formData = res.customerdetail;
            this.formid = res.customerdetail.customerdetailid;
            this.pkcol = res.customerdetail.pkcol;
            this.bmyrecord = false;
            if ((res.customerdetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.customerdetail_Form.patchValue({
                pkcol: res.customerdetail.pkcol,
                customerdetailid: res.customerdetail.customerdetailid,
                customerid: this.sharedService.getValue('', this.customerid_List, res.customerdetail.customerid, 'customerid'),
                customeriddesc: res.customerdetail.customeriddesc,
                type: res.customerdetail.type,
                uid: this.sharedService.getValue('uid', this.uid_List, res.customerdetail.uid, 'uid'),
                uiddesc: res.customerdetail.uiddesc,
                address: res.customerdetail.address,
                geoid: this.sharedService.getValue('', this.geoid_List, res.customerdetail.geoid, 'geoid'),
                geoiddesc: res.customerdetail.geoiddesc,
                cityid: this.sharedService.getValue('', this.cityid_List, res.customerdetail.cityid, 'cityid'),
                cityiddesc: res.customerdetail.cityiddesc,
                postalcode: res.customerdetail.postalcode,
                identificationdocumenttype: res.customerdetail.identificationdocumenttype,
                idnumber: res.customerdetail.idnumber,
                idissuedate: res.customerdetail.idissuedate == null ? null : new Date(res.customerdetail.idissuedate),
                idexpirydate: res.customerdetail.idexpirydate == null ? null : new Date(res.customerdetail.idexpirydate),
                livestockphoto: this.sharedService.JSON_parse(res.customerdetail.livestockphoto),
                divmode: this.sharedService.getValue('', this.divmode_List, res.customerdetail.divmode, 'divmode'),
                divmodedesc: res.customerdetail.divmodedesc,
                divref: res.customerdetail.divref,
                divsubmissionon: res.customerdetail.divsubmissionon == null ? null : new Date(res.customerdetail.divsubmissionon),
                divstatus: this.sharedService.getValue('', this.divstatus_List, res.customerdetail.divstatus, 'divstatus'),
                divstatusdesc: res.customerdetail.divstatusdesc,
                divremarks: res.customerdetail.divremarks,
                amlcheckstatus: this.sharedService.getValue('', this.amlcheckstatus_List, res.customerdetail.amlcheckstatus, 'amlcheckstatus'),
                amlcheckstatusdesc: res.customerdetail.amlcheckstatusdesc,
                amlremarks: res.customerdetail.amlremarks,
                customfield: res.customerdetail.customfield,
                attachment: this.sharedService.JSON_parse(res.customerdetail.attachment),
                status: res.customerdetail.status,
                statusdesc: res.customerdetail.statusdesc,
            });
            this.customerdetail_menuactions = res.customerdetail_menuactions;
            if (this.customerdetail_Form.get('customfield').value != null && this.customerdetail_Form.get('customfield').value != "") this.customFieldJson = this.sharedService.JSON_parse(this.customerdetail_Form.get('customfield').value);
            this.FillCustomField();
            if (this.customerdetail_Form.get('livestockphoto').value != null && this.customerdetail_Form.get('livestockphoto').value != "" && this.livestockphoto != null && this.livestockphoto != undefined) this.livestockphoto.setattachmentlist(this.customerdetail_Form.get('livestockphoto').value);
            if (this.customerdetail_Form.get('attachment').value != null && this.customerdetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.customerdetail_Form.get('attachment').value);
            setTimeout(() => {
                if (this.formData?.geoid && this.formData?.geoid?.toString() != "" && this.formData?.geoid != null) {
                    this.onSelected_geoid(this.f.geoid?.value);
                }
            });
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

        for (let key in this.customerdetail_Form.controls) {
            let val = this.customerdetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.customerdetail_Form.controls[key] != null) {
                if (key == "livestockphoto") {
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
        formData = this.customerdetail_Form.getRawValue();
        var customfields = this.customfieldservice.getCustomValues(document);
        formData.customerid = (this.customerdetail_Form.get('customerid'))?.value?.value;
        formData.uid = (this.customerdetail_Form.get('uid'))?.value?.uid;
        formData.geoid = (this.customerdetail_Form.get('geoid'))?.value?.value;
        formData.cityid = (this.customerdetail_Form.get('cityid'))?.value?.value;
        formData.idissuedate = this.sharedService.getDate(this.customerdetail_Form.get('idissuedate').value)
        formData.idexpirydate = this.sharedService.getDate(this.customerdetail_Form.get('idexpirydate').value)
        if (this.livestockphoto.getAttachmentList() != null) formData.livestockphoto = JSON.stringify(this.livestockphoto.getAttachmentList());
        formData.divmode = (this.customerdetail_Form.get('divmode'))?.value?.value;
        formData.divsubmissionon = this.sharedService.getDate(this.customerdetail_Form.get('divsubmissionon').value)
        formData.divstatus = (this.customerdetail_Form.get('divstatus'))?.value?.value;
        formData.amlcheckstatus = (this.customerdetail_Form.get('amlcheckstatus'))?.value?.value;
        if (customfields != null) formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.customerdetail_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.customerdetailid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.customerdetail_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            Object.keys(this.customerdetail_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.customerdetail_Form.get(key).errors;
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


            if (!this.customerdetail_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            let res = await this.customerdetail_service.save_customerdetails(this.formData, this.livestockphoto.getAllFiles(), this.fileAttachmentList);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).customerdetail);
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
                    this.objvalues.push((res as any).customerdetail);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.customerdetail_Form.markAsUntouched();
            this.customerdetail_Form.markAsPristine();
            if(bclear == true){
              
                this.router.navigateByUrl['home/boreportviewer/cstdt'];
                this.router.navigate(['home/' + 'boreportviewer' + '/' + 'cstdt' ]);
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
        this.customerdetail_Form.reset() ;
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



