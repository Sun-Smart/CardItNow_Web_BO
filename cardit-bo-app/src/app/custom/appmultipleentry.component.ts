
import { Component, forwardRef, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { boconfigvalue } from './../model/boconfigvalue.model';
import { boconfigvalueService } from './../service/boconfigvalue.service';
import { SharedService } from './../service/shared.service';

@Component({
    selector: 'app-multipleentry',
    template: `
    <form [formGroup]="phoneForm">
    <div  class=" p-col-12 p-md-6">
    <input   id="contactvalue"  formControlName="contactvalue" class="">

    <select id="configtype"  (change)="configtypeonChange($event.target)" formControlName="configtype"  class="">
<option value="0">-Select-</option>
 <option *ngFor="let item of configtypeList" value="{{item.configkey}}">{{item.configtext}}</option>
    </select><button  type="button"  (click)="add()"> + </button>
    </div>
    <ng-container *ngFor="let item of totallist">
    <b>{{item.contactvalue}}</b>  {{item.configtypetext}}<button type="button" icon="fa fa-close"  (click)="remove(event, access)">X</button>,
</ng-container>

    </form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => appmultipleentryComponent),
        multi: true
    }]
})
export class appmultipleentryComponent implements ControlValueAccessor {
    @Input() config: string = '';
    onChange: Function;

    onTouched: Function;

    phoneForm: FormGroup;

    private _value: any;

    configtypeList: boconfigvalue[] = [];

    totallist: any[] = [];

    constructor(
        public sharedService: SharedService,
        private fb: FormBuilder,
        private configservice: boconfigvalueService,
    ) {
        ////debugger;
        this.phoneForm = this.fb.group({
            contactvalue: [null],
            configtype: [null],
            configtypedesc: [null],
        });
    }
    async ngOnInit() {
        ////debugger;
        this.configservice.getList(this.config).then((res: any) => {
            this.configtypeList = res as boconfigvalue[];
            if (this.configtypeList.length > 0) this.phoneForm.patchValue({ configtype: this.configtypeList[0].configkey, configtypedesc: this.configtypeList[0].configtext });
        });
    }

    configtypeonChange(evt: any) {
        let e = evt.value;
        this.phoneForm.patchValue({ configtypedesc: evt.options[evt.options.selectedIndex].text });
    }

    add() {
        var obj = { contactvalue: this.phoneForm.get('contactvalue').value, configtypevalue: this.phoneForm.get('configtype').value, configtypetext: this.phoneForm.get('configtypedesc').value };
        this.totallist.push(obj);
        let value = JSON.stringify(this.totallist);
        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
        this.phoneForm.patchValue({ contactvalue: "", configtype: "", configtypedesc: "" });
    }

    get value() {



        return this._value;
    }


    set value(value: string) {
        if (value != null && value != "") {
            this.totallist = this.sharedService.JSON_parse(value);
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