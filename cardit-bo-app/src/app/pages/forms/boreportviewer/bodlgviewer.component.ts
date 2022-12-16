import { BOReportViewerService } from '../../../service/boreportviewer.service';
import { boreport } from '../../../model/boreport.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-bodlgviewer',
  templateUrl: './bodlgviewer.component.html',
  styles: []
})



export class bodlgviewerComponent implements OnInit {

  data: any;
  constructor(
    private router: Router,
    private toastr: ToastService,
    dynamicdata: DynamicDialogConfig,
    //private dialog: NbDialogService,
    private currentRoute: ActivatedRoute) {
    this.data = dynamicdata;
  }


  ngOnInit() {
    //debugger;
    let bodlgviewer = null;

    if (this.data != null && this.data.data != null) this.data = this.data.data;
    if (this.data != null && this.data.url != null) {
      // this.router.navigate([this.data.url]);
      //this.data.url
      //this.router.navigateByUrl('/home/camsworkrequests/camsworkrequests');

      //this.router.navigate([{ outlets: { modal: [ 'camsworkrequests' ] }}]);

    }

  }


}



