
import { Component, forwardRef, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';

import { SharedService } from '../service/shared.service';

@Component({
    selector: 'app-stringlist',
    template: `
    <form [formGroup]="stringlistForm">
    <div  class="input-group col-6">
    <input   id="stringvalue"  formControlName="stringvalue" class="form-control">
    <button  type="button"  (click)="add()"> + </button>
    </div>
    <ng-container *ngFor="let item of totallist">
    <b>{{item.stringvalue}}</b>  {{item.configtypetext}}<button type="button" icon="fa fa-close"  (click)="remove(event, access)">X</button>,
</ng-container>

    </form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => stringlistComponent),
        multi: true
    }]
})
export class stringlistComponent implements ControlValueAccessor {
    @Input() config: string = '';
    onChange: Function;

    onTouched: Function;

    stringlistForm: FormGroup;

    private _value: any;



    totallist: any[] = [];

    constructor(public sharedService: SharedService,
        private fb: FormBuilder
    ) {
        ////debugger;
        this.stringlistForm = this.fb.group({
            stringvalue: [null],
            configtype: [null],
            configtypedesc: [null],
        });
    }
    async ngOnInit() {

    }

    configtypeonChange(evt: any) {
        let e = evt.value;
        this.stringlistForm.patchValue({ configtypedesc: evt.options[evt.options.selectedIndex].text });
    }

    add() {
        var obj = { stringvalue: this.stringlistForm.get('stringvalue').value, configtypevalue: this.stringlistForm.get('configtype').value, configtypetext: this.stringlistForm.get('configtypedesc').value };
        this.totallist.push(obj);
        let value = JSON.stringify(this.totallist);
        this._value = value;
        if (this.onChange) {
            this.onChange(value);
        }
        this.stringlistForm.patchValue({ stringvalue: "", configtype: "", configtypedesc: "" });
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