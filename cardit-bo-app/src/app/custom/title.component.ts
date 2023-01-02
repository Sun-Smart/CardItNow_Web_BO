import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { SharedService } from '../service/shared.service';
import { SessionService } from '../pages/core/services/session.service';
import { TranslateService } from "@ngx-translate/core";
@Component({

  selector: 'app-title',
  template: `  

  <div class="p-grid zero"  [ngClass]="novo" style="background-color: #cee812;height: 30px;" >
  <div class="p-col zero col-4" style="text-align: initial; margin-left: 10px !important;">
  <a href='#/{{p_currenturl}}'>{{title | translate}}</a>
  </div>
  <div class="p-col zero col-4"></div>
  <div class="p-col zero col-4" style="display:flex; justify-content: end;margin-right: 15px !important;">
 
  
  <p-button   icon="pi pi-save" pTooltip="save" tooltipPosition ="bottom" (onClick)="action_onSubmit()" [model]="saveitems"></p-button
  >
  <p-button   icon="pi pi-file" pTooltip="Submit & Clear" tooltipPosition ="bottom" (onClick)="action_onSubmitAndWait()" [model]="items"></p-button
  >

        
        <p-button id='closebutton' class="popupclose" *ngIf="maindata?.ScreenType==2"  icon="pi pi-times" (click)="action_onClose($event)"></p-button>
        </div>
  </div>
    
                `,

  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => titleComponent),
    multi: true
  }]

})
// <button type="button"  pButton icon="pi pi-list" (click)="menu.toggle($event)"></button>
          
// <p-slideMenu  appendTo="body"  [showTransitionOptions]="'0ms'" [hideTransitionOptions]="'0ms'" [viewportHeight]="225"   #menu [popup]="true" [model]="items" ></p-slideMenu>
   
export class titleComponent implements ControlValueAccessor, OnInit {
  @Input() novo:boolean;
  @Input() title: string;
  @Input() f: any;
  @Input() data: any;
  @Input() maindata: any;
  @Input() p_menuid: any;
  @Input() action: any;
  @Input() showview: any;
  @Input() ScreenType: any;
  @Input() reportcode: any;

  @Output() onSubmit = new EventEmitter<any>();
  @Output() onSubmitDataDlg = new EventEmitter<any>();

  @Output() edit = new EventEmitter<any>();
  @Output() first = new EventEmitter<any>();
  @Output() prev = new EventEmitter<any>();
  @Output() onSelectedpk = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();
  @Output() last = new EventEmitter<any>();
  @Output() resetForm = new EventEmitter<any>();

  @Output() onDelete = new EventEmitter<any>();
  @Output() onCopy = new EventEmitter<any>();
  @Output() onCopyDetails = new EventEmitter<any>();
  @Output() onCopyRecursive = new EventEmitter<any>();

  @Output() onClose = new EventEmitter<any>();
  @Output() afterAction = new EventEmitter<any>();
  @Output() onSubmitAndWait = new EventEmitter<any>();
  @Output() onChangeAction = new EventEmitter<any>();


  onChange: Function;

  onTouched: Function;
  private _value: any;
  items: any;
  saveitems: any;
  p_currenturl: any;
  sessionData: any;
  constructor(private translate: TranslateService, private sessionService: SessionService, private sharedService: SharedService) {
    debugger;
    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.translate.use(this.sessionData.language);

    }
  }
  async ngOnInit() {
    this.p_currenturl = this.sharedService.currenturl
    if (this.p_currenturl == undefined) this.p_currenturl = "home/boreportviewer/" + this.reportcode;
    //alert(this.sharedService.currenturl)
    debugger;
    this.saveitems = [
      { label: 'Submit & Clear', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onSubmitAndWait() }
    ];
    this.items = [
      { label: 'Save', icon: 'pi pi-fw pi-user-minus', command: () => this.action_onSubmit() },
      // {
      //   label: 'Activity',
        // items: [
          // { label: 'New', icon: 'pi pi-fw pi-user-plus', command: () => this.action_resetform() },
        


          // { label: 'Submit & Clear', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onSubmitAndWait() },
          // { label: 'Delete', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onDelete() },
          // { label: 'Close', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onClose() },
        ]
      // },

      // {
      //   label: 'Copy',
      //   items: [

      //     { label: 'Copy', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onCopy() },
      //     { label: 'Copy Details', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onCopyDetails() },
      //     { label: 'Copy Recursive', icon: 'pi pi-fw pi-user-plus', command: () => this.action_onCopyRecursive() },
      //   ]
      // },
      // {
      //   label: 'Navigation',
      //   items: [

      //     { label: 'Edit', icon: 'pi pi-fw pi-plus', command: () => this.action_edit() },
      //     { label: 'first', icon: 'pi pi-fw pi-download', command: () => this.action_first() },
      //     { label: 'prev', icon: 'pi pi-fw pi-download', command: () => this.action_prev() },
      //     { label: 'next', icon: 'pi pi-fw pi-download', command: () => this.action_next() },
      //     { label: 'last', icon: 'pi pi-fw pi-download', command: () => this.action_last() },
      //   ]
      // },
      // {
      //   label: 'Others',
      //   items: [
      //     { label: 'Clipboard', icon: 'pi pi-fw pi-user-minus' },
      //     { label: 'Print', icon: 'pi pi-fw pi-user-plus' },
      //     { label: 'Mail', icon: 'pi pi-fw pi-user-plus' },
      //   ]
      // },
      // {
      //   label: 'Actions',
      //   items: [
      //     { label: 'New', icon: 'pi pi-fw pi-user-plus' },
      //     { label: 'Save', icon: 'pi pi-fw pi-user-minus' },
      //     { label: 'Delete', icon: 'pi pi-fw pi-user-plus' },
      //   ]
      // },

    // ];
  }

  get value() {



    return this._value;
  }

  action_edit() {
    //debugger;
    this.edit.emit();
  }
  action_first() {
    this.first.emit();
  }
  action_prev() {
    this.prev.emit();
  }
  action_onSelectedpk($event) {
    this.onSelectedpk.emit($event);
  }
  action_next() {
    this.next.emit();
  }
  action_last() {
    this.last.emit();
  }
  action_resetform() {
    //debugger;
    this.resetForm.emit();
  }
  action_onSubmit() {
    debugger;
    if (this.maindata == undefined) {
      this.onSubmit.emit();
    }
    else if (this.maindata?.pkcol == undefined && this.maindata?.maindatapkcol == undefined) {
      this.onSubmitDataDlg.emit();
    }
    else {
      this.onSubmit.emit();
    }



  }
  action_onDelete() {
    //debugger;
    this.onDelete.emit();
  }
  action_onCopy() {
    this.onCopy.emit();
  }
  action_onCopyDetails() {
    this.onCopyDetails.emit();
  }
  action_onCopyRecursive() {
    this.onCopyRecursive.emit();
  }
  action_onClose() {
    this.onClose.emit();
  }

  action_afterAction() {
    this.afterAction.emit();
  }

  action_onSubmitAndWait() {
    debugger;

    this.onSubmitAndWait.emit();
  }

  action_onChangeAction() {
    this.onCopy.emit();
  }

  set value(value: string) {
    if (value != null && value != "") {

    }

    this._value = value;


    if (this.onChange) {
      this.onChange(value);
    }
  }
  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    ////debugger;
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
