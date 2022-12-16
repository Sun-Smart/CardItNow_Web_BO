import {
  Component, forwardRef, ViewChild, Input, Output, HostListener, AfterViewInit, AfterViewChecked, OnInit, EventEmitter, OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BOReportViewerComponent } from './../pages/forms/boreportviewer/boreportviewer.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { switchMap, map, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-popupselect',
  template: `


<ng-container> 
  <form  [formGroup]="popupselectForm">
  <div class="input-group">
        <input  id="desc" formControlName="desc"  class="form-control" [ngbTypeahead]="resultsoptions"  class="form-control" (selectItem)="onSelectedaddedby($event)"   [resultFormatter]="resultsformatter"><i class="fa fa-search fa-lg text-secondary" (click)="Selectid(null)"></i>
  </div>
  </form>
  </ng-container>
  
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PopupSelectComponent),
    multi: true,

  }]
})
export class PopupSelectComponent implements ControlValueAccessor, OnInit, AfterViewChecked {
  /*
    <p-autoComplete formControlName="desc" [suggestions]="options" (completeMethod)="onSelectedaddedby($event)"></p-autoComplete>
  <!--
  <ng-container *ngIf="uidesign!='primeNG'"> 
    <form  [formGroup]="popupselectForm">
    <div class="input-group">
          <input  id="desc" formControlName="desc"  class="form-control" [ngbTypeahead]="resultsoptions"  class="form-control" (selectItem)="onSelectedaddedby($event)"   [resultFormatter]="resultsformatter"
             >
             -->
    <!--<i class="fa fa-search fa-lg text-secondary" (click)="Selectid(null)"></i>-->
  <!--  </div>
    </form>
    </ng-container>
    -->
  */

  uidesign = "primeNG";
  onChange: Function;

  onTouched: Function;

  @Input() SessionData: any;
  @Input() options: any;

  @Output() private selectItem = new EventEmitter<any>();
  //@Output() private numberGenerated = new EventEmitter<number>();
  private _value: any;
  @Input() id: string;
  @Input() desc: string;
  @Input() form: string;
  @Input() menuid: number;
  @Input() reportid: number;
  @Input() optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  popupselectForm: FormGroup;

  resultsoptions: any;
  resultsformatter: any;
  options1 = [];



  constructor(public dialog: DialogService, private fb: FormBuilder, private sharedService: SharedService) {
    this.popupselectForm = this.fb.group({
      desc: [null]
    });
  }


  async ngOnInit() {

    this.ngOnInit1();
  }
  async ngOnInit1() {
    if (this.optionsEvent) {
      this.optionsEvent.subscribe(newval => {
        //////debugger;
        this.options = newval;
      });
      this.id = "value";
      this.desc = "label";
    }
    ////debugger;
    /*
    this.resultsoptions=[];


    this.options1=[];
    this.options1.push({assetid:1,description:"ss"});
    this.options1.push({assetid:1,description:"sst"});
    this.resultsoptions = (text$: Observable<string>) =>
    
    text$.pipe(
        debounceTime(200),
        
        map(value => 
            
            value.length < 2 ? []
            : this.options1.filter((v:any) => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
               
    );
*/

    //if(this._value!=null)this.sharedService.alert(this._value+"b")
    //this.updateval(this._value);//commented
    this.resultsformatter = (result: any) => {
      //let flds = this.desc.split('#');
      let flds = 'label'.split('#');
      let description = "";
      for (let i = 0; i < flds.length; i++) {
        if (i > 0) description += " - ";
        description += result[flds[i]];
      }

      return description;
    }

    /*
        this.resultsoptions = (text$: Observable<string>) =>{
        return text$.pipe(
        debounceTime(200),distinctUntilChanged(),
        map(value => value.length < 2 ? []
        : switchMap((searchText) => this.search(searchText)))
        );
        }
    */
    //////debugger;

    this.resultsoptions = (text$: Observable<string>) => {
      return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap((searchText) => this.search(searchText))
      );
    }

    /*
        setTimeout(() => {
       this.options1=[];
       this.options1.push({assetid:1,description:"ss"});
       this.options1.push({assetid:1,description:"sst"});
    this.options1=this.options;
            if(this.options1)
    {   
        console.log(this.options1);
        this.resultsoptions = (text$: Observable<string>) =>
        
        text$.pipe(
            debounceTime(200),
            
            map(value => 
                
                value.length < 2 ? []
                : this.options1.filter((v:any) => v.description.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
                   
        );
            
    this.resultsformatter = (result: any) => result.description;
            }
    
        }, 1000);
        */
  }
  search(value) {
    //  ////debugger;
    if (this.options) {
      //let flds = this.desc.split('#');
      let flds = 'label'.split('#');
      let description = "";
      for (let i = 0; i < flds.length; i++) {
        if (i > 0) description += " - ";
        //description += res[flds[i]];
      }

      //let res = this.options.filter(v => v[this.desc].toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
      //alert(flds[0]);
      // console.log(this.options);
      let res = this.options.filter(v => v[flds[0]] != null && v[flds[0]].toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);

      ////////debugger;
      return of(res);
    }
    return of('');
  }
  onSelectedaddedby(addedbyDetail: any) {
    ////debugger;
    if (addedbyDetail) {

      //let flds = this.desc.split('#');
      let flds = 'label'.split('#');
      let description = "";
      for (let i = 0; i < flds.length; i++) {
        if (i > 0) description += " - ";
        description += addedbyDetail.item[flds[i]];
      }

      this.popupselectForm.patchValue({ desc: description });
      //this.sharedService.alert('2');
      addedbyDetail.preventDefault();
      this._value = addedbyDetail.item[this.id];
      //this.numberGenerated.emit(123);
      this.selectItem.emit(addedbyDetail.item);
      if (this.onChange) {
        this.onChange(addedbyDetail.item[this.id]);
        //this.onChangeDesc(description);
      }
    }
  }


  Selectid(id) {

    let ScreenType = '2';
    this.sharedService.menuid = this.menuid;
    this.dialog.open(BOReportViewerComponent,
      {
        data: { ScreenType, form: this.form, reportid: this.reportid, menuid: this.menuid }
      }
    ).onClose.subscribe((res: any) => {
      ////////debugger;
      if (res && res != null) {
        //let flds = this.desc.split('#');
        let flds = 'label'.split('#');
        let description = "";
        for (let i = 0; i < flds.length; i++) {
          if (i > 0) description += " - ";
          description += res[flds[i]];
        }

        this.popupselectForm.patchValue({
          desc: description
        });
        //this.sharedService.alert('3');
        this._value = res[this.id];
        this.selectItem.emit(res);
        //this.numberGenerated.emit(123);
        if (this.onChange) {
          this.onChange(res[this.id]);

        }

      }
    });
  }


  get value() {

    return this._value;

  }


  set value1(value: any) {


    if (true || value != null) {
      //debugger;
      this._value = value;
      let timeout = 0;
      if (this.options == undefined) {
        timeout = 500;
      }
      // if(value!=null)this.sharedService.alert(value + "a")
      setTimeout(() => {
        this.updateval(value);

        if (this.onChange) {
          this.onChange(value);
        }
      }, timeout);
      //
    }

    ////////debugger;



  }
  ngAfterViewChecked() {
    //////debugger;
    //  this.updateval(this._value);
  }
  updateval(value) {
    //setTimeout(() => {
    ////debugger;
    let description = "";
    //this.assetidList.filter((v:any) => v.description.toString().toLowerCase().indexOf(value.toLowerCase())
    if (value && this.options && this.options.length > 0) {
      //////debugger;
      //let flds = this.desc.split('#');
      let flds = 'label'.split('#');
      for (let i = 0; i < flds.length; i++) {
        if (i > 0) description += " - ";
        description += this.options.find(x => x[this.id] == value)[flds[i]];
      }

      //desc = this.options.find(x => x[this.id] == value)[this.desc];
      /*
      this.popupselectForm.patchValue({
        desc: description
      });
      */
    }

    this.popupselectForm.patchValue({
      desc: description
    });

    //}, 1000);
  }

  writeValue(obj: any): void {
    ////debugger;
    //this.value = obj;
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }


}