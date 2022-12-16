import { initiatorrecipientprivateService } from './../../../service/initiatorrecipientprivate.service';
import { initiatorrecipientprivate } from './../../../model/initiatorrecipientprivate.model';
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

@Component({
    selector: 'app-initiatorrecipientprivate',
    templateUrl: './initiatorrecipientprivate.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class initiatorrecipientprivateComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: initiatorrecipientprivate;
    list: initiatorrecipientprivate[];
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

    bfilterPopulate_initiatorrecipientprivates: boolean = false;
    initiatorrecipientprivate_menuactions: any = []

    initiatorrecipientprivate_Form: FormGroup;

    customerid_List: DropDownValues[];
    customerid_Suggestions: any[];
    customerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    uid_List: DropDownValues[];
    uid_Suggestions: any[];
    uid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    type_List: DropDownValues[];
    type_Suggestions: any[];
    type_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    geoid_List: DropDownValues[];
    geoid_Suggestions: any[];
    geoid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    cityid_List: DropDownValues[];
    cityid_Suggestions: any[];
    cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private initiatorrecipientprivate_service: initiatorrecipientprivateService,
        private fb: FormBuilder,
        private sharedService: SharedService,
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
            this.initiatorrecipientprivate_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                privateid: [null],
                customerid: [null, Validators.compose([Validators.required,])],
                customeriddesc: [null],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                uiddesc: [null],
                type: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                typedesc: [null],
                firstname: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                lastname: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                email: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                mobile: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                geoid: [null, Validators.compose([Validators.required,])],
                geoiddesc: [null],
                cityid: [null, Validators.compose([Validators.required,])],
                cityiddesc: [null],
                pincode: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                bankaccountnumber: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                bankname: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                iban: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                accountname: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.initiatorrecipientprivate_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.initiatorrecipientprivate_Form.dirty && this.initiatorrecipientprivate_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.privateid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.privateid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.privateid && pkDetail) {
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
            let initiatorrecipientprivateid = null;

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
            this.formData = new initiatorrecipientprivate();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = initiatorrecipientprivateid;
            //alert(initiatorrecipientprivateid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.initiatorrecipientprivate_service.getDefaultData().then(res => {
                this.customerid_List = res.list_customerid.value;
                this.customerid_Suggestions = this.customerid_List;
                if (this.formData?.customerid != undefined && this.formData?.customerid != null) {
                    this.initiatorrecipientprivate_Form.patchValue({
                        customerid: this.sharedService.getValue('', this.customerid_List, this.formData.customerid?.toString(), 'customerid')
                    });
                }
                this.uid_List = res.list_uid.value;
                this.uid_Suggestions = this.uid_List;
                if (this.formData?.uid != undefined && this.formData?.uid != null) {
                    this.initiatorrecipientprivate_Form.patchValue({
                        uid: this.sharedService.getValue('uid', this.uid_List, this.formData.uid?.toString(), 'uid')
                    });
                }
                this.type_List = res.list_type.value;
                if (this.formData?.type != undefined && this.formData?.type != null) {
                    this.initiatorrecipientprivate_Form.patchValue({
                        type: this.formData.type
                    });
                }
                this.geoid_List = res.list_geoid.value;
                this.geoid_Suggestions = this.geoid_List;
                if (this.formData?.geoid != undefined && this.formData?.geoid != null) {
                    this.initiatorrecipientprivate_Form.patchValue({
                        geoid: this.sharedService.getValue('', this.geoid_List, this.formData.geoid?.toString(), 'geoid')
                    });
                }
                if (this.formData?.geoid && this.formData?.geoid?.toString() != "" && this.formData?.geoid != null) {
                    this.initiatorrecipientprivate_service.getList_cityid(this.formData?.geoid).then(res => {
                        this.cityid_List = res as DropDownValues[];
                        this.initiatorrecipientprivate_Form.patchValue({
                            cityid: this.sharedService.getValue('', this.cityid_List, this.formData.cityid?.toString(), 'cityid')
                        });
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.initiatorrecipientprivate_service.get_initiatorrecipientprivates_List().then(res => {
                this.pkList = res as initiatorrecipientprivate[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'initiatorrecipientprivatesList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.initiatorrecipientprivate_Form.markAsUntouched();
            this.initiatorrecipientprivate_Form.markAsPristine();
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

    onEntered_type(value: any) {
        this.type_Suggestions = this.type_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_type(typeDetail: any) {
        if (typeDetail.value && typeDetail) {

        }
    }

    onEntered_geoid(value: any) {
        this.geoid_Suggestions = this.geoid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_geoid(geoidDetail: any) {
        if (geoidDetail.value && geoidDetail) {
            this.initiatorrecipientprivate_service.getList_cityid(geoidDetail.value).then(res => {
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




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.initiatorrecipientprivate_Form != null)
            this.initiatorrecipientprivate_Form.reset();
        this.initiatorrecipientprivate_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let privateid = this.initiatorrecipientprivate_Form.get('privateid').value;
        if (privateid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.initiatorrecipientprivate_service.delete_initiatorrecipientprivate(privateid);
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
        this.initiatorrecipientprivate_Form.patchValue({
            privateid: null
        });
        if (this.formData.privateid != null) this.formData.privateid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.initiatorrecipientprivate_Form.patchValue({
            privateid: null
        });
        if (this.formData.privateid != null) this.formData.privateid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'privateid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.initiatorrecipientprivate_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.initiatorrecipientprivate_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.initiatorrecipientprivate_Form.controls[key] != undefined) {
                                this.initiatorrecipientprivate_Form.controls[key].disable({ onlySelf: true });
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
    customerid_onChange(evt: any) {
        let e = this.f.customerid.value as any;
    }
    uid_onChange(evt: any) {
        let e = this.f.uid.value as any;
    }
    type_onChange(evt: any) {
        let e = this.f.type.value as any;
    }
    geoid_onChange(evt: any) {
        let e = this.f.geoid.value as any;
    }
    cityid_onChange(evt: any) {
        let e = this.f.cityid.value as any;
    }

    edit_initiatorrecipientprivates() {
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
            this.initiatorrecipientprivate_service.get_initiatorrecipientprivates_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.initiatorrecipientprivate;
                let formproperty = res.initiatorrecipientprivate.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.initiatorrecipientprivate.pkcol;
                this.formid = res.initiatorrecipientprivate.privateid;
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
            this.formData = res.initiatorrecipientprivate;
            this.formid = res.initiatorrecipientprivate.privateid;
            this.pkcol = res.initiatorrecipientprivate.pkcol;
            this.bmyrecord = false;
            if ((res.initiatorrecipientprivate as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.initiatorrecipientprivate_Form.patchValue({
                pkcol: res.initiatorrecipientprivate.pkcol,
                privateid: res.initiatorrecipientprivate.privateid,
                customerid: this.sharedService.getValue('', this.customerid_List, res.initiatorrecipientprivate.customerid, 'customerid'),
                customeriddesc: res.initiatorrecipientprivate.customeriddesc,
                uid: this.sharedService.getValue('uid', this.uid_List, res.initiatorrecipientprivate.uid, 'uid'),
                uiddesc: res.initiatorrecipientprivate.uiddesc,
                type: this.sharedService.getValue('', this.type_List, res.initiatorrecipientprivate.type, 'type'),
                typedesc: res.initiatorrecipientprivate.typedesc,
                firstname: res.initiatorrecipientprivate.firstname,
                lastname: res.initiatorrecipientprivate.lastname,
                email: res.initiatorrecipientprivate.email,
                mobile: res.initiatorrecipientprivate.mobile,
                geoid: this.sharedService.getValue('', this.geoid_List, res.initiatorrecipientprivate.geoid, 'geoid'),
                geoiddesc: res.initiatorrecipientprivate.geoiddesc,
                cityid: this.sharedService.getValue('', this.cityid_List, res.initiatorrecipientprivate.cityid, 'cityid'),
                cityiddesc: res.initiatorrecipientprivate.cityiddesc,
                pincode: res.initiatorrecipientprivate.pincode,
                bankaccountnumber: res.initiatorrecipientprivate.bankaccountnumber,
                bankname: res.initiatorrecipientprivate.bankname,
                iban: res.initiatorrecipientprivate.iban,
                accountname: res.initiatorrecipientprivate.accountname,
                status: res.initiatorrecipientprivate.status,
                statusdesc: res.initiatorrecipientprivate.statusdesc,
            });
            this.initiatorrecipientprivate_menuactions = res.initiatorrecipientprivate_menuactions;
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

        for (let key in this.initiatorrecipientprivate_Form.controls) {
            let val = this.initiatorrecipientprivate_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.initiatorrecipientprivate_Form.controls[key] != null) {
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
        formData = this.initiatorrecipientprivate_Form.getRawValue();
        formData.customerid = (this.initiatorrecipientprivate_Form.get('customerid'))?.value?.value;
        formData.uid = (this.initiatorrecipientprivate_Form.get('uid'))?.value?.uid;
        formData.type = (this.initiatorrecipientprivate_Form.get('type'))?.value?.value;
        formData.geoid = (this.initiatorrecipientprivate_Form.get('geoid'))?.value?.value;
        formData.cityid = (this.initiatorrecipientprivate_Form.get('cityid'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.initiatorrecipientprivate_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.privateid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.initiatorrecipientprivate_Form.valid) {
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
            Object.keys(this.initiatorrecipientprivate_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.initiatorrecipientprivate_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.initiatorrecipientprivate_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.initiatorrecipientprivate_service.save_initiatorrecipientprivates(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).initiatorrecipientprivate);
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
                    this.objvalues.push((res as any).initiatorrecipientprivate);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.initiatorrecipientprivate_Form.markAsUntouched();
            this.initiatorrecipientprivate_Form.markAsPristine();
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



