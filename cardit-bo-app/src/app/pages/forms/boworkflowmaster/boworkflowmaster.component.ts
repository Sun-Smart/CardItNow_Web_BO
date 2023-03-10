import { boworkflowmasterService } from './../../../service/boworkflowmaster.service';
import { boworkflowmaster } from './../../../model/boworkflowmaster.model';
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
import { boworkflow } from './../../../model/boworkflow.model';
import { boworkflowComponent } from './../../../pages/forms/boworkflow/boworkflow.component';
import { boworkflowService } from './../../../service/boworkflow.service';
import { boworkflowstep } from './../../../model/boworkflowstep.model';
import { boworkflowstepComponent } from './../../../pages/forms/boworkflowstep/boworkflowstep.component';
import { boworkflowstepService } from './../../../service/boworkflowstep.service';
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
    selector: 'app-boworkflowmaster',
    templateUrl: './boworkflowmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowmasterComponent implements OnInit {
    blockedDocument: boolean = false;
    formData: boworkflowmaster;
    list: boworkflowmaster[];
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
    bfilterPopulate_boworkflowmasters: boolean = false;
    bfilterPopulate_boworkflows: boolean = false;
    bfilterPopulate_boworkflowsteps: boolean = false;
    boworkflowmaster_menuactions: any = []
    boworkflow_menuactions: any = []
    boworkflow_visible: boolean = true;
    boworkflow_disabled: boolean = false;
    @ViewChild('tbl_boworkflows', { static: false }) tbl_boworkflows!: ReportViewerCtrlComponent;
    boworkflowstep_menuactions: any = []
    boworkflowstep_visible: boolean = true;
    boworkflowstep_disabled: boolean = false;
    @ViewChild('tbl_boworkflowsteps', { static: false }) tbl_boworkflowsteps!: ReportViewerCtrlComponent;

    boworkflowmaster_Form: FormGroup;

    menucode_List: DropDownValues[];
    menucode_Suggestions: any[];
    menucode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    tablecode_List: DropDownValues[];
    tablecode_Suggestions: any[];
    tablecode_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;



    boworkflows_visiblelist: any;
    boworkflows_hidelist: any;
    boworkflowsteps_visiblelist: any;
    boworkflowsteps_hidelist: any;

    Deleted_boworkflow_IDs: string = "";
    boworkflows_ID: string = "1";
    boworkflows_selectedindex: any;
    Deleted_boworkflowstep_IDs: string = "";
    boworkflowsteps_ID: string = "2";
    boworkflowsteps_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflowmaster_service: boworkflowmasterService,
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
            this.boworkflowmaster_Form = this.fb.group({
                pkcol: [null],
                pk: [null],
                workflowmasterid: [null],
                menuid: [null, Validators.compose([Validators.required,])],
                pause: [null],
                description: [null, Validators.compose([Validators.maxLength(100)])],
                menucode: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
                menucodedesc: [null],
                tablecode: [null, Validators.compose([Validators.required, Validators.maxLength(40)])],
                tablecodedesc: [null],
                workflowhtml: [null, Validators.compose([Validators.required,])],
                status: [null],
                statusdesc: [null],
            });
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    get f() { return this.boworkflowmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.boworkflowmaster_Form.dirty && this.boworkflowmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid?.toString(); }).indexOf(this.formid?.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowmasterid?.toString(); }).indexOf(this.formid?.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowmasterid && pkDetail) {
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
            let boworkflowmasterid = null;

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
            this.formData = new boworkflowmaster();
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = boworkflowmasterid;
            //alert(boworkflowmasterid);

            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boworkflowmaster_service.getDefaultData().then(res => {
                debugger;
                this.menucode_List = res.list_menucode.value;
                this.menucode_Suggestions = this.menucode_List;
                if (this.formData?.menucode != undefined && this.formData?.menucode != null) {
                    this.boworkflowmaster_Form.patchValue({
                        menucode: this.sharedService.getValue("menucode", this.menucode_List, this.formData.menucode?.toString(), 'menucode')
                    });
                }
                this.tablecode_List = res.list_tablecode.value;
                this.tablecode_Suggestions = this.tablecode_List;
                if (this.formData?.tablecode != undefined && this.formData?.tablecode != null) {
                    this.boworkflowmaster_Form.patchValue({
                        tablecode: this.sharedService.getValue("tablecode", this.tablecode_List, this.formData.tablecode?.toString(), 'tablecode')
                    });
                }
            }).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'autocomplete ' + err);
            });

            //autocomplete
            this.boworkflowmaster_service.get_boworkflowmasters_List().then(res => {
                this.pkList = res as boworkflowmaster[];
                this.pkoptionsEvent.emit(this.pkList);
            }
            ).catch((err) => {
                this.blockedDocument = false;
                if (this.sharedService.IsDebug) console.log(err);
                this.toastr.addSingle("error", "", 'boworkflowmastersList ' + err);
            });
            //setting the flag that the screen is not touched 
            this.blockedDocument = false;
            this.boworkflowmaster_Form.markAsUntouched();
            this.boworkflowmaster_Form.markAsPristine();
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }
    onEntered_menucode(value: any) {
        this.menucode_Suggestions = this.menucode_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_menucode(menucodeDetail: any) {
        if (menucodeDetail.value && menucodeDetail) {

        }
    }

    onEntered_tablecode(value: any) {
        this.tablecode_Suggestions = this.tablecode_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
    }
    onSelected_tablecode(tablecodeDetail: any) {
        if (tablecodeDetail.value && tablecodeDetail) {

        }
    }




    resetForm() {
        this.formid = "";
        this.showview = false;
        if (this.boworkflowmaster_Form != null)
            this.boworkflowmaster_Form.reset();
        this.boworkflowmaster_Form.patchValue({
        });
        this.tbl_boworkflows?.reset();
        this.tbl_boworkflowsteps?.reset();
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    async onDelete(): Promise<any> {
        let workflowmasterid = this.boworkflowmaster_Form.get('workflowmasterid').value;
        if (workflowmasterid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                let res = await this.boworkflowmaster_service.delete_boworkflowmaster(workflowmasterid);
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
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: null
        });
        if (this.formData.workflowmasterid != null) this.formData.workflowmasterid = null;
        this.tbl_boworkflows.data = [];
        this.tbl_boworkflowsteps.data = [];
    }
    onCopyDetails() {
        this.formid = null;
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: null
        });
        if (this.formData.workflowmasterid != null) this.formData.workflowmasterid = null;
        for (let i = 0; i < this.tbl_boworkflows.data.length; i++) {
            this.tbl_boworkflows.data[i].workflowid = null;
        }
        for (let i = 0; i < this.tbl_boworkflowsteps.data.length; i++) {
            this.tbl_boworkflowsteps.data[i].workflowstepid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'workflowmasterid' && key != 'attachment' && key != 'customfield') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (ctrltype == "string") {
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowmaster_Form.controls[key] != undefined) {
                                this.boworkflowmaster_Form.controls[key].disable({ onlySelf: true });
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
    menucode_onChange(evt: any) {
        let e = this.f.menucode.value as any;
    }
    tablecode_onChange(evt: any) {
        let e = this.f.tablecode.value as any;
    }

    edit_boworkflowmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    InitializeGrid() {
        try {
            this.tbl_boworkflows.fkname = "workflowmasterid";
            this.tbl_boworkflows.fk = this.formid;
            this.tbl_boworkflows.paramsChange('WKFL');
            this.tbl_boworkflowsteps.fkname = "workflowmasterid";
            this.tbl_boworkflowsteps.fk = this.formid;
            this.tbl_boworkflowsteps.paramsChange('996');
        } catch (e) {
            this.blockedDocument = false;
            this.sharedService.error(e);
        }
    }

    async PopulateScreen(pkcol: any): Promise<any> {
        try {
            this.blockedDocument = true;
            this.boworkflowmaster_service.get_boworkflowmasters_ByEID(pkcol).then(res => {
                this.blockedDocument = false;

                this.formData = res.boworkflowmaster;
                let formproperty = res.boworkflowmaster.formproperty;
                if (formproperty && formproperty.edit == false) this.showview = true;
                this.pkcol = res.boworkflowmaster.pkcol;
                this.formid = res.boworkflowmaster.workflowmasterid;
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
        debugger;
        try {
            this.formData = res.boworkflowmaster;
            this.formid = res.boworkflowmaster.workflowmasterid;
            this.pkcol = res.boworkflowmaster.pkcol;
            this.bmyrecord = false;
            if ((res.boworkflowmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.boworkflowmaster_Form.patchValue({
                pkcol: res.boworkflowmaster.pkcol,
                workflowmasterid: res.boworkflowmaster.workflowmasterid,
                menuid: res.boworkflowmaster.menuid,
                pause: res.boworkflowmaster.pause,
                description: res.boworkflowmaster.description,
                menucode: this.sharedService.getValue("menucode", this.menucode_List, res.boworkflowmaster.menucode, 'menucode'),
                menucodedesc: res.boworkflowmaster.menucodedesc,
                tablecode: this.sharedService.getValue("tablecode", this.tablecode_List, res.boworkflowmaster.tablecode, 'tablecode'),
                tablecodedesc: res.boworkflowmaster.tablecodedesc,
                workflowhtml: res.boworkflowmaster.workflowhtml,
                status: res.boworkflowmaster.status,
                statusdesc: res.boworkflowmaster.statusdesc,
            });
            this.boworkflowmaster_menuactions = res.boworkflowmaster_menuactions;
            this.boworkflow_menuactions = res.boworkflow_menuactions;
            this.boworkflows_visiblelist = res.boworkflows_visiblelist;
            this.boworkflowstep_menuactions = res.boworkflowstep_menuactions;
            this.boworkflowsteps_visiblelist = res.boworkflowsteps_visiblelist;
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

        for (let key in this.boworkflowmaster_Form.controls) {
            let val = this.boworkflowmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boworkflowmaster_Form.controls[key] != null) {
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
        formData = this.boworkflowmaster_Form.getRawValue();
        formData.menucode = (this.boworkflowmaster_Form.get('menucode'))?.value?.menucode;
        formData.tablecode = (this.boworkflowmaster_Form.get('tablecode'))?.value?.tablecode;
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
                    if (this.boworkflowmaster_Form.controls[key] != null) {
                        formData[key] = this.dynamicconfig.data[key];
                    }
                }
            }
        }
        formData.workflowmasterid = this.formid;
        return formData;
    }
    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boworkflowmaster_Form.valid) {
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
            Object.keys(this.boworkflowmaster_Form.controls).forEach(key => {
                const controlErrors: ValidationErrors = this.boworkflowmaster_Form.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
                    });
                }
            });
            if (strError != "") return this.sharedService.alert(strError);


            if (!this.boworkflowmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.GetFormValues();
            console.log(this.formData);
            this.blockedDocument = true;
            let res = await this.boworkflowmaster_service.save_boworkflowmasters(this.formData, this.Deleted_boworkflow_IDs, this.Deleted_boworkflowstep_IDs, this.tbl_boworkflows?.data, this.tbl_boworkflowsteps?.data);
            this.blockedDocument = false;
            //debugger;
            this.toastr.addSingle("success", "", "Successfully saved");
            this.objvalues.push((res as any).boworkflowmaster);
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
                    this.objvalues.push((res as any).boworkflowmaster);
                    this.dialogRef.close(this.objvalues);
                }
                else {
                    this.FillData(res);
                }
            }
            this.blockedDocument = false;
            this.boworkflowmaster_Form.markAsUntouched();
            this.boworkflowmaster_Form.markAsPristine();
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

    AddOrEdit_boworkflow(event: any, workflowid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowid: event?.data?.pk, workflowmasterid, visiblelist: this.boworkflows_visiblelist, hidelist: this.boworkflows_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(boworkflowComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflows.add(res[i]);
                    }
                }
                else {
                    this.tbl_boworkflows.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boworkflow(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boworkflow_IDs += childID + ",";
        this.tbl_boworkflows.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boworkflowstep(event: any, workflowstepid: any, workflowmasterid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowstepid: event?.data?.pk, workflowmasterid, visiblelist: this.boworkflowsteps_visiblelist, hidelist: this.boworkflowsteps_hidelist, ScreenType: 2 };
        for (let d = 0; d < this.keylist.length; d++) {
            let prop = this.keylist[d];
            let val = this.f[prop].value;
            if (val?.value != undefined) val = val.value;
            data[prop] = val;
        }
        this.dialog.open(boworkflowstepComponent,
            {
                data: data,
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflowsteps.add(res[i]);
                    }
                }
                else {
                    this.tbl_boworkflowsteps.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boworkflowstep(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boworkflowstep_IDs += childID + ",";
        this.tbl_boworkflowsteps.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes boworkflows
    boworkflows_settings: any;

    show_boworkflows_Checkbox() {
        //debugger;
    }
    delete_boworkflows_All() {
        //this.tbl_boworkflows.source.settings['selectMode'] = 'single';
    }
    show_boworkflows_InActive() {
    }
    enable_boworkflows_InActive() {
    }
    async boworkflows_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_boworkflows(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_boworkflow(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_boworkflow_IDs += event.data.pk + ",";

        }
    }
    async onCustom_boworkflows_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boworkflows");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_boworkflows_GridSelected(event: any) {
        //this.boworkflows_selectedindex=this.tbl_boworkflows.source.data.findIndex(i => i.workflowid === event.data.workflowid);
    }
    Is_boworkflows_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_boworkflows_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes boworkflows
    //start of Grid Codes boworkflowsteps
    boworkflowsteps_settings: any;

    show_boworkflowsteps_Checkbox() {
        //debugger;
    }
    delete_boworkflowsteps_All() {
        //this.tbl_boworkflowsteps.source.settings['selectMode'] = 'single';
    }
    show_boworkflowsteps_InActive() {
    }
    enable_boworkflowsteps_InActive() {
    }
    async boworkflowsteps_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    onExecute_boworkflowsteps(event: any) {
        //debugger;
        if (event.action.description == "Edit")
            this.AddOrEdit_boworkflowstep(event, event.data.pk, this.formid);
        else if (event.action.description == "Delete") {
            this.Deleted_boworkflowstep_IDs += event.data.pk + ",";

        }
    }
    async onCustom_boworkflowsteps_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boworkflowsteps");
        let formname = (objbomenuaction as any).actionname;




    }

    handle_boworkflowsteps_GridSelected(event: any) {
        //this.boworkflowsteps_selectedindex=this.tbl_boworkflowsteps.source.data.findIndex(i => i.workflowstepid === event.data.workflowstepid);
    }
    Is_boworkflowsteps_Visible() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0)) {
            return "tbl smart-table-container1";
        }
        else {
            return "hide";
        }
    }
    Is_boworkflowsteps_Disabled() {
        if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0)) {
            return false;
        }
        else {
            return true;
        }
    }
    //end of Grid Codes boworkflowsteps

}



