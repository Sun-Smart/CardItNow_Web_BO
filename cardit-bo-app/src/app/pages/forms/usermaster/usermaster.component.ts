import { usermasterService } from './../../../service/usermaster.service';
import { usermaster } from './../../../model/usermaster.model';
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
import { userrolemasterComponent } from './../../../pages/forms/userrolemaster/userrolemaster.component';
import { userrolemasterService } from './../../../service/userrolemaster.service';
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
    selector: 'app-usermaster',
    templateUrl: './usermaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class usermasterComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: usermaster;
    list: usermaster[];
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
    bfilterPopulate_usermasters: boolean = false;
    bfilterPopulate_userrolemasters: boolean = false;
    usermaster_menuactions: any = []
    userrolemaster_menuactions: any = []
    userrolemaster_visible: boolean = true;
    userrolemaster_disabled: boolean = false;
    @ViewChild('tbl_userrolemasters', { static: false }) tbl_userrolemasters!: ReportViewerCtrlComponent;

    usermaster_Form: FormGroup;

    roleid_List: DropDownValues[];
    roleid_Suggestions: any[];
    roleid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    basegeoid_List: DropDownValues[];
    basegeoid_Suggestions: any[];
    basegeoid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    userrolemasters_visiblelist: any;
    userrolemasters_hidelist: any;

    Deleted_userrolemaster_IDs: string = "";
    userrolemasters_ID: string = "1";
    userrolemasters_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private usermaster_service: usermasterService,
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
            this.usermaster_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                userid: [null],
                username: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                roleid: [null, Validators.compose([Validators.required,])],
                roleiddesc: [null],
                email: [null, Validators.compose([Validators.required, Validators.maxLength(200)])],
                emailpassword: [null, Validators.compose([Validators.maxLength(100)])],
                mobile: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
                basegeoid: [null, Validators.compose([Validators.required,])],
                basegeoiddesc: [null],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.usermaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.usermaster_Form.dirty && this.usermaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    mobileexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.mobile?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].userid?.toString() != this.formid?.toString()) {
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
    emailexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.email?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].userid?.toString() != this.formid?.toString()) {
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

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.userid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.userid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.userid && pkDetail) {
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
            let usermasterid = null;

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
            this.formData = new usermaster();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = usermasterid;
            //alert(usermasterid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.usermaster_service.getDefaultData().then(res => {
                this.roleid_List = res.list_roleid.value;
                this.roleid_Suggestions = this.roleid_List;
                if (this.formData?.roleid != undefined && this.formData?.roleid != null) {
                    this.usermaster_Form.patchValue({
                        roleid: this.sharedService.getValue('', this.roleid_List, this.formData.roleid?.toString(), 'roleid')
                    });
                }
                this.basegeoid_List = res.list_basegeoid.value;
                this.basegeoid_Suggestions = this.basegeoid_List;
                if (this.formData?.basegeoid != undefined && this.formData?.basegeoid != null) {
                    this.usermaster_Form.patchValue({
                        basegeoid: this.sharedService.getValue('', this.basegeoid_List, this.formData.basegeoid?.toString(), 'basegeoid')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.usermaster_service.get_usermasters_List().then(res => {
                this.pkList = res as usermaster[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'usermastersList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.usermaster_Form.markAsUntouched();
            this.usermaster_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_roleid(value: any) {
        this.roleid_Suggestions = this.roleid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_roleid(roleidDetail: any) {
        if (roleidDetail.value && roleidDetail) {

        }
    }

    onEntered_basegeoid(value: any) {
        this.basegeoid_Suggestions = this.basegeoid_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_basegeoid(basegeoidDetail: any) {
        if (basegeoidDetail.value && basegeoidDetail) {

        }
    }

    onCopyRecursive(){}
    onChangeAction(){}


    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.usermaster_Form != null)
            this.usermaster_Form.reset();
        this.usermaster_Form.patchValue({
        });
        this.tbl_userrolemasters?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let userid = this.usermaster_Form.get('userid').value;
        if (userid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.usermaster_service.delete_usermaster(userid);
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
        this.usermaster_Form.patchValue({
            userid: null
        });
        if (this.formData.userid != null) this.formData.userid = null;
        this.tbl_userrolemasters.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.usermaster_Form.patchValue({
            userid: null
        });
        if (this.formData.userid != null) this.formData.userid = null;
        for (let i = 0; i < this.tbl_userrolemasters.data.length; i++) {
            this.tbl_userrolemasters.data[i].roleid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'userid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.usermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.usermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.usermaster_Form.controls[key] != undefined) {
                                this.usermaster_Form.controls[key].disable({ onlySelf: true });
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
    roleid_onChange(evt: any) {
        let e = this.f.roleid.value as any;
    }
    basegeoid_onChange(evt: any) {
        let e = this.f.basegeoid.value as any;
    }

    edit_usermasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_userrolemasters.fkname = "userid";
            this.tbl_userrolemasters.fk = this.formid;
            this.tbl_userrolemasters.paramsChange('urm');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.usermaster_service.get_usermasters_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.usermaster;
                let formproperty = res.usermaster.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.usermaster.pkcol;
                this.formid = res.usermaster.userid;
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
            this.formData = res.usermaster;
            this.formid = res.usermaster.userid;
            this.pkcol = res.usermaster.pkcol;
            this.bmyrecord = false;
            if ((res.usermaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.usermaster_Form.patchValue({
                pkcol: res.usermaster.pkcol,
                userid: res.usermaster.userid,
                username: res.usermaster.username,
                roleid: this.sharedService.getValue('', this.roleid_List, res.usermaster.roleid, 'roleid'),
                roleiddesc: res.usermaster.roleiddesc,
                email: res.usermaster.email,
                emailpassword: res.usermaster.emailpassword,
                mobile: res.usermaster.mobile,
                basegeoid: this.sharedService.getValue('', this.basegeoid_List, res.usermaster.basegeoid, 'basegeoid'),
                basegeoiddesc: res.usermaster.basegeoiddesc,
                status: res.usermaster.status,
                statusdesc: res.usermaster.statusdesc,
            });
            this.usermaster_menuactions = res.usermaster_menuactions;
            this.userrolemaster_menuactions = res.userrolemaster_menuactions;
            this.userrolemasters_visiblelist = res.userrolemasters_visiblelist;
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

        for (let key in this.usermaster_Form.controls) {
            let val = this.usermaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.usermaster_Form.controls[key] != null) {
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
        formData = this.usermaster_Form.getRawValue();
        formData.roleid = (this.usermaster_Form.get('roleid'))?.value?.value;
        formData.basegeoid = (this.usermaster_Form.get('basegeoid'))?.value?.value;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.usermaster_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.userid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.usermaster_Form.valid) {
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
            Object.keys(this.usermaster_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.usermaster_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.usermaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.usermaster_service.save_usermasters(this.formData, this.Deleted_userrolemaster_IDs, this.tbl_userrolemasters?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).usermaster);
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
                    this.objvalues.push((res as any).usermaster);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.usermaster_Form.markAsUntouched();
            this.usermaster_Form.markAsPristine();

            if(bclear == true){
              
                this.router.navigateByUrl['home/boreportviewer/umt'];
                this.router.navigate(['home/' + 'boreportviewer' + '/' + 'umt' ]);
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
        this.usermaster_Form.reset() ;
    }

    AddOrEdit_userrolemaster(event: any, roleid: any, userid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, roleid: event?.data?.pk, userid, visiblelist: this.userrolemasters_visiblelist, hidelist: this.userrolemasters_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(userrolemasterComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_userrolemasters.add(res[i]);
                    }
                }
                else {
                    this.tbl_userrolemasters.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_userrolemaster(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_userrolemaster_IDs += childID + ",";
        this.tbl_userrolemasters.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes userrolemasters
    userrolemasters_settings: any;

    show_userrolemasters_Checkbox() {
        //debugger;
    }
    delete_userrolemasters_All() {
        //this.tbl_userrolemasters.source.settings['selectMode'] = 'single';
    }
    show_userrolemasters_InActive() {
    }
    enable_userrolemasters_InActive() {
    }
    async userrolemasters_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_userrolemasters(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_userrolemaster(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_userrolemaster_IDs += event.data.pk + ",";

        }
    }
    async onCustom_userrolemasters_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "userrolemasters");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_userrolemasters_GridSelected(event: any) {
        //this.userrolemasters_selectedindex=this.tbl_userrolemasters.source.data.findIndex(i => i.roleid === event.data.roleid);
    }
    Is_userrolemasters_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.userrolemasters_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_userrolemasters_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.userrolemasters_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes userrolemasters

}



