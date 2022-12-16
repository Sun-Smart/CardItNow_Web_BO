import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-rating',
  template: `
<ng-container *ngIf="uidesign==='primeNG'">
<p-rating [(ngModel)]="stars"></p-rating>
<ng-container>
<ng-container *ngIf="uidesign!='primeNG'"> 
<span
*ngFor="let starred of stars; let i = index"
(click)="onTouched(); rate(i + (starred ? (value > i + 1 ? 1 : 0) : 1))">
<ng-container *ngIf="starred; else noStar">⭐</ng-container>
<ng-template #noStar>·</ng-template>
</span>
<ng-container>   
  `,
  styles: [`
    span {
      display: inline-block;
      width: 25px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {
  uidesign = "primeNG";
  stars: boolean[] = Array(5).fill(false);

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the rating changes.
  onChange = (rating: number) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };
  constructor(private sharedService: SharedService) {
  }
  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  set value(value: number) {
    //debugger;
    if (value != null) {
      this.value = value;
    }

    this.value = value;


    if (this.onChange) {
      this.onChange(value);
    }
  }


  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
    this.uidesign = this.sharedService.uidesign;
    this.stars = this.stars.map((_, i) => rating > i);
    this.onChange(this.value)
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}