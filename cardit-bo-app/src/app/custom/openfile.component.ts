import { Component, OnInit, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({

    selector: 'openfile-App',
    template: `  
    <a class="nav-link active right"  [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
    <br>
    <iframe [src]="url" width="400px" height="400px"></iframe> 
                `,

})

export class openfileComponent implements OnInit {
    data: any;
    url: any;
    constructor(public dynamicconfig: DynamicDialogConfig, private sanitizer: DomSanitizer, public dialogRef: DynamicDialogRef) {
        //debugger;
        this.data = dynamicconfig.data;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
    async ngOnInit() {

    }
    onClose() {
        this.dialogRef.close();
    }
}
