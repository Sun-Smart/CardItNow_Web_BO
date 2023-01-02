import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValuePair } from '../../../shared/general.validator';

// text,email,tel,textarea,password, 
@Component({
  selector: 'file',
  template: `
      <div [formGroup]="form">
      <p-fileUpload  #fileattachment class="form-control" type="file" name="FileUpload[]" url="http://108.60.219.44:5001/api/file/upload"   mode="basic"    (onSelect)="attachmentuploader($event)" ></p-fileUpload>
<!--
      <div *ngIf="!field.value" class="drop-container dropzone" dropZone (hovered)="toggleHover($event)"
          (dropped)="field.onUpload($event)" [class.hovering]="isHovering">
          <p class="m-0">
            Drag a file here or
            <label class="upload-button">
              <input type="file" multiple="" (change)="field.onUpload($event.target.files)"> browse
            </label>
            to upload.
          </p>
        </div>
        <div *ngIf="field.value">
        -->
          <!-- <button type="button" class="btn btn-primary">Change</button> -->
          <!--
          <div class="card">
            <img class="card-img-top" [src]="field.value">
          </div>
        </div>
        -->
      </div> 
    `,
  styles: [
    `
      .drop-container {
        background: #fff;
        border-radius: 6px;
        height: 150px;
        width: 100%;
        box-shadow: 1px 2px 20px hsla(0,0%,4%,.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed #c0c4c7;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: #c0c4c7; 
      }
      .upload-button {
        display: inline-block;
        border: none;
        outline: none;
        cursor: pointer;
        color: #5754a3;
      }
      .upload-button input {
        display: none;
      }
      .dropzone { 
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column; 
        border-radius: 5px;
        background: white;
        margin: 10px 0;
      }
      .dropzone.hovering {
          border: 2px solid #f16624;
          color: #dadada !important;
      }
      progress::-webkit-progress-value {
        transition: width 0.1s ease;
      }
      `
  ]
})
export class FileComponent {
  @Input() field: any = {};
  @Input() form: FormGroup;
  fileattachmentlist: any[] = [];
  attachmentfieldjson: any[] = [];
  attachmentlist: any[] = [];

  get isValid() { if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].valid; }
  get isDirty() { if (this.form.controls[this.field.name] != null) return this.form.controls[this.field.name].dirty; }

  constructor() {

  }

  ngOnChange() {
    console.log(this.field.value);
    // this.field.value.
  }

  attachmentuploader(e) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileattachmentlist.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
      max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentfieldjson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }
}