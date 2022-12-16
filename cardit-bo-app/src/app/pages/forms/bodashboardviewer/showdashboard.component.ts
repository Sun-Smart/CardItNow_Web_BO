import { Component, OnDestroy, Input, AfterViewInit, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-showdashboard',
  template: `
<ngx-dashboardviewer  [customdashboardid]="dashboardid"></ngx-dashboardviewer>
  `
})
export class showdashboardComponent implements AfterViewInit {
  dashboardid: any;
  constructor(private currentRoute: ActivatedRoute) {

  }
  ngAfterViewInit() {
    //debugger;
    this.dashboardid = 0;
    this.dashboardid = parseInt(this.currentRoute.snapshot.paramMap.get('id'));
  }

}