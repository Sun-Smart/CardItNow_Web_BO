import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SharedService } from '../service/shared.service';

/*
import { CommentboxComponent } from './comments/commentbox/commentbox.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { ChildboxComponent } from './comments/childbox/childbox.component';
import { DatacontainerDirective } from './comments/comments/comments.component';
*/

@Component({
  selector: 'app-comment',
  template: `
  <div class="container3">
  <div class="">
      <div class="commentbox">
          <div class="col-12 col-sm-12 header">
            <!--  <h4>Comments ({{count}})</h4>-->
          </div>
          <div class="col-12 col-sm-12 body">
              <div class="comment-container">
                      <div class="comment-form">
                              <app-commentbox [commentInfo]="comments"  [user]="user" [label]="label" (usercomment)="receiveComment($event)"></app-commentbox>
                      </div>
              </div>
          </div>
      </div>
      <app-comments [postComment]="comments" [label]="label" (countComments)="receiveCount($event)"></app-comments>
  </div>
</div>
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
      useExisting: forwardRef(() => commentComponent),
      multi: true
    }
  ]
})
export class commentComponent implements ControlValueAccessor {
  @Input() label: any;
  @Input() user: any;
  count: number;
  private comments: any;
  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  constructor(public sharedService: SharedService,) {

  }
  // Function to call when the rating changes.
  onChange = (comment: string) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };

  get value(): string {
    //debugger;
    return this.comments;
  }

  set value(value: string) {
    ////debugger;
    if (value != null) {
      this.comments = value;
    }

    this.comments = value;


    if (this.onChange) {
      this.onChange(value);
    }
  }



  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(comment: string): void {
    //debugger;
    if (comment == null)
      this.comments = [];
    else
      this.comments = this.sharedService.JSON_parse(comment);
    this.onChange(comment);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (comment: string) => void): void {
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

  receiveComment($event) {
    //debugger;
    this.comments = $event;
    this.onChange($event);
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  receiveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}