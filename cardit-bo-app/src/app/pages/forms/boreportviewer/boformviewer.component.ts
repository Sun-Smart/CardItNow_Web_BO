import { BOReportViewerService } from '../../../service/boreportviewer.service';
import { boreport } from '../../../model/boreport.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { SharedService } from '../../../service/shared.service';
@Component({
  selector: 'app-boformviewer',
  templateUrl: './boformviewer.component.html',
  styles: []
})



export class boformviewerComponent implements OnInit {
  isSubmitted: boolean = false;
  data: any;
  formid: any;
  configdata: any;
  results: any;
  viewhtml: any;
  pk: any
  constructor(
    private router: Router,
    private boreportviewerservice: BOReportViewerService,
    private toastr: ToastService, public sharedService: SharedService,
    //private dialog: NbDialogService,
    private currentRoute: ActivatedRoute) {

  }


  ngOnInit() {
    //debugger;
    let boformviewer = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.reportid != null) {
      boformviewer = this.data.reportid;
    }
    else
      boformviewer = this.currentRoute.snapshot.paramMap.get('id');
    this.pk = this.currentRoute.snapshot.paramMap.get('pk');
    this.formid = boformviewer;
    this.sharedService.alert('4');
    this.boreportviewerservice.fkname = null;
    this.boreportviewerservice.fk = null;
    this.boreportviewerservice.fkname1 = null;
    this.boreportviewerservice.fk1 = null;
    this.boreportviewerservice.getBOReportResultsByID(boformviewer, status, null, null, this.pk).then((res: any) => {
      console.log(res);
      this.configdata = res.boreport;
      this.results = res.results;
      let rowData = this.results[0];
      console.log(rowData);
      console.log(this.configdata.viewhtml);
      this.viewhtml = this.configdata.viewhtml;
      console.log(this.viewhtml);

      let cols = res.boreportcolumn;
      //////debugger;
      cols.forEach((col: any) => {
        if (this.viewhtml != null && this.viewhtml != undefined) this.viewhtml = this.viewhtml.replace(new RegExp('##' + col.field + '##', 'g'), rowData[col.field]);
      });


      console.log(this.viewhtml);

    });

  }

  route(action, recordid = null) {
    //debugger;

    let formname = "";
    recordid = this.pk;
    this.sharedService.alert(recordid);
    if (action == "edit" && (recordid == null || recordid == "")) {
      this.sharedService.alert("Select a record to edit");
      return;
    }
    if (this.configdata.maintablename == "boreports") {
      formname = "boreports";

    }
    else {
      formname = (this.configdata.component as string);
      if (formname == null || formname == "") {
        formname = (this.configdata.maintablename as string).toLowerCase();

      }


    }


    let child = false;
    //if(this.menumasterdata!=null && this.menumasterdata!=undefined)child=this.menumasterdata.childparent;


    switch (action) {

      case 'create':
        this.router.navigate(['/home/' + formname + '/' + formname]);
        break;
      case 'view':
        this.router.navigate(['/home/boreportviewer/boreportviewer/view/' + this.configdata.reportid + '/' + recordid]);
        break;
      case 'edit':
        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);

        break;
    }

  }
  //end of Grid Codes boformviewer

}



