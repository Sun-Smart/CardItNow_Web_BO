import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ToastService } from '../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BOReportViewerService } from './../../service/boreportviewer.service';
import { bomenumasterService } from './../../service/bomenumaster.service';
import { SessionService } from '../../pages/core/services/session.service';
import { SharedService } from './../../service/shared.service';
@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => actionComponent),
      multi: true
    }
  ]
})
export class actionComponent implements ControlValueAccessor {
  //@Input() modulename = '';
  @Input() value: string;
  @Input() menuid: string;
  @Input() status: string;
  @Input() f: any;

  @Output() afterAction: EventEmitter<any> = new EventEmitter<any>();
  onChange: any = () => {
    console.log('value1');
  };
  onTouched: any = () => { };


  menuactions: any;
  sessiondata: any;
  menucode: any;
  registerOnChange(fn) {
    console.log('value3');
    this.onChange = fn;
  }


  writeValue(value) {
    console.log('value2');
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  //menuid,action,pk
  processaction(actionid) {
    //debugger;
    var objaction;
    for (let i = 0; i < this.menuactions.length; i++) {
      if (this.menuactions[i].actionid == actionid) {
        objaction = this.menuactions[i];
        break;
      }
    }
    this.boreportviewerservice.process(this.menuid, objaction, this.value, this.menucode).then((res: any) => {
      //debugger;
      console.log(res);
      this.sharedService.alert((res as any).resultOutput);
      //this.mode=objaction.afterAction;
      this.afterAction.emit(objaction.afterAction);

    });

  }

  constructor(public sessionService: SessionService, private boreportviewerservice: BOReportViewerService, public sharedService: SharedService,
    private bomenumasterservice: bomenumasterService) {

  }
  condition(action) {
    ////debugger;
    var ret = true;
    let conditiontext = action.actioncondition;
    let rowData = {};

    if (conditiontext != null && conditiontext != undefined) {
      for (let key in this.f) {
        Object.defineProperty(rowData, key, { value: this.f[key].value, writable: true });

      };

      let status = this.status;
      let SESSIONUSERID;
      let SESSIONUSERTYPE;
      if (this.sessiondata != null) {
        SESSIONUSERID = this.sessiondata.userid;
        SESSIONUSERTYPE = this.sessiondata.usertype;
      }
      ret = eval(conditiontext);
    }
    return ret;

  }
  async ngOnInit() {
    //debugger;
    this.sessiondata = this.sessionService.getSession();


    this.bomenumasterservice.get_bomenumasters_ByID(parseInt(this.menuid)).then((res: any) => {
      //this.menumasterdata=res.bomenumaster;
      console.log(res)
      this.menuactions = res.bomenuactions;
      this.menucode = res.bomenumaster.menucode;
      if (this.status != "I") {
        var objmenuaction = {
          //actionicon: "fa fa-trash",
          actionid: "-4000",
          //actionname: "sptbldeleterecord",
          actiontype: "P",
          description: "Delete",
          menuid: this.menuid,
          rowselecttype: "M",
          rowselecttypedesc: "Multiple",
          servicename: "",
          afterAction: "new"
        };

        this.menuactions.push(objmenuaction);
      }
      else {
        ////debugger;
        var sessionuser = this.sharedService.JSON_parse(this.sessionService.getItem("currentUser"));
        console.log(sessionuser);
        //this.sharedService.alert(sessionuser.userroleid);
        if (sessionuser.userroleid == 5) {
          var objmenuaction = {
            //actionicon: "fa fa-check",
            actionid: "-4001",
            //actionname: "sptbldeleterecordactive",
            actiontype: "P",
            description: "UnDelete",
            menuid: this.menuid,
            rowselecttype: "M",
            rowselecttypedesc: "Multiple",
            servicename: "",
            afterAction: "refresh"
          };

          this.menuactions.push(objmenuaction);
        }
      }
    });

  }

}