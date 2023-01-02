import { customermasterService } from './../../../service/customermaster.service';
import { customermaster } from './../../../model/customermaster.model';
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
import { customerdetail } from './../../../model/customerdetail.model';
import { customerdetailComponent } from './../../../pages/forms/customerdetail/customerdetail.component';
import { customerdetailService } from './../../../service/customerdetail.service';
import { customertermsacceptance } from './../../../model/customertermsacceptance.model';
import { customertermsacceptanceComponent } from './../../../pages/forms/customertermsacceptance/customertermsacceptance.component';
import { customertermsacceptanceService } from './../../../service/customertermsacceptance.service';
import { customerpaymode } from './../../../model/customerpaymode.model';
import { customerpaymodeComponent } from './../../../pages/forms/customerpaymode/customerpaymode.component';
import { customerpaymodeService } from './../../../service/customerpaymode.service';
import { customersecurityquestion } from './../../../model/customersecurityquestion.model';
import { customersecurityquestionComponent } from './../../../pages/forms/customersecurityquestion/customersecurityquestion.component';
import { customersecurityquestionService } from './../../../service/customersecurityquestion.service';
import { customersecurityquestionshistory } from './../../../model/customersecurityquestionshistory.model';
import { customersecurityquestionshistoryComponent } from './../../../pages/forms/customersecurityquestionshistory/customersecurityquestionshistory.component';
import { customersecurityquestionshistoryService } from './../../../service/customersecurityquestionshistory.service';
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
    selector: 'app-customermaster',
    templateUrl: './customermaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class customermasterComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: customermaster;
    list: customermaster[];
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
    bfilterPopulate_customermasters: boolean = false;
    bfilterPopulate_customerdetails: boolean = false;
    bfilterPopulate_customertermsacceptances: boolean = false;
    bfilterPopulate_customerpaymodes: boolean = false;
    bfilterPopulate_customersecurityquestions: boolean = false;
    bfilterPopulate_customersecurityquestionshistories: boolean = false;
    customermaster_menuactions: any = []
    customerdetail_menuactions: any = []
    customerdetail_visible: boolean = true;
    customerdetail_disabled: boolean = false;
    @ViewChild('tbl_customerdetails', { static: false }) tbl_customerdetails!: ReportViewerCtrlComponent;
    customertermsacceptance_menuactions: any = []
    customertermsacceptance_visible: boolean = true;
    customertermsacceptance_disabled: boolean = false;
    @ViewChild('tbl_customertermsacceptances', { static: false }) tbl_customertermsacceptances!: ReportViewerCtrlComponent;
    customerpaymode_menuactions: any = []
    customerpaymode_visible: boolean = true;
    customerpaymode_disabled: boolean = false;
    @ViewChild('tbl_customerpaymodes', { static: false }) tbl_customerpaymodes!: ReportViewerCtrlComponent;
    customersecurityquestion_menuactions: any = []
    customersecurityquestion_visible: boolean = true;
    customersecurityquestion_disabled: boolean = false;
    @ViewChild('tbl_customersecurityquestions', { static: false }) tbl_customersecurityquestions!: ReportViewerCtrlComponent;
    customersecurityquestionshistory_menuactions: any = []
    customersecurityquestionshistory_visible: boolean = true;
    customersecurityquestionshistory_disabled: boolean = false;
    @ViewChild('tbl_customersecurityquestionshistories', { static: false }) tbl_customersecurityquestionshistories!: ReportViewerCtrlComponent;

    customermaster_Form: FormGroup;

    mode_List: DropDownValues[];
    mode_Suggestions: any[];
    mode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    type_List: DropDownValues[];
    type_Suggestions: any[];
    type_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    defaultavatar_List: DropDownValues[];
    defaultavatar_Suggestions: any[];
    defaultavatar_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
    @ViewChild('customerphoto', { static: false }) customerphoto: AttachmentComponent;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    customerdetails_visiblelist: any;
    customerdetails_hidelist: any;
    customertermsacceptances_visiblelist: any;
    customertermsacceptances_hidelist: any;
    customerpaymodes_visiblelist: any;
    customerpaymodes_hidelist: any;
    customersecurityquestions_visiblelist: any;
    customersecurityquestions_hidelist: any;
    customersecurityquestionshistories_visiblelist: any;
    customersecurityquestionshistories_hidelist: any;

    Deleted_customerdetail_IDs: string = "";
    customerdetails_ID: string = "1";
    customerdetails_selectedindex: any;
    Deleted_customertermsacceptance_IDs: string = "";
    customertermsacceptances_ID: string = "2";
    customertermsacceptances_selectedindex: any;
    Deleted_customerpaymode_IDs: string = "";
    customerpaymodes_ID: string = "3";
    customerpaymodes_selectedindex: any;
    Deleted_customersecurityquestion_IDs: string = "";
    customersecurityquestions_ID: string = "4";
    customersecurityquestions_selectedindex: any;
    Deleted_customersecurityquestionshistory_IDs: string = "";
    customersecurityquestionshistories_ID: string = "5";
    customersecurityquestionshistories_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private customermaster_service: customermasterService,
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
            this.customermaster_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                ImageName: [null],
                customerid: [null],
                mode: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                modedesc: [null],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                type: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                typedesc: [null],
                firstname: [null, Validators.compose([Validators.maxLength(200)])],
                lastname: [null, Validators.compose([Validators.maxLength(200)])],
                email: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                mobile: [null, Validators.compose([Validators.required, Validators.maxLength(20)])],
                dob: [null],
                customerinterests: [null, Validators.compose([Validators.maxLength(400)])],
                defaultavatar: [null],
                defaultavatardesc: [null],
                customerphoto: [null],
                googleid: [null, Validators.compose([Validators.maxLength(400)])],
                facebookid: [null, Validators.compose([Validators.maxLength(400)])],
                lasttermsaccepted: [null],
                customfield: [null],
                attachment: [null],
                status: [null],
                statusdesc: [null],
                deletionaccountrequestedon: [null],
                autodeletedon: [null],
                deleterevokedon: [null],
                createdon: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.customermaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.customermaster_Form.dirty && this.customermaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    uidexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.uid?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].customerid?.toString() != this.formid?.toString()) {
                if (confirm("This U value exists in the database.Do you want to display the record ? ")) {
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
    emailexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.email?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].customerid?.toString() != this.formid?.toString()) {
                if (confirm("This Email value exists in the database.Do you want to display the record ? ")) {
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
    mobileexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.mobile?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].customerid?.toString() != this.formid?.toString()) {
                if (confirm("This Mobile value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e: any) { return e.customerid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.customerid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.customerid && pkDetail) {
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
            let customermasterid = null;

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
            this.formData = new customermaster();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = customermasterid;
            //alert(customermasterid);

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
            this.customermaster_service.getDefaultData().then(res => {
                this.mode_List = res.list_mode.value;
                if (this.formData?.mode != undefined && this.formData?.mode != null) {
                    this.customermaster_Form.patchValue({
                        mode: this.formData.mode
                    });
                }
                this.type_List = res.list_type.value;
                if (this.formData?.type != undefined && this.formData?.type != null) {
                    this.customermaster_Form.patchValue({
                        type: this.formData.type
                    });
                }
                this.defaultavatar_List = res.list_defaultavatar.value;
                this.defaultavatar_Suggestions = this.defaultavatar_List;
                if (this.formData?.defaultavatar != undefined && this.formData?.defaultavatar != null) {
                    this.customermaster_Form.patchValue({
                        defaultavatar: this.sharedService.getValue('', this.defaultavatar_List, this.formData.defaultavatar?.toString(), 'defaultavatar')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.customermaster_service.get_customermasters_List().then(res => {
                this.pkList = res as customermaster[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'customermastersList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.customermaster_Form.markAsUntouched();
            this.customermaster_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_mode(value: any) {
        this.mode_Suggestions = this.mode_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_mode(modeDetail: any) {
        if (modeDetail.value && modeDetail) {

        }
    }

    onEntered_type(value: any) {
        this.type_Suggestions = this.type_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_type(typeDetail: any) {
        if (typeDetail.value && typeDetail) {

        }
    }

    onEntered_defaultavatar(value: any) {
        this.defaultavatar_Suggestions = this.defaultavatar_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_defaultavatar(defaultavatarDetail: any) {
        if (defaultavatarDetail.value && defaultavatarDetail) {

        }
    }




    getcustomerphoto() {
        //debugger;
        if (this.customerphoto?.getAttachmentList()?.length > 0) {
            let file = this.customerphoto.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }

    onCopyRecursive(){}
    onChangeAction(){
    }

    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.customermaster_Form != null)
            this.customermaster_Form.reset();
        this.customermaster_Form.patchValue({
        });
        this.tbl_customerdetails?.reset();
        this.tbl_customertermsacceptances?.reset();
        this.tbl_customerpaymodes?.reset();
        this.tbl_customersecurityquestions?.reset();
        this.tbl_customersecurityquestionshistories?.reset();
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let customerid = this.customermaster_Form.get('customerid').value;
        if (customerid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.customermaster_service.delete_customermaster(customerid);
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
        this.customermaster_Form.patchValue({
            customerid: null
        });
        if (this.formData.customerid != null) this.formData.customerid = null;
        this.tbl_customerdetails.data = [];
        this.tbl_customertermsacceptances.data = [];
        this.tbl_customerpaymodes.data = [];
        this.tbl_customersecurityquestions.data = [];
        this.tbl_customersecurityquestionshistories.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.customermaster_Form.patchValue({
            customerid: null
        });
        if (this.formData.customerid != null) this.formData.customerid = null;
        for (let i = 0; i < this.tbl_customerdetails.data.length; i++) {
            this.tbl_customerdetails.data[i].customerdetailid = null;
        }
        for (let i = 0; i < this.tbl_customertermsacceptances.data.length; i++) {
            this.tbl_customertermsacceptances.data[i].customertermid = null;
        }
        for (let i = 0; i < this.tbl_customerpaymodes.data.length; i++) {
            this.tbl_customerpaymodes.data[i].payid = null;
        }
        for (let i = 0; i < this.tbl_customersecurityquestions.data.length; i++) {
            this.tbl_customersecurityquestions.data[i].securityquestionid = null;
        }
        for (let i = 0; i < this.tbl_customersecurityquestionshistories.data.length; i++) {
            this.tbl_customersecurityquestionshistories.data[i].historyid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'customerid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "dob")
                        this.customermaster_Form.patchValue({ "dob": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "deletionaccountrequestedon")
                        this.customermaster_Form.patchValue({ "deletionaccountrequestedon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "autodeletedon")
                        this.customermaster_Form.patchValue({ "autodeletedon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "deleterevokedon")
                        this.customermaster_Form.patchValue({ "deleterevokedon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (key == "createdon")
                        this.customermaster_Form.patchValue({ "createdon": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.customermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.customermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.customermaster_Form.controls[key] != undefined) {
                                this.customermaster_Form.controls[key].disable({ onlySelf: true });
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
        return this.customfieldservice.getcustomfieldconfigurationsByTable("customermasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    mode_onChange(evt: any) {
        let e = this.f.mode.value as any;
    }
    type_onChange(evt: any) {
        let e = this.f.type.value as any;
    }
    defaultavatar_onChange(evt: any) {
        let e = this.f.defaultavatar.value as any;
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



    edit_customermasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.customerphoto != null && this.customerphoto != undefined) this.customerphoto.setattachmentlist(this.customermaster_Form.get('customerphoto').value);
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_customerdetails.fkname = "customerid";
            this.tbl_customerdetails.fk = this.formid;
            this.tbl_customerdetails.paramsChange('cstdt');
            this.tbl_customertermsacceptances.fkname = "customerid";
            this.tbl_customertermsacceptances.fk = this.formid;
            this.tbl_customertermsacceptances.paramsChange('cta');
            this.tbl_customerpaymodes.fkname = "customerid";
            this.tbl_customerpaymodes.fk = this.formid;
            this.tbl_customerpaymodes.paramsChange('cpm');
            this.tbl_customersecurityquestions.fkname = "customerid";
            this.tbl_customersecurityquestions.fk = this.formid;
            this.tbl_customersecurityquestions.paramsChange('csq');
            this.tbl_customersecurityquestionshistories.fkname = "customerid";
            this.tbl_customersecurityquestionshistories.fk = this.formid;
            this.tbl_customersecurityquestionshistories.paramsChange('csqh');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.customermaster_service.get_customermasters_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.customermaster;
                let formproperty = res.customermaster.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.customermaster.pkcol;
                this.formid = res.customermaster.customerid;
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
            this.formData = res.customermaster;
            this.formid = res.customermaster.customerid;
            this.pkcol = res.customermaster.pkcol;
            this.bmyrecord = false;
            if ((res.customermaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.customermaster_Form.patchValue({
                pkcol: res.customermaster.pkcol,
                customerid: res.customermaster.customerid,
                mode: this.sharedService.getValue('', this.mode_List, res.customermaster.mode, 'mode'),
                modedesc: res.customermaster.modedesc,
                uid: res.customermaster.uid,
                type: this.sharedService.getValue('', this.type_List, res.customermaster.type, 'type'),
                typedesc: res.customermaster.typedesc,
                firstname: res.customermaster.firstname,
                lastname: res.customermaster.lastname,
                email: res.customermaster.email,
                mobile: res.customermaster.mobile,
                dob: res.customermaster.dob == null ? null : new Date(res.customermaster.dob),
                customerinterests: res.customermaster.customerinterests,
                defaultavatar: this.sharedService.getValue('', this.defaultavatar_List, res.customermaster.defaultavatar, 'defaultavatar'),
                defaultavatardesc: res.customermaster.defaultavatardesc,
                customerphoto: this.sharedService.JSON_parse(res.customermaster.customerphoto),
                googleid: res.customermaster.googleid,
                facebookid: res.customermaster.facebookid,
                lasttermsaccepted: res.customermaster.lasttermsaccepted,
                customfield: res.customermaster.customfield,
                attachment: this.sharedService.JSON_parse(res.customermaster.attachment),
                status: res.customermaster.status,
                statusdesc: res.customermaster.statusdesc,
                deletionaccountrequestedon: res.customermaster.deletionaccountrequestedon == null ? null : new Date(res.customermaster.deletionaccountrequestedon),
                autodeletedon: res.customermaster.autodeletedon == null ? null : new Date(res.customermaster.autodeletedon),
                deleterevokedon: res.customermaster.deleterevokedon == null ? null : new Date(res.customermaster.deleterevokedon),
                createdon: res.customermaster.createdon == null ? null : new Date(res.customermaster.createdon),
            });
            this.customermaster_menuactions = res.customermaster_menuactions;
            this.customerdetail_menuactions = res.customerdetail_menuactions;
            this.customerdetails_visiblelist = res.customerdetails_visiblelist;
            this.customertermsacceptance_menuactions = res.customertermsacceptance_menuactions;
            this.customertermsacceptances_visiblelist = res.customertermsacceptances_visiblelist;
            this.customerpaymode_menuactions = res.customerpaymode_menuactions;
            this.customerpaymodes_visiblelist = res.customerpaymodes_visiblelist;
            this.customersecurityquestion_menuactions = res.customersecurityquestion_menuactions;
            this.customersecurityquestions_visiblelist = res.customersecurityquestions_visiblelist;
            this.customersecurityquestionshistory_menuactions = res.customersecurityquestionshistory_menuactions;
            this.customersecurityquestionshistories_visiblelist = res.customersecurityquestionshistories_visiblelist;
            if (this.customermaster_Form.get('customfield').value != null && this.customermaster_Form.get('customfield').value != "") this.customFieldJson = this.sharedService.JSON_parse(this.customermaster_Form.get('customfield').value);
            this.FillCustomField();
            if (this.customermaster_Form.get('customerphoto').value != null && this.customermaster_Form.get('customerphoto').value != "" && this.customerphoto != null && this.customerphoto != undefined) this.customerphoto.setattachmentlist(this.customermaster_Form.get('customerphoto').value);
            if (this.customermaster_Form.get('attachment').value != null && this.customermaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.customermaster_Form.get('attachment').value);
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

        for (let key in this.customermaster_Form.controls) {
            let val = this.customermaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.customermaster_Form.controls[key] != null) {
                if (key == "customerphoto") {
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
        formData = this.customermaster_Form.getRawValue();
        var customfields = this.customfieldservice.getCustomValues(document);
        formData.mode = (this.customermaster_Form.get('mode'))?.value?.value;
        formData.type = (this.customermaster_Form.get('type'))?.value?.value;
        formData.dob = this.sharedService.getDate(this.customermaster_Form.get('dob').value)
        formData.defaultavatar = (this.customermaster_Form.get('defaultavatar'))?.value?.value;
        if (this.customerphoto.getAttachmentList() != null) formData.customerphoto = JSON.stringify(this.customerphoto.getAttachmentList());
        if (customfields != null) formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        formData.deletionaccountrequestedon = this.sharedService.getDate(this.customermaster_Form.get('deletionaccountrequestedon').value)
        formData.autodeletedon = this.sharedService.getDate(this.customermaster_Form.get('autodeletedon').value)
        formData.deleterevokedon = this.sharedService.getDate(this.customermaster_Form.get('deleterevokedon').value)
        formData.createdon = this.sharedService.getDate(this.customermaster_Form.get('createdon').value)
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.customermaster_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.customerid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.customermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            Object.keys(this.customermaster_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.customermaster_Form.get(key).errors;
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


            if (!this.customermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
            let res = await this.customermaster_service.save_customermasters(this.formData, this.customerphoto.getAllFiles(), this.fileAttachmentList, this.Deleted_customerdetail_IDs, this.Deleted_customertermsacceptance_IDs, this.Deleted_customerpaymode_IDs, this.Deleted_customersecurityquestion_IDs, this.Deleted_customersecurityquestionshistory_IDs, this.tbl_customerdetails?.data, this.tbl_customertermsacceptances?.data, this.tbl_customerpaymodes?.data, this.tbl_customersecurityquestions?.data, this.tbl_customersecurityquestionshistories?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).customermaster);
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
                    this.objvalues.push((res as any).customermaster);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.customermaster_Form.markAsUntouched();
            this.customermaster_Form.markAsPristine();
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

    AddOrEdit_customerdetail(event: any, customerdetailid: any, customerid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, customerdetailid: event?.data?.pk, customerid, visiblelist: this.customerdetails_visiblelist, hidelist: this.customerdetails_hidelist, ScreenType: 2, type: this.customermaster_Form.get('type').value?.value, typedesc: this.customermaster_Form.get('typedesc').value?.label, uid: this.customermaster_Form.get('uid').value };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(customerdetailComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_customerdetails.add(res[i]);
                    }
                }
                else {
                    this.tbl_customerdetails.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_customerdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_customerdetail_IDs += childID + ",";
        this.tbl_customerdetails.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_customertermsacceptance(event: any, customertermid: any, customerid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, customertermid: event?.data?.pk, customerid, visiblelist: this.customertermsacceptances_visiblelist, hidelist: this.customertermsacceptances_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(customertermsacceptanceComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_customertermsacceptances.add(res[i]);
                    }
                }
                else {
                    this.tbl_customertermsacceptances.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_customertermsacceptance(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_customertermsacceptance_IDs += childID + ",";
        this.tbl_customertermsacceptances.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_customerpaymode(event: any, payid: any, customerid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, payid: event?.data?.pk, customerid, visiblelist: this.customerpaymodes_visiblelist, hidelist: this.customerpaymodes_hidelist, ScreenType: 2, uid: this.customermaster_Form.get('uid').value };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(customerpaymodeComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_customerpaymodes.add(res[i]);
                    }
                }
                else {
                    this.tbl_customerpaymodes.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_customerpaymode(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_customerpaymode_IDs += childID + ",";
        this.tbl_customerpaymodes.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_customersecurityquestion(event: any, securityquestionid: any, customerid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, securityquestionid: event?.data?.pk, customerid, visiblelist: this.customersecurityquestions_visiblelist, hidelist: this.customersecurityquestions_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(customersecurityquestionComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_customersecurityquestions.add(res[i]);
                    }
                }
                else {
                    this.tbl_customersecurityquestions.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_customersecurityquestion(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_customersecurityquestion_IDs += childID + ",";
        this.tbl_customersecurityquestions.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_customersecurityquestionshistory(event: any, historyid: any, customerid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, historyid: event?.data?.pk, customerid, visiblelist: this.customersecurityquestionshistories_visiblelist, hidelist: this.customersecurityquestionshistories_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(customersecurityquestionshistoryComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_customersecurityquestionshistories.add(res[i]);
                    }
                }
                else {
                    this.tbl_customersecurityquestionshistories.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_customersecurityquestionshistory(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_customersecurityquestionshistory_IDs += childID + ",";
        this.tbl_customersecurityquestionshistories.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes customerdetails
    customerdetails_settings: any;

    show_customerdetails_Checkbox() {
        //debugger;
    }
    delete_customerdetails_All() {
        //this.tbl_customerdetails.source.settings['selectMode'] = 'single';
    }
    show_customerdetails_InActive() {
    }
    enable_customerdetails_InActive() {
    }
    async customerdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_customerdetails(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_customerdetail(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_customerdetail_IDs += event.data.pk + ",";

        }
    }
    async onCustom_customerdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "customerdetails");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_customerdetails_GridSelected(event: any) {
        //this.customerdetails_selectedindex=this.tbl_customerdetails.source.data.findIndex(i => i.customerdetailid === event.data.customerdetailid);
    }
    Is_customerdetails_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customerdetails_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_customerdetails_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customerdetails_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes customerdetails
    //start of Grid Codes customertermsacceptances
    customertermsacceptances_settings: any;

    show_customertermsacceptances_Checkbox() {
        //debugger;
    }
    delete_customertermsacceptances_All() {
        //this.tbl_customertermsacceptances.source.settings['selectMode'] = 'single';
    }
    show_customertermsacceptances_InActive() {
    }
    enable_customertermsacceptances_InActive() {
    }
    async customertermsacceptances_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_customertermsacceptances(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_customertermsacceptance(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_customertermsacceptance_IDs += event.data.pk + ",";

        }
    }
    async onCustom_customertermsacceptances_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "customertermsacceptances");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_customertermsacceptances_GridSelected(event: any) {
        //this.customertermsacceptances_selectedindex=this.tbl_customertermsacceptances.source.data.findIndex(i => i.customertermid === event.data.customertermid);
    }
    Is_customertermsacceptances_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customertermsacceptances_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_customertermsacceptances_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customertermsacceptances_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes customertermsacceptances
    //start of Grid Codes customerpaymodes
    customerpaymodes_settings: any;

    show_customerpaymodes_Checkbox() {
        //debugger;
    }
    delete_customerpaymodes_All() {
        //this.tbl_customerpaymodes.source.settings['selectMode'] = 'single';
    }
    show_customerpaymodes_InActive() {
    }
    enable_customerpaymodes_InActive() {
    }
    async customerpaymodes_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_customerpaymodes(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_customerpaymode(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_customerpaymode_IDs += event.data.pk + ",";

        }
    }
    async onCustom_customerpaymodes_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "customerpaymodes");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_customerpaymodes_GridSelected(event: any) {
        //this.customerpaymodes_selectedindex=this.tbl_customerpaymodes.source.data.findIndex(i => i.payid === event.data.payid);
    }
    Is_customerpaymodes_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customerpaymodes_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_customerpaymodes_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customerpaymodes_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes customerpaymodes
    //start of Grid Codes customersecurityquestions
    customersecurityquestions_settings: any;

    show_customersecurityquestions_Checkbox() {
        //debugger;
    }
    delete_customersecurityquestions_All() {
        //this.tbl_customersecurityquestions.source.settings['selectMode'] = 'single';
    }
    show_customersecurityquestions_InActive() {
    }
    enable_customersecurityquestions_InActive() {
    }
    async customersecurityquestions_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_customersecurityquestions(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_customersecurityquestion(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_customersecurityquestion_IDs += event.data.pk + ",";

        }
    }
    async onCustom_customersecurityquestions_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "customersecurityquestions");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_customersecurityquestions_GridSelected(event: any) {
        //this.customersecurityquestions_selectedindex=this.tbl_customersecurityquestions.source.data.findIndex(i => i.securityquestionid === event.data.securityquestionid);
    }
    Is_customersecurityquestions_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customersecurityquestions_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_customersecurityquestions_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customersecurityquestions_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes customersecurityquestions
    //start of Grid Codes customersecurityquestionshistories
    customersecurityquestionshistories_settings: any;

    show_customersecurityquestionshistories_Checkbox() {
        //debugger;
    }
    delete_customersecurityquestionshistories_All() {
        //this.tbl_customersecurityquestionshistories.source.settings['selectMode'] = 'single';
    }
    show_customersecurityquestionshistories_InActive() {
    }
    enable_customersecurityquestionshistories_InActive() {
    }
    async customersecurityquestionshistories_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_customersecurityquestionshistories(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_customersecurityquestionshistory(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_customersecurityquestionshistory_IDs += event.data.pk + ",";

        }
    }
    async onCustom_customersecurityquestionshistories_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "customersecurityquestionshistories");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_customersecurityquestionshistories_GridSelected(event: any) {
        //this.customersecurityquestionshistories_selectedindex=this.tbl_customersecurityquestionshistories.source.data.findIndex(i => i.historyid === event.data.historyid);
    }
    Is_customersecurityquestionshistories_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customersecurityquestionshistories_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_customersecurityquestionshistories_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.customersecurityquestionshistories_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes customersecurityquestionshistories

}



