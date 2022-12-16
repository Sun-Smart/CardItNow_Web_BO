import { FormGroup, NgControl, FormControl } from '@angular/forms';

export class KeyValuePair {

    constructor(public key: string, public value: string) {

    }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


export function DateCompare(controlFromDate: string, controlToDate: string, errorMsg: string) {
    return (formGroup: FormGroup) => {
        ////debugger;
        const fromcontrol = formGroup.controls[controlFromDate];
        const toControl = formGroup.controls[controlToDate];


        // return null if controls haven't initialised yet
        if (!fromcontrol || !toControl) {
            return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (toControl.errors && !toControl.errors.mustGreater) {
            return null;
        }
        ////debugger;
        if (fromcontrol.value != null && fromcontrol.value != undefined && toControl.value != null && toControl.value != undefined) {
            let d1 = new Date(fromcontrol.value.year, fromcontrol.value.month, fromcontrol.value.day);
            let d2 = new Date(toControl.value.year, toControl.value.month, toControl.value.day);
            //////debugger;
            // set error on matchingControl if validation fails
            if (d1 > d2) {
                formGroup.controls[controlFromDate].setErrors({ mustGreater: true });
            } else {
                formGroup.controls[controlFromDate].setErrors(null);
            }
        }

        //toControl.setErrors(null);
    }
}

export class Time {
    public hour: number;
    public minute: number;
    public second: number;
    constructor(dStr: string) {
        if (dStr != null) {
            this.hour = Number.parseInt(dStr.substr(0, dStr.indexOf(":")));
            this.minute = Number.parseInt(dStr.substr(dStr.indexOf(":") + 1));
            this.second = 0;
        }
        return this;
    }
}

export function MustDisable(maincontrol: FormControl, val: any, dependantcontrol: FormControl) {

    //////debugger;

    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }
    if (maincontrol.value == val) {
        dependantcontrol.disable();
    }
    else {
        dependantcontrol.enable();
    }
}
export function MustEnable(maincontrol: FormControl, val: any, dependantcontrol: FormControl) {

    //////debugger;

    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }
    if (maincontrol.value == val) {
        dependantcontrol.enable();
    }
    else {
        dependantcontrol.disable();
    }
}
export function MustVisible1(formGroup: FormGroup, maincontrolname: string, val: string, dependantcontrolname: string) {
    //  return (formGroup: FormGroup) => {

    //////debugger;

    const maincontrol = formGroup.controls[maincontrolname];
    const dependantcontrol = formGroup.controls[dependantcontrolname];


    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }


    /*
            // set error on matchingControl if validation fails
            if (d1>d2 ) {
                formGroup.controls[controlToDate].setErrors({ mustGreater: true });
            } else {
                formGroup.controls[controlToDate].setErrors(null);
            }
            
    */
    //toControl.setErrors(null);

    //    }
}