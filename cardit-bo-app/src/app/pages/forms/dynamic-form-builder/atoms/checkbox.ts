import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'checkbox',
  template: `
      <div [formGroup]="form">
        <div [formGroupName]="field.name" >
        <!-- <div *ngFor="let opt of field.options" class="form-check form-check">-->
             <input [formControlName]="field.name" class="form-check-input" type="checkbox" [checked]="field.value == 'checked' ? '' : null"   [id]="field.name"  value="checked" />
             
          <!--</div>-->
        </div>

      </div> 
    `
})
export class CheckBoxComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  get isValid() { if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].valid; }
  get isDirty() { if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].dirty; }

}