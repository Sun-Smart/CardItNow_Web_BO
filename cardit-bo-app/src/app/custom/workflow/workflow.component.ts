import { boworkflowService } from './../../service/boworkflow.service';
import { boworkflow } from './../../model/boworkflow.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, Input, forwardRef, EventEmitter } from '@angular/core';
import { ToastService } from '../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from './../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../shared/general.validator';
//import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../custom/smart-table-datepicker.component';
//import { LocalDataSource } from 'ng2-smart-table';
import { BOReportViewerService } from './../../service/boreportviewer.service';
import { bousermaster } from './../../model/bousermaster.model';
import { bousermasterService } from './../../service/bousermaster.service';
import { bouserrolemaster } from './../../model/bouserrolemaster.model';
import { bouserrolemasterService } from './../../service/bouserrolemaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from '../../service/shared.service';
import { AppConstants } from '../../shared/helper';
import { customfieldconfigurationService } from './../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../pages/forms/dynamic-form-builder/dynamic-form-builder.component';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentComponent } from '../attachment/attachment.component';
@Component({
    selector: 'app-workflow',
    templateUrl: './workflow.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => workflowComponent),
            multi: true
        }
    ]
})



export class workflowComponent implements ControlValueAccessor {
    @Input('modulename') modulename;

    @Input('value') _value;

    editfield :any;
    onChange: any = () => { };
    onTouched: any = () => { };

    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    formdata: any;//current form data
    saveworkflow = false;
    bstartworkflow: boolean = false;

    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    menucode: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulateboworkflows: boolean = false;
    modulepkcol: any;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    pk_tblForm: FormGroup;//pk - autocomplete
    pk_tbloptions: any;//pk - autocomplete
    pk_tblformatter: any;//pk - autocomplete

    databoworkflowscurrentapproved3: any = [];
    databoworkflowsperformancestatus3: any = [];
    databoworkflowsworkflowstatus3: any = [];
    boworkflowForm: FormGroup;
    currentapprovedList: bousermaster[];//dropdown
    currentapprovedoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    currentapproved_bousermastersForm: FormGroup;//autocomplete
    currentapproved_bousermastersoptions: any;//autocomplete
    currentapproved_bousermastersformatter: any;//autocomplete
    performancestatusList: boconfigvalue[] = [];//dropdown
    workflowstatusList: boconfigvalue[] = [];//dropdown
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    pkcol: any;
    customfieldjson: any;
    customfieldvisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentfieldjson: any[] = [];
    attachmentvisible: boolean = true;
    SESSIONUSERID: any;//current user
    sessiondata: any;

    get value() {
        return this._value;
    }
    /*
        set value(val) {
            //debugger;
            this._value = val;
            this.onChange(val);
            this.onTouched();
    
    
        }
    */

    registerOnChange(fn) {
        this.onChange = fn;
    }

    writeValue(value) {
        console.log(value);
        if (value) {
            this._value = value;
        }
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    constructor(
        private router: Router,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private boworkflowservice: boworkflowService,
        private fb: FormBuilder,
        public sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private boreportviewerservice: BOReportViewerService,
        private configservice: boconfigvalueService,
        private bousermasterservice: bousermasterService,
        private bouserrolemasterservice: bouserrolemasterService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute) {



        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        //if(this.router.url.startsWith("/workflow/"))
        console.log('this.data ' + this.data);
        if (this.data.workflowid != null) {
            this.saveworkflow = true;
        }
        this.pmenuid = sharedService.menuid;
        this.menucode = sharedService.menucode;

        this.pcurrenturl = sharedService.currenturl;
        this.boworkflowForm = this.fb.group({
            pk: [null], ImageName: [null],
            workflowid: [null],
            workflowmasterid: [null],
            currentstepno: [null],
            modulename: [null],
            pkvalue: [null],
            currentapproved: [null],
            currentapproveddesc: [null],
            currentapprovers: [null],
            nextapprovers: [null],
            assigneddatetime: [null],
            closeddatetime: [null],
            standardrating: [null],
            performancerating: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            exception: [null],
            approvedusers: [null],
            approvedcondition: [null],
            tathours: [null],
            totalactualtime: [null],
            processid: [null],
            workflowdetails: [null],
            comments: [null],
            history: [null],
            customfield: [null],
            attachment: [null],
            workflowstatus: [null],
            workflowstatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boworkflowForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop: any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        ////debugger;
        if (this.boworkflowForm.dirty || this.boworkflowForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    async ngOnInit() {
        //debugger;
        /*
        let pboworkflow = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.workflowid != null) {
            pboworkflow = this.data.workflowid;
        }
        else {
            let pk = this.currentRoute.snapshot.paramMap.get('id');
            let res;
            res = await this.boworkflowservice.getListBypk(parseInt(pk), this.modulename);
            //To Change
            pboworkflow = res[0].workflowid;

        }
        */

        let res;
        let pk;
        let pboworkflow = null;
        this.modulepkcol = this._value;
        //debugger;
        if (this._value != undefined && this._value != null && this._value != 0) {
            pk = this._value;
            res = await this.boworkflowservice.getListBy_pkvalue(pk, this.sharedService.menucode);//getListBypk
            if (res.length > 0) {
                pboworkflow = res[0].workflowid;
                this.pkcol = res[0].pkcol;
            }
        }
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = pboworkflow;
        //this.sharedService.alert(boworkflow);
        if (pboworkflow == null) {
            this.bstartworkflow = true;
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.saveworkflow = true;
            await this.PopulateScreen(this.pkcol);
        }

        this.bousermasterservice.get_bousermasters_List().then((res: any) => {
            this.currentapprovedList = res as bousermaster[];
            if (this.formdata && this.formdata.boworkflow && this.formdata.boworkflow.currentapproved) {
                this.currentapprovedoptionsEvent.emit(this.currentapprovedList);
                this.boworkflowForm.patchValue({
                    currentapproved: this.formdata.boworkflow.currentapproved,
                    currentapproveddesc: this.formdata.boworkflow.currentapproveddesc,
                });
            }
        }
        );
        this.currentapproved_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.currentapprovedList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.currentapproved_bousermastersformatter = (result: any) => result.username;
        this.configservice.getList("performancestatus").then((res: any) => this.performancestatusList = res as boconfigvalue[]);
        this.configservice.getList("workflowstatus").then((res: any) => this.workflowstatusList = res as boconfigvalue[]);

        //autocomplete
        this.boworkflowservice.get_boworkflows_List().then((res: any) => {
            this.pkList = res as boworkflow[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        );
        this.pk_tbloptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.pk_tblformatter = (result: any) => result.pkcol;
        this.boworkflowForm.markAsUntouched();
        this.boworkflowForm.markAsPristine();
        //debugger;
    }



    onSelectedcurrentapproved(currentapprovedDetail: any) {
        if (currentapprovedDetail.currentapproved && currentapprovedDetail) {
            this.boworkflowForm.patchValue({
                currentapproved: currentapprovedDetail.currentapproved,
                currentapproveddesc: currentapprovedDetail.username,

            });

        }
    }

    async PopulateScreen(pkcol: any) {
        this.boworkflowservice.get_boworkflows_ByEID(pkcol).then((res: any) => {

            this.formdata = res;
            let formproperty = res.formproperty;
            //if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.pkcol;
            this.formid = res.boworkflow.workflowid;
            this.FillData(res);
        });
    }

    FillData(res: any) {
        this.formid = res.boworkflow.workflowid;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowForm.patchValue({
            workflowid: res.boworkflow.workflowid,
            workflowmasterid: res.boworkflow.workflowmasterid,
            currentstepno: res.boworkflow.currentstepno,
            modulename: res.boworkflow.modulename,
            pkvalue: res.boworkflow.pkvalue,
            currentapproved: res.boworkflow.currentapproved,
            currentapproveddesc: res.boworkflow.currentapproveddesc,
            currentapprovers: this.sharedService.JSON_parse(res.boworkflow.currentapprovers),
            nextapprovers: this.sharedService.JSON_parse(res.boworkflow.nextapprovers),
            assigneddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.assigneddatetime),
            closeddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.closeddatetime),
            standardrating: res.boworkflow.standardrating,
            performancerating: res.boworkflow.performancerating,
            performancestatus: res.boworkflow.performancestatus,
            performancestatusdesc: res.boworkflow.performancestatusdesc,
            exception: res.boworkflow.exception,
            approvedusers: this.sharedService.JSON_parse(res.boworkflow.approvedusers),
            approvedcondition: res.boworkflow.approvedcondition,
            tathours: res.boworkflow.tathours,
            totalactualtime: res.boworkflow.totalactualtime,
            processid: res.boworkflow.processid,
            workflowdetails: res.boworkflow.workflowdetails,
            comments: this.sharedService.JSON_parse(res.boworkflow.comments),
            history: res.boworkflow.history,
            customfield: res.boworkflow.customfield,
            attachment: res.boworkflow.attachment,
            workflowstatus: res.boworkflow.workflowstatus,
            workflowstatusdesc: res.boworkflow.workflowstatusdesc,
            status: res.boworkflow.status,
            statusdesc: res.boworkflow.statusdesc,
        });
        if (this.boworkflowForm.get('customfield').value != null && this.boworkflowForm.get('customfield').value != "") this.customfieldjson = this.sharedService.JSON_parse(this.boworkflowForm.get('customfield').value);
        this.FillCustomField();
        if (this.boworkflowForm.get('attachment').value != null && this.boworkflowForm.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.sharedService.JSON_parse(this.boworkflowForm.get('attachment').value));
        //Child Tables if any
    }

    startworkflow() {
        var objaction = {
            actionicon: "fa fa-check-square-o",
            actionid: "-7002",
            actionname: "spwkStart",
            actiontype: "P",
            description: "Start WorkFlow",
            menuid: this.sharedService.menuid,
            rowselecttype: "M",
            rowselecttypedesc: "Multiple",
            servicename: "",
            modulename: this.sharedService.menucode
        };
        //debugger;

        this.boreportviewerservice.process(this.sharedService.menuid, objaction, this.modulepkcol, this.menucode).then((res: any) => {
            //debugger;
            console.log(res);
            this.sharedService.alert((res as any).resultOutput);

        });
    }
    approve() {
        var objaction = {
            actionicon: "fa fa-check-square-o",
            actionid: "-6002",
            actionname: "spwkApprove",
            actiontype: "P",
            description: "Approve",
            menuid: this.sharedService.menuid,
            rowselecttype: "M",
            rowselecttypedesc: "Multiple",
            servicename: "",
            modulename: this.sharedService.menucode
        };
        //debugger;

        this.boreportviewerservice.process(this.sharedService.menuid, objaction, this.modulepkcol, this.menucode).then((res: any) => {
            //debugger;
            console.log(res);
            this.sharedService.alert((res as any).resultOutput);

        });
    }

    deny() {
        var objaction = {
            actionicon: "fa fa-check-square-o",
            actionid: "-6003",
            actionname: "spwkDeny",
            actiontype: "P",
            description: "Deny",
            menuid: this.sharedService.menuid,
            rowselecttype: "M",
            rowselecttypedesc: "Multiple",
            servicename: "",
            modulename: this.sharedService.menucode
        };
        //debugger;

        this.boreportviewerservice.process(this.sharedService.menuid, objaction, this.modulepkcol, this.menucode).then((res: any) => {
            //debugger;
            console.log(res);
            this.sharedService.alert((res as any).resultOutput);

        });
    }
    // editfield(){}


    resetForm() {
        if (this.boworkflowForm != null)
            this.boworkflowForm.reset();
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = this.sharedService.JSON_parse('{"' + key + '": ' + this.data[key] + ' }');
                if (this.boworkflowForm.controls[key] != null) {
                    this.boworkflowForm.patchValue(json);
                    this.boworkflowForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let workflowid = this.boworkflowForm.get('workflowid').value;
        if (workflowid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowservice.delete_boworkflow(workflowid).then((res: any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflowForm.patchValue({
            workflowid: null
        });
        //ss this.boworkflowservice.formData.workflowid = null;
    }
    async FillCustomField() {
        this.customfieldservicelist = await this.customfieldservice.getcustomfieldconfigurationsByTable("boworkflows", this.CustomFormName, "", "", this.customfieldjson);
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }

    statusonChange(evt: any) {
        let e = evt.value;
        this.boworkflowForm.patchValue({ statusdesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e: any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    onSubmitData(bclear: any) {
        ////debugger;
        this.isSubmitted = true;
        if (!this.boworkflowForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        //ss this.boworkflowservice.formData = this.boworkflowForm.value;
        //ss this.boworkflowservice.formData.customfield = JSON.stringify(customfields);
        //ss this.boworkflowservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        var customfields = this.customfieldservice.getCustomValues(document);
        //ss console.log(this.boworkflowservice.formData);
        if (this.boworkflowForm.get('workflowid').value == null || this.boworkflowForm.get('workflowid').value == '' || this.boworkflowForm.get('workflowid').value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear: any) {
        //ss 
        /*
        this.boworkflowservice.saveOrUpdate_boworkflows().subscribe(
            (res: any) => {
                ////debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.boworkflowservice.clearList();
                    this.resetForm();
                }
                this.boworkflowForm.markAsUntouched();
                this.boworkflowForm.markAsPristine();
            },
            (err: any) => {
                ////debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
        */
    }
    updateRecord(bclear: any) {
        //ss 
        /*
        this.boworkflowservice.saveOrUpdate_boworkflows().subscribe(
            (res: any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.boworkflowservice.clearList();
                    this.resetForm();
                }
                this.boworkflowForm.markAsUntouched();
                this.boworkflowForm.markAsPristine();
            },
            (err: any) => {
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
        */
    }

}



