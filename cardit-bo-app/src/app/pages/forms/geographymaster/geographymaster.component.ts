import { geographymasterService } from './../../../service/geographymaster.service';
import { geographymaster } from './../../../model/geographymaster.model';
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
import { citymaster } from './../../../model/citymaster.model';
import { citymasterComponent } from './../../../pages/forms/citymaster/citymaster.component';
import { citymasterService } from './../../../service/citymaster.service';
import { geoaccess } from './../../../model/geoaccess.model';
import { geoaccessComponent } from './../../../pages/forms/geoaccess/geoaccess.component';
import { geoaccessService } from './../../../service/geoaccess.service';
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
    selector: 'app-geographymaster',
    templateUrl: './geographymaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class geographymasterComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: geographymaster;
    list: geographymaster[];
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

    bfilterPopulate_geographymasters: boolean = false;
    bfilterPopulate_citymasters: boolean = false;
    bfilterPopulate_geoaccesses: boolean = false;
    geographymaster_menuactions: any = []
    citymaster_menuactions: any = []
    citymaster_visible: boolean = true;
    citymaster_disabled: boolean = false;
    @ViewChild('tbl_citymasters', { static: false }) tbl_citymasters!: ReportViewerCtrlComponent;
    geoaccess_menuactions: any = []
    geoaccess_visible: boolean = true;
    geoaccess_disabled: boolean = false;
    @ViewChild('tbl_geoaccesses', { static: false }) tbl_geoaccesses!: ReportViewerCtrlComponent;

    geographymaster_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    citymasters_visiblelist: any;
    citymasters_hidelist: any;
    geoaccesses_visiblelist: any;
    geoaccesses_hidelist: any;

    Deleted_citymaster_IDs: string = "";
    citymasters_ID: string = "1";
    citymasters_selectedindex: any;
    Deleted_geoaccess_IDs: string = "";
    geoaccesses_ID: string = "2";
    geoaccesses_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private geographymaster_service: geographymasterService,
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
            this.geographymaster_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                geoid: [null],
                geoname: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                geocode: [null, Validators.compose([Validators.required, Validators.maxLength(2)])],
                chargepercent: [null],
                vat: [null],
                useraccess: [null, Validators.compose([Validators.maxLength(100)])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.geographymaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.geographymaster_Form.dirty && this.geographymaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    geonameexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.geoname?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].geoid?.toString() != this.formid?.toString()) {
                if (confirm("This Geo Name value exists in the database.Do you want to display the record ? ")) {
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
    geocodeexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.geocode?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].geoid?.toString() != this.formid?.toString()) {
                if (confirm("This Geo Code value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e: any) { return e.geoid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.geoid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.geoid && pkDetail) {
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
            let geographymasterid = null;

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
            this.formData = new geographymaster();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = geographymasterid;
            //alert(geographymasterid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.geographymaster_service.getDefaultData().then(res => {
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.geographymaster_service.get_geographymasters_List().then(res => {
                this.pkList = res as geographymaster[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'geographymastersList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.geographymaster_Form.markAsUntouched();
            this.geographymaster_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }



    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.geographymaster_Form != null)
            this.geographymaster_Form.reset();
        this.geographymaster_Form.patchValue({
        });
        this.tbl_citymasters?.reset();
        this.tbl_geoaccesses?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let geoid = this.geographymaster_Form.get('geoid').value;
        if (geoid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.geographymaster_service.delete_geographymaster(geoid);
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
        this.geographymaster_Form.patchValue({
            geoid: null
        });
        if (this.formData.geoid != null) this.formData.geoid = null;
        this.tbl_citymasters.data = [];
        this.tbl_geoaccesses.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.geographymaster_Form.patchValue({
            geoid: null
        });
        if (this.formData.geoid != null) this.formData.geoid = null;
        for (let i = 0; i < this.tbl_citymasters.data.length; i++) {
            this.tbl_citymasters.data[i].cityid = null;
        }
        for (let i = 0; i < this.tbl_geoaccesses.data.length; i++) {
            this.tbl_geoaccesses.data[i].geoaccessid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'geoid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.geographymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.geographymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.geographymaster_Form.controls[key] != undefined) {
                                this.geographymaster_Form.controls[key].disable({ onlySelf: true });
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

    edit_geographymasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_citymasters.fkname = "geoid";
            this.tbl_citymasters.fk = this.formid;
            this.tbl_citymasters.paramsChange('citym');
            this.tbl_geoaccesses.fkname = "geoid";
            this.tbl_geoaccesses.fk = this.formid;
            this.tbl_geoaccesses.paramsChange('geoa');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.geographymaster_service.get_geographymasters_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.geographymaster;
                let formproperty = res.geographymaster.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.geographymaster.pkcol;
                this.formid = res.geographymaster.geoid;
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
            this.formData = res.geographymaster;
            this.formid = res.geographymaster.geoid;
            this.pkcol = res.geographymaster.pkcol;
            this.bmyrecord = false;
            if ((res.geographymaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.geographymaster_Form.patchValue({
                pkcol: res.geographymaster.pkcol,
                geoid: res.geographymaster.geoid,
                geoname: res.geographymaster.geoname,
                geocode: res.geographymaster.geocode,
                chargepercent: res.geographymaster.chargepercent,
                vat: res.geographymaster.vat,
                useraccess: res.geographymaster.useraccess,
                status: res.geographymaster.status,
                statusdesc: res.geographymaster.statusdesc,
            });
            this.geographymaster_menuactions = res.geographymaster_menuactions;
            this.citymaster_menuactions = res.citymaster_menuactions;
            this.citymasters_visiblelist = res.citymasters_visiblelist;
            this.geoaccess_menuactions = res.geoaccess_menuactions;
            this.geoaccesses_visiblelist = res.geoaccesses_visiblelist;
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

        for (let key in this.geographymaster_Form.controls) {
            let val = this.geographymaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.geographymaster_Form.controls[key] != null) {
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
        formData = this.geographymaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.geographymaster_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.geoid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.geographymaster_Form.valid) {
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
            Object.keys(this.geographymaster_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.geographymaster_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.geographymaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.geographymaster_service.save_geographymasters(this.formData, this.Deleted_citymaster_IDs, this.Deleted_geoaccess_IDs, this.tbl_citymasters?.data, this.tbl_geoaccesses?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).geographymaster);
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
                    this.objvalues.push((res as any).geographymaster);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.geographymaster_Form.markAsUntouched();
            this.geographymaster_Form.markAsPristine();
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

    AddOrEdit_citymaster(event: any, cityid: any, geoid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, cityid: event?.data?.pk, geoid, visiblelist: this.citymasters_visiblelist, hidelist: this.citymasters_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(citymasterComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_citymasters.add(res[i]);
                    }
                }
                else {
                    this.tbl_citymasters.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_citymaster(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_citymaster_IDs += childID + ",";
        this.tbl_citymasters.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_geoaccess(event: any, geoaccessid: any, geoid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geoaccessid: event?.data?.pk, geoid, visiblelist: this.geoaccesses_visiblelist, hidelist: this.geoaccesses_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(geoaccessComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_geoaccesses.add(res[i]);
                    }
                }
                else {
                    this.tbl_geoaccesses.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_geoaccess(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_geoaccess_IDs += childID + ",";
        this.tbl_geoaccesses.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes citymasters
    citymasters_settings: any;

    show_citymasters_Checkbox() {
        //debugger;
    }
    delete_citymasters_All() {
        //this.tbl_citymasters.source.settings['selectMode'] = 'single';
    }
    show_citymasters_InActive() {
    }
    enable_citymasters_InActive() {
    }
    async citymasters_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_citymasters(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_citymaster(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_citymaster_IDs += event.data.pk + ",";

        }
    }
    async onCustom_citymasters_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "citymasters");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_citymasters_GridSelected(event: any) {
        //this.citymasters_selectedindex=this.tbl_citymasters.source.data.findIndex(i => i.cityid === event.data.cityid);
    }
    Is_citymasters_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.citymasters_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_citymasters_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.citymasters_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes citymasters
    //start of Grid Codes geoaccesses
    geoaccesses_settings: any;

    show_geoaccesses_Checkbox() {
        //debugger;
    }
    delete_geoaccesses_All() {
        //this.tbl_geoaccesses.source.settings['selectMode'] = 'single';
    }
    show_geoaccesses_InActive() {
    }
    enable_geoaccesses_InActive() {
    }
    async geoaccesses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_geoaccesses(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_geoaccess(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_geoaccess_IDs += event.data.pk + ",";

        }
    }
    async onCustom_geoaccesses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "geoaccesses");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_geoaccesses_GridSelected(event: any) {
        //this.geoaccesses_selectedindex=this.tbl_geoaccesses.source.data.findIndex(i => i.geoaccessid === event.data.geoaccessid);
    }
    Is_geoaccesses_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.geoaccesses_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_geoaccesses_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.geoaccesses_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes geoaccesses

}



