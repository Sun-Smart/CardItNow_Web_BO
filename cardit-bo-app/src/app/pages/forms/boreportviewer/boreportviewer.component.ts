import { Component, OnDestroy, Input, AfterViewInit, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../service/shared.service';
import { ReportViewerCtrlComponent } from './reportviewerctrl.component';
import { BOReportViewerService } from '../../../service/boreportviewer.service';
import { boreport } from '../../../model/boreport.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { boreportService } from '../../../service/boreport.service';

@Component({
  selector: 'app-boreportviewer',
  template: `
  <ngx-dashboardviewer *ngIf="dashboardid>0" [customdashboardid]="dashboardid"></ngx-dashboardviewer>
<ngx-reportviewer #tbl_report *ngIf="reportcode!=''" class="form-group row" ></ngx-reportviewer>
  `
})
export class BOReportViewerComponent implements AfterViewInit {
  // [reportparameterid]="reportcode" [ParamsChange]="ParamsChangeEvent" 
  reportid: any;
  reportcode: any;
  dashboardid: any;
  dialogdata: any;
  loadingspinner:boolean=false;
  //ParamsChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tbl_report', { static: false }) tbl_report!: ReportViewerCtrlComponent;
  menuid: any;
  constructor(private currentRoute: ActivatedRoute, public sharedService: SharedService,
    public dynamicconfig: DynamicDialogConfig,
    private boreportviewerservice: BOReportViewerService, private boreportservice: boreportService) {
    //debugger;
    this.dialogdata = this.dynamicconfig;
  }
  ngAfterViewInit() {
    //debugger;
    //this.reportid =0;

    if (this.currentRoute.snapshot.paramMap.get('id') && this.currentRoute.snapshot.paramMap.get('id')) this.reportcode = this.currentRoute.snapshot.paramMap.get('id');
    //this.boreportviewerservice.getBOReportResultsByID(parseInt(this.reportid), null, null, null, null, null, null).then((res:any) => {
    this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
      //////debugger;
      if (res.dashboardid && res.dashboardid != null) this.dashboardid = res.dashboardid;
    });
    this.menuid = this.sharedService.menuid;
  }
  ngOnInit() {
    debugger;
    this.loadingspinner=true;
    this.currentRoute.params.subscribe(params => {

      debugger;
      //this.value=null;
      this.dashboardid = 0;
      this.reportid = 0;
      if (this.dialogdata != null && this.dialogdata.data != null) this.dialogdata = this.dialogdata.data;
      if (params.id) {
        this.reportcode = params.id;
      }
      else if (this.dialogdata.reportcode && this.dialogdata.reportcode != null) this.reportcode = this.dialogdata.reportcode;


      //////debugger;

      //this.boreportviewerservice.getBOReportResultsByID(parseInt(this.reportid), null, null, null, null, null, null).then((res:any) => {
      ////////debugger;
      if (this.reportcode == undefined) this.reportcode = 'poe5x';
      this.boreportservice.getListBy_reportcode(this.reportcode).then((res: any) => {
        this.reportid = res[0].reportid;
        if (res[0].dashboardid && res[0].dashboardid != null) this.dashboardid = res[0].dashboardid;
        //this.ParamsChangeEvent.emit(this.reportcode);

        this.tbl_report.paramsChange(this.reportcode);

      });
      this.menuid = this.sharedService.menuid;
    });
  }
}