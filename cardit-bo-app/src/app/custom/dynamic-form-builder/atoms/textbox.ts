import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
  selector: 'textbox',
  template: `
      <div [formGroup]="form">
        <input *ngIf="!field.multiline && !field.mobilenumber && !field.email" [attr.type]="field.type" class="form-control"  [id]="field.name" [name]="field.name" [formControlName]="field.name">
        <textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
        rows="9" class="form-control" [placeholder]="field.placeholder"></textarea>
        <input *ngIf="field.email" type="email" [email]="true" [attr.type]="field.type" class="form-control"  [id]="field.name" [name]="field.name" [formControlName]="field.name">
        <int-phone-prefix  *ngIf="field.mobilenumber"   [id]="field.name"  [formControlName]="field.name"  [locale]="'en'" [defaultCountry]="'in'"  class="form-control mobile" 
        placeholder="{{'Phone' | translate}}"> </int-phone-prefix>
        </div> 
    `
})
export class TextBoxComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() {
    if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].valid;
  }
  get isDirty() { if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].dirty; }

  constructor() {

  }
}