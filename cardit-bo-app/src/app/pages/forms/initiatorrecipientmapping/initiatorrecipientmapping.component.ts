import { initiatorrecipientmappingService } from './../../../service/initiatorrecipientmapping.service';
import { initiatorrecipientmapping } from './../../../model/initiatorrecipientmapping.model';
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
    selector: 'app-initiatorrecipientmapping',
    templateUrl: './initiatorrecipientmapping.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class initiatorrecipientmappingComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: initiatorrecipientmapping;
    list: initiatorrecipientmapping[];
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
    bfilterPopulate_initiatorrecipientmappings: boolean = false;
    initiatorrecipientmapping_menuactions: any = []

    initiatorrecipientmapping_Form: FormGroup;

    customerid_List: DropDownValues[];
    customerid_Suggestions: any[];
    customerid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    uid_List: DropDownValues[];
    uid_Suggestions: any[];
    uid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    recipientuid_List: DropDownValues[];
    recipientuid_Suggestions: any[];
    recipientuid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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
        private initiatorrecipientmapping_service: initiatorrecipientmappingService,
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
            this.initiatorrecipientmapping_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                mappingid: [null],
                customerid: [null, Validators.compose([Validators.required,])],
                customeriddesc: [null],
                uid: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                uiddesc: [null],
                recipientuid: [null, Validators.compose([Validators.required,])],
                recipientuiddesc: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.initiatorrecipientmapping_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.initiatorrecipientmapping_Form.dirty && this.initiatorrecipientmapping_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.mappingid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.mappingid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.mappingid && pkDetail) {
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
            let initiatorrecipientmappingid = null;

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
            this.formData = new initiatorrecipientmapping();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = initiatorrecipientmappingid;
            //alert(initiatorrecipientmappingid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.initiatorrecipientmapping_service.getDefaultData().then(res => {
                this.customerid_List = res.list_customerid.value;
                this.customerid_Suggestions = this.customerid_List;
                if (this.formData?.customerid != undefined && this.formData?.customerid != null) {
                    this.initiatorrecipientmapping_Form.patchValue({
                        customerid: this.sharedService.getValue('', this.customerid_List, this.formData.customerid?.toString(), 'customerid')
                    });
                }
                this.uid_List = res.list_uid.value;
                this.uid_Suggestions = this.uid_List;
                if (this.formData?.uid != undefined && this.formData?.uid != null) {
                    this.initiatorrecipientmapping_Form.patchValue({
                        uid: this.sharedService.getValue('uid', this.uid_List, this.formData.uid?.toString(), 'uid')
                    });
                }
                this.recipientuid_List = res.list_recipientuid.value;
                this.recipientuid_Suggestions = this.recipientuid_List;
                if (this.formData?.recipientuid != undefined && this.formData?.recipientuid != null) {
                    this.initiatorrecipientmapping_Form.patchValue({
                        recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, this.formData.recipientuid?.toString(), 'recipientuid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.initiatorrecipientmapping_service.get_initiatorrecipientmappings_List().then(res => {
                this.pkList = res as initiatorrecipientmapping[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'initiatorrecipientmappingsList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.initiatorrecipientmapping_Form.markAsUntouched();
            this.initiatorrecipientmapping_Form.markAsPristine();
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

    onEntered_recipientuid(value: any) {
        this.recipientuid_Suggestions = this.recipientuid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_recipientuid(recipientuidDetail: any) {
        if (recipientuidDetail.value && recipientuidDetail) {

        }
    }


    onCopyRecursive(){

    }
    onChangeAction(){}

    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.initiatorrecipientmapping_Form != null)
            this.initiatorrecipientmapping_Form.reset();
        this.initiatorrecipientmapping_Form.patchValue({
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let mappingid = this.initiatorrecipientmapping_Form.get('mappingid').value;
        if (mappingid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.initiatorrecipientmapping_service.delete_initiatorrecipientmapping(mappingid);
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
        this.initiatorrecipientmapping_Form.patchValue({
            mappingid: null
        });
        if (this.formData.mappingid != null) this.formData.mappingid = null;
    }
    onCopyDetails() {
        this.formid = null;
        this.initiatorrecipientmapping_Form.patchValue({
            mappingid: null
        });
        if (this.formData.mappingid != null) this.formData.mappingid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'mappingid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.initiatorrecipientmapping_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.initiatorrecipientmapping_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.initiatorrecipientmapping_Form.controls[key] != undefined) {
                                this.initiatorrecipientmapping_Form.controls[key].disable({ onlySelf: true });
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
    recipientuid_onChange(evt: any) {
        let e = this.f.recipientuid.value as any;
    }

    edit_initiatorrecipientmappings() {
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
            this.initiatorrecipientmapping_service.get_initiatorrecipientmappings_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.initiatorrecipientmapping;
                let formproperty = res.initiatorrecipientmapping.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.initiatorrecipientmapping.pkcol;
                this.formid = res.initiatorrecipientmapping.mappingid;
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
            this.formData = res.initiatorrecipientmapping;
            this.formid = res.initiatorrecipientmapping.mappingid;
            this.pkcol = res.initiatorrecipientmapping.pkcol;
            this.bmyrecord = false;
            if ((res.initiatorrecipientmapping as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.initiatorrecipientmapping_Form.patchValue({
                pkcol: res.initiatorrecipientmapping.pkcol,
                mappingid: res.initiatorrecipientmapping.mappingid,
                customerid: this.sharedService.getValue('', this.customerid_List, res.initiatorrecipientmapping.customerid, 'customerid'),
                customeriddesc: res.initiatorrecipientmapping.customeriddesc,
                uid: this.sharedService.getValue('uid', this.uid_List, res.initiatorrecipientmapping.uid, 'uid'),
                uiddesc: res.initiatorrecipientmapping.uiddesc,
                recipientuid: this.sharedService.getValue('uid', this.recipientuid_List, res.initiatorrecipientmapping.recipientuid, 'recipientuid'),
                recipientuiddesc: res.initiatorrecipientmapping.recipientuiddesc,
                status: res.initiatorrecipientmapping.status,
                statusdesc: res.initiatorrecipientmapping.statusdesc,
            });
            this.initiatorrecipientmapping_menuactions = res.initiatorrecipientmapping_menuactions;
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

        for (let key in this.initiatorrecipientmapping_Form.controls) {
            let val = this.initiatorrecipientmapping_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.initiatorrecipientmapping_Form.controls[key] != null) {
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
        formData = this.initiatorrecipientmapping_Form.getRawValue();
        formData.customerid = (this.initiatorrecipientmapping_Form.get('customerid'))?.value?.value;
        formData.uid = (this.initiatorrecipientmapping_Form.get('uid'))?.value?.uid;
        formData.recipientuid = (this.initiatorrecipientmapping_Form.get('recipientuid'))?.value?.uid;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.initiatorrecipientmapping_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.mappingid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.initiatorrecipientmapping_Form.valid) {
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
            Object.keys(this.initiatorrecipientmapping_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.initiatorrecipientmapping_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.initiatorrecipientmapping_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.initiatorrecipientmapping_service.save_initiatorrecipientmappings(this.formData);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).initiatorrecipientmapping);
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
                    this.objvalues.push((res as any).initiatorrecipientmapping);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.initiatorrecipientmapping_Form.markAsUntouched();
            this.initiatorrecipientmapping_Form.markAsPristine();
            if(bclear == true){
              
                this.router.navigateByUrl['home/boreportviewer/irm'];
                this.router.navigate(['home/' + 'boreportviewer' + '/' + 'irm' ]);
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
        this.initiatorrecipientmapping_Form.reset() ;
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



