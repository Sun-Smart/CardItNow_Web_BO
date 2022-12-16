
import { Component, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { SharedService } from './../service/shared.service';

@Component({
    selector: 'app-duration',
    template: `
    <form [formGroup]="durationForm">
    <div  class="input-group">
    <input formControlName="day" (change)="updateval()" type="number" min="0" max="100"  />

    <input (keyup)="hourCheck()" (change)="updateval()"  formControlName="hour" type="number" min="0" max="24"/>
   
    <input (keyup)="minCheck()" (change)="updateval()"  formControlName="min" type="number"  min="0" max="60" />
    </div>
    </form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => durationComponent),
        multi: true
    }]
})
export class durationComponent implements ControlValueAccessor {

    onChange: Function;

    onTouched: Function;

    durationForm: FormGroup;

    private _value: any;
    @Output() private onchange = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder, private sharedService: SharedService
    ) {
        this.durationForm = this.fb.group({
            day: ['00', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
            hour: ['00', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
            min: ['00', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],

        });
    }
    async ngOnInit() {

    }

    minCheck() {
        if (this.durationForm.controls["min"].value > 59) {
            this.durationForm.controls['min'].setValue(0);
        }
    }

    hourCheck() {
        if (this.durationForm.controls["hour"].value > 24) {
            this.durationForm.controls['hour'].setValue(0);
        }
    }


    get value() {



        return this._value;
    }

    updateval() {
        let hr;
        let min;
        let day;
        if (this.durationForm.invalid) {
            console.log("error");
            this.sharedService.alert("Numbers only!")
        }
        else {

            day = this.durationForm.controls["day"].value;
            hr = this.durationForm.controls["hour"].value;
            min = this.durationForm.controls["min"].value;


            this._value = day + ":" + hr + ":" + min;

        }
        ////debugger;
        if (this.onChange) {
            this.onChange(this._value);
        }
        this.onchange.emit(this._value);
    }

    set value(value: string) {
        if (value != null) {
            let splitted = value.split(":");
            this.durationForm.patchValue({
                day: splitted[0],
                hour: splitted[1],
                min: splitted[2]
            });
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