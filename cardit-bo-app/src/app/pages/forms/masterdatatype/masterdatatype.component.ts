import { masterdatatypeService } from './../../../service/masterdatatype.service';
import { masterdatatype } from './../../../model/masterdatatype.model';
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
import { masterdata } from './../../../model/masterdata.model';
import { masterdataComponent } from './../../../pages/forms/masterdata/masterdata.component';
import { masterdataService } from './../../../service/masterdata.service';
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
    selector: 'app-masterdatatype',
    templateUrl: './masterdatatype.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class masterdatatypeComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: masterdatatype;
    list: masterdatatype[];
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

    bfilterPopulate_masterdatatypes: boolean = false;
    bfilterPopulate_masterdatas: boolean = false;
    masterdatatype_menuactions: any = []
    masterdata_menuactions: any = []
    masterdata_visible: boolean = true;
    masterdata_disabled: boolean = false;
    @ViewChild('tbl_masterdatas', { static: false }) tbl_masterdatas!: ReportViewerCtrlComponent;

    masterdatatype_Form: FormGroup;


    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    masterdatas_visiblelist: any;
    masterdatas_hidelist: any;

    Deleted_masterdata_IDs: string = "";
    masterdatas_ID: string = "1";
    masterdatas_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private masterdatatype_service: masterdatatypeService,
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
            this.masterdatatype_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                datatypeid: [null],
                masterdatatypename: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                code: [null, Validators.compose([Validators.required, Validators.maxLength(32)])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.masterdatatype_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.masterdatatype_Form.dirty && this.masterdatatype_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields
    masterdatatypenameexists(e: any) {
        try {
            //debugger;
            let pos = this.pkList.map(function (e: any) { return e.masterdatatypename?.toString().toLowerCase(); }).indexOf(e.target.value?.toString().toLowerCase());

            if (pos >= 0 && this.pkList[pos].datatypeid?.toString() != this.formid?.toString()) {
                if (confirm("This Master Data Type Name value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e: any) { return e.datatypeid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.datatypeid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.datatypeid && pkDetail) {
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
            let masterdatatypeid = null;

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
            this.formData = new masterdatatype();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = masterdatatypeid;
            //alert(masterdatatypeid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.masterdatatype_service.getDefaultData().then(res => {
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.masterdatatype_service.get_masterdatatypes_List().then(res => {
                this.pkList = res as masterdatatype[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'masterdatatypesList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.masterdatatype_Form.markAsUntouched();
            this.masterdatatype_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }



    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.masterdatatype_Form != null)
            this.masterdatatype_Form.reset();
        this.masterdatatype_Form.patchValue({
        });
        this.tbl_masterdatas?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let datatypeid = this.masterdatatype_Form.get('datatypeid').value;
        if (datatypeid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.masterdatatype_service.delete_masterdatatype(datatypeid);
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
        this.masterdatatype_Form.patchValue({
            datatypeid: null
        });
        if (this.formData.datatypeid != null) this.formData.datatypeid = null;
        this.tbl_masterdatas.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.masterdatatype_Form.patchValue({
            datatypeid: null
        });
        if (this.formData.datatypeid != null) this.formData.datatypeid = null;
        for (let i = 0; i < this.tbl_masterdatas.data.length; i++) {
            this.tbl_masterdatas.data[i].masterdataid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'datatypeid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.masterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.masterdatatype_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.masterdatatype_Form.controls[key] != undefined) {
                                this.masterdatatype_Form.controls[key].disable({ onlySelf: true });
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

    edit_masterdatatypes() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_masterdatas.fkname = "masterdatatypeid";
            this.tbl_masterdatas.fk = this.formid;
            this.tbl_masterdatas.paramsChange('mdata');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.masterdatatype_service.get_masterdatatypes_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.masterdatatype;
                let formproperty = res.masterdatatype.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.masterdatatype.pkcol;
                this.formid = res.masterdatatype.datatypeid;
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
            this.formData = res.masterdatatype;
            this.formid = res.masterdatatype.datatypeid;
            this.pkcol = res.masterdatatype.pkcol;
            this.bmyrecord = false;
            if ((res.masterdatatype as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.masterdatatype_Form.patchValue({
                pkcol: res.masterdatatype.pkcol,
                datatypeid: res.masterdatatype.datatypeid,
                masterdatatypename: res.masterdatatype.masterdatatypename,
                code: res.masterdatatype.code,
                status: res.masterdatatype.status,
                statusdesc: res.masterdatatype.statusdesc,
            });
            this.masterdatatype_menuactions = res.masterdatatype_menuactions;
            this.masterdata_menuactions = res.masterdata_menuactions;
            this.masterdatas_visiblelist = res.masterdatas_visiblelist;
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

        for (let key in this.masterdatatype_Form.controls) {
            let val = this.masterdatatype_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.masterdatatype_Form.controls[key] != null) {
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
        formData = this.masterdatatype_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.masterdatatype_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.datatypeid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.masterdatatype_Form.valid) {
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
            Object.keys(this.masterdatatype_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.masterdatatype_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.masterdatatype_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.masterdatatype_service.save_masterdatatypes(this.formData, this.Deleted_masterdata_IDs, this.tbl_masterdatas?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).masterdatatype);
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
                    this.objvalues.push((res as any).masterdatatype);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.masterdatatype_Form.markAsUntouched();
            this.masterdatatype_Form.markAsPristine();
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

    AddOrEdit_masterdata(event: any, masterdataid: any, datatypeid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, masterdataid: event?.data?.pk, datatypeid, visiblelist: this.masterdatas_visiblelist, hidelist: this.masterdatas_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(masterdataComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_masterdatas.add(res[i]);
                    }
                }
                else {
                    this.tbl_masterdatas.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_masterdata(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_masterdata_IDs += childID + ",";
        this.tbl_masterdatas.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes masterdatas
    masterdatas_settings: any;

    show_masterdatas_Checkbox() {
        //debugger;
    }
    delete_masterdatas_All() {
        //this.tbl_masterdatas.source.settings['selectMode'] = 'single';
    }
    show_masterdatas_InActive() {
    }
    enable_masterdatas_InActive() {
    }
    async masterdatas_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_masterdatas(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_masterdata(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_masterdata_IDs += event.data.pk + ",";

        }
    }
    async onCustom_masterdatas_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "masterdatas");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_masterdatas_GridSelected(event: any) {
        //this.masterdatas_selectedindex=this.tbl_masterdatas.source.data.findIndex(i => i.masterdataid === event.data.masterdataid);
    }
    Is_masterdatas_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.masterdatas_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_masterdatas_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.masterdatas_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes masterdatas

}



