import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'field-builder',
  template: `
  <div class="p-col-1" [formGroup]="form">
    <label class="form-control-label control-label" [attr.for]="field.label">
      {{field.label}}<strong class="text-danger" *ngIf="field.required">*</strong>
    </label>
  </div>
  <div class="p-field p-col" [formGroup]="form">
    <ng-container [ngSwitch]="field.type">
      <textbox *ngSwitchCase="'text'" [field]="field" [form]="form"></textbox>
      <dropdown *ngSwitchCase="'dropdown'" [field]="field" [form]="form"></dropdown>
      <checkbox *ngSwitchCase="'checkbox'" [field]="field" [form]="form"></checkbox>
      <radio *ngSwitchCase="'radio'" [field]="field" [form]="form"></radio>
      <file *ngSwitchCase="'file'" [field]="field" [form]="form"></file>
      <div class="this.sharedService.alert this.sharedService.alert-danger my-1 p-2 fadeInDown animated" *ngIf="!isValid && isDirty">{{field.label}} is required</div>
    </ng-container>
  </div>
  `
})
export class FieldBuilderComponent implements OnInit {
  @Input() field: any;
  @Input() form: any;

  get isValid() {
    if (this.form != undefined && this.form.controls[this.field.name] != undefined && this.form.controls[this.field.name] != null)
      return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    if (this.form != undefined && this.form.controls[this.field.name] != undefined && this.form.controls[this.field.name] != null)
      return this.form.controls[this.field.name].dirty;
  }

  constructor() { }

  ngOnInit() {
  }

}
