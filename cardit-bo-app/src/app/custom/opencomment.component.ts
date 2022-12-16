import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({

    selector: 'opencomment-App',
    template: `  
    <a class="alert-success" [routerLink]='' (click)="onSubmit()"><i class="fa fa-database"></i>
              Submit</a>
    <a class="nav-link active right"  [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
    <app-comment  id="comments" formControlName="comments" [label]="'Comments'">
    </app-comment>
                `,

})

export class opencommentComponent implements OnInit {
    data: any;
    comments: any;

    constructor(public dynamicconfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef) {
        //debugger;
        this.data = dynamicconfig.data;
        this.comments = this.data.comments;
    }
    async ngOnInit() {

    }
    onClose() {
        this.dialogRef.close();
    }
    onSubmit() {
        this.dialogRef.close(this.comments);
    }
}
