import { Component, OnDestroy, Input, AfterViewInit, OnInit } from '@angular/core';

//import { ToastrService } from 'ngx-toastr';
import { BODashboardViewerService } from './../../../service/bodashboardviewer.service';
import { bodashboard } from './../../../model/bodashboard.model';
import { Router, ActivatedRoute } from '@angular/router';
import { bodashboarddetail } from './../../../model/bodashboarddetail.model';
import { boconfigvalue } from '../../../model/boconfigvalue.model';
import { boconfigvalueService } from '../../../service/boconfigvalue.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from '../../../service/shared.service';
@Component({
  selector: 'ngx-dashboardviewer',
  templateUrl: './bodashboardviewer.component.html',
})
export class BODashboardViewerComponent implements AfterViewInit {
  blockedDocument: boolean = false;
  @Input() customdashboardid: any;

  DateFilterTypeList: boconfigvalue[] = [];
  results: any[];
  dashboardid: any;
  p1: string;
  p2: string;
  p3: string;
  maindata:any;
  bDashboardShown: boolean = false;

  header: bodashboard;
  details: bodashboarddetail[] = [];
  colorScheme: any;

  BODashboardForm: FormGroup;
  barChartData: any;
  barChartData1: any;

  doughnutChartData: any;
  options: any;

  constructor(public sharedService: SharedService, private fb: FormBuilder, private configservice: boconfigvalueService,
    private bodashboardviewerservice: BODashboardViewerService,
    //private toastr: ToastrService, 
    private currentRoute: ActivatedRoute) {
    //////debugger;

    this.barChartData1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Rejected',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }






    this.BODashboardForm = this.fb.group({
      DateFilterType: [null]
    })
  }


  ngOnInit1() {
  }
  ngAfterViewInit() {
    //debugger;
    this.configservice.getList("DateFilterType").then((res: any) => this.DateFilterTypeList = res as boconfigvalue[]);

    /*
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    */

    this.dashboardid = this.currentRoute.snapshot.paramMap.get('id');
    if (this.dashboardid == null || this.dashboardid == undefined) this.dashboardid = 1;
    this.p1 = '';
    this.p2 = '';
    this.p3 = '';


    //   setTimeout(() => {
    if (this.customdashboardid > 0) {
      this.dashboardid = this.customdashboardid;


    }

    if (this.dashboardid > 0) this.PopulateChart("");


    //}, 1000);
    //this.BODashboardForm.get('DateFilterType').value

  }


  ondateChange(dt) {
    this.PopulateChart(dt);
  }
  showDashboard() {
    if (!this.bDashboardShown) {

      setTimeout(() => {
        if (!this.bDashboardShown && this.header.design != '') {
          //debugger;
          this.bDashboardShown = true;
          document.getElementById("divdashboard").style.display = "none";

          let el = document.getElementById("divdashboardstyle");
          el.innerHTML = this.header.design;

          this.details.forEach((dtlobj: any) => {
            //let strDesign = this.header.design;
            //
            if (document.getElementById("v_" + dtlobj.dashboardname) != undefined && document.getElementById(dtlobj.dashboardname) != undefined) {
              let div = document.getElementById(dtlobj.dashboardname);
              let ddiv = document.getElementById("v_" + dtlobj.dashboardname);

              div.appendChild(ddiv);

            }

          });
          console.log(el.innerHTML);
        }
      }, 1000);
    }
  }
  PopulateChart(dt) {
    //debugger;
    this.bodashboardviewerservice.getBODashboardResultsByID(parseInt(this.dashboardid), dt, this.p1, this.p2, this.p3).then((res: any) => {
      debugger;
      console.log(res);
      this.header = res.bodashboard;
      this.details = res.bodashboarddetail;
      this.results = res.results;
      let i = 0;
      this.details.forEach((dtlobj: any) => {

        let index = this.results.findIndex(x => x.dashboardname === dtlobj.dashboardname);
        // this.results[index].Data=this.sharedService.JSON_parse(this.results[index].Data);
        if (index >= 0) {
          this.results[index].row = dtlobj.row;
          this.results[index].col = dtlobj.col;


          this.results[index].data = this.results[index].data;


          this.options = {
            legend: { display: false }
          }
          if (dtlobj.charttype == "H") {
            this.options = {
              indexAxis: 'y',
              plugins: { legend: { display: false } }
            }


          }
          debugger;
          if (dtlobj.charttype == "P") {

            this.results[index].rowdata = {
              labels: this.results[index].data.labels,//
              datasets: [
                {
                  data: this.results[index].data.data,//
                  backgroundColor: this.results[index].backgroundColor,
                  hoverBackgroundColor: this.results[index].hoverBackgroundColor,
                  borderColor: this.results[index].borderColor,

                }
              ]
            }
          }
          else if (this.results[index].data.length > 0 && this.results[index].data[0].series != undefined) {

            let datasets = [];
            let datalabels = [];
            let serieslength = 0;
            serieslength = this.results[index].data[0].series.length;
            for (let k = 0; k < serieslength; k++) {
              let data = [];
              let arrdata = "";
              let labels;
              let colors;
              for (let j = 0; j < this.results[index].data.length; j++) {
                let arrdata = +this.results[index].data[j].series[k].value;
                data.push(arrdata);
                //if(this.results[index].data.length>0 && j==0)labels.push(this.results[index].data[0].series[k].name);

                if (this.results[index].data.length > 0 && k == 0) datalabels.push(this.results[index].data[j].name);
              }
              labels = this.results[index].data[0].series[k].name;
              colors = this.results[index].backgroundColor[k];
              let arr = {
                label: labels,
                data: data,
                backgroundColor: colors,
                //hoverBackgroundColor: colors,
                borderColor: colors,

              }
              datasets.push(arr);


            }
            /*
            datasets=[
              {
                label: '2018',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: [65, 59, 80, 81]
            },
            {
                label: '2019',
                backgroundColor: '#9CCC65',
                borderColor: '#7CB342',
                data: [28, 48, 40, 19]
            }
            ];
            */
            this.results[index].rowdata = {
              labels: datalabels,//this.results[index].data.labels,
              datasets: datasets
            }
          }
          else if (this.results[index].data.labels == undefined) {
            this.options = {
              legend: { display: false }
            }
            let labels = [];
            let values = [];
            for (let j = 0; j < this.results[index].data.length; j++) {
              labels.push(this.results[index].data[j].name);
              values.push(this.results[index].data[j].value);
            }
            this.results[index].rowdata = {
              labels: labels,
              datasets: [
                {
                  label: dtlobj.title,
                  data: values,
                  backgroundColor: this.results[index].backgroundColor,
                  hoverBackgroundColor: this.results[index].hoverBackgroundColor,
                  borderColor: this.results[index].borderColor,

                }
              ]
            }
          }
          else {

            this.results[index].rowdata = {
              labels: this.results[index].data.labels,
              datasets: [
                {
                  label: dtlobj.title,
                  data: this.results[index].data.data,
                  backgroundColor: this.results[index].backgroundColor,
                  hoverBackgroundColor: this.results[index].hoverBackgroundColor,
                  borderColor: this.results[index].borderColor,

                }
              ]
            }
          }


          i++;
          this.results[index].options = this.options;
        }



        /*  for(let i=0;i<this.results[index].Data.length;i++)
          {
            let name=dtlobj.Name;
            let value=dtlobj.Value;
          this.results[index].Data[i]={name:this.GetValue(this.results[index].Data[i],name),value:this.GetValue(this.results[index].Data[i],value)};
         
          }*/
      });

    });

  }

  GetValue(o, key) {
    return o[key];
  }
  ngOnDestroy(): void {

  }




  GetxAxisLabel(i: number, j: number) {


    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.name;
      }
    }
    return false;
  }

  GetyAxisLabel(i: number, j: number) {


    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.value;
      }
    }
    return false;
  }

  GetChartType(i: number, j: number) {

    ////////debugger;
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.charttype;
      }
    }
    return false;
  }

  hasData(i: number, j: number) {

    //////////debugger;
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return true;
      }
    }
    return false;
  }



  GetHeader(i: number, j: number) {
    //  ////////debugger;

    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.title;
      }
    }
    return "";
  }
  getclass(i: number, j: number) {
    // debugger;
    let totalcols = 0;
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1)) {
        totalcols++;
      }
    }
    if (totalcols != 0) return "p-col-12 p-md-" + (12 / totalcols);
    return "";
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        //let index = this.results.findIndex(x => x.dashboardname === detailobj.dashboardname);
        //if(this.results[index].data.count<=1 && )return "card5";
        if (detailobj.charttype == "R") return "card5";
      }
    }


    return "card"
  }

  getname(i: number, j: number) {
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.dashboardname;
      }
    }

  }
  GetReportID(i: number, j: number) {
    ////debugger;
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.reportid;
      }
    }
    return "30";
  }

  GetMenuID(i: number, j: number) {
    // //////debugger;
    for (let k = 0; k < this.details.length; k++) {
      let detailobj = this.details[k];
      if (detailobj.row == (i + 1) && detailobj.col == (j + 1)) {
        return detailobj.menuid;
      }
    }
    return "35";
  }

  GetResults(i: number, j: number) {
    //debugger;
    //resultobj.data.labels
    //resultobj.data.data
    for (let k = 0; k < this.results.length; k++) {
      let resultobj = this.results[k];
      if (resultobj.row == (i + 1) && resultobj.col == (j + 1)) {
        //resultobj.Data
        // console.log(this.barChartData);


        return resultobj.rowdata;
      }
    }
    return null;
  }
  GetOptions(i: number, j: number) {
    //debugger;
    //resultobj.data.labels
    //resultobj.data.data
    for (let k = 0; k < this.results.length; k++) {
      let resultobj = this.results[k];
      if (resultobj.row == (i + 1) && resultobj.col == (j + 1)) {
        //resultobj.Data
        // console.log(this.barChartData);


        return resultobj.options;
      }
    }
    return null;
  }
  counter(i: number) {
    return new Array(i);
  }

}
