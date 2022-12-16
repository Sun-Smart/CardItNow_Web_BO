import { Component, forwardRef, ViewChild, Input, HostListener, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FileUpload } from 'primeng/fileupload';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AppConstants } from '../../shared/helper';
import { SharedService } from '../../service/shared.service';
import { Observable } from 'rxjs'; import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as JSZip from 'jszip';
//import fileSaver from 'file-saver';
import { Guid } from "guid-typescript";
import { DialogService } from 'primeng/dynamicdialog';
import { openfileComponent } from '../openfile.component';

function readBase64(file): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.addEventListener("error", function (event) {
            reject(event);
        }, false);

        reader.readAsDataURL(file);
    });
    return future;
}

// const URL = '/api/';
const URL = AppConstants.UploadURL;

@Component({
    selector: 'app-attachment',
    styles: [`
      .my-drop-zone { border: dotted 3px lightgray; }
    .nv-file-over { border: dotted 3px red; } 
    .another-file-over-class { border: dotted 3px green; }    
 
    html, body { height: 100%; }
  `],
    template: `
    <form  [formGroup]="attachmentForm">
    <div class="container">
 

    
 
        <div class="row">

            <div ng2FileDrop
                 [ngClass]="{'another-file-over-class': hasAnotherDropZoneOver}"
                 (fileOver)="fileOverAnother($event)"
                 [uploader]="uploader"
                  (onFileDrop)="onFileSelected($event)"
                 class="well my-drop-zone">
            </div>
            
            <!--Multiple-->
            <ng-container *ngIf='isAttachment'>
            Description: <input  id="description" formControlName="description" class="form-control" placeholder="Enter attachment description">
            </ng-container>
            <input type="file"  appImgCompressor  [uploader]="uploader" multiple  (onFileSelected)="onFileSelected($event)"  />
            
            <div  *ngIf="!isAttachment && uploadedFiles.length>0"><img [src]="src" style="width:200px;height:200px"></div>

        </div>
 
        <div class="row" style="margin-bottom: 40px" *ngIf="isAttachment">
 
            <table class="table">
                <thead>
                <tr>
                    <th width="50%">Name</th>
                    <th>Size</th>
                    <th *ngFor="let attachmentfield of attachmentfields">
                        {{attachmentfield.label}}
                    </th>

                </tr>
                </thead>
                <tbody>
                <tr  *ngFor="let uploadedfile of attachedfiles">
                <td  >{{uploadedfile.desc}}</td>
                <td  ><button (click) = "geturl(uploadedfile.filekey,uploadedfile.type)" >{{uploadedfile.name}}</button></td>
                <!--<td *ngFor="let attachmentfield of attachmentfields">
                    {{uploadedfile[attachmentfield.label + uploadedfile.Key]}}
                </td>-->
                <td >{{uploadedfile.size}} bytes</td>
                <td  ><button type="button" class="btn btn-danger btn-xs"
                (click)="delete(uploadedfile.filekey)"> <span class="glyphicon glyphicon-trash"></span> Remove </button></td>
                   
                </tr>

                </tbody>
            </table>

        </div>
 
    </div>

    </form>
  `,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => Attachment1Component),
        multi: true
    }]
})
export class Attachment1Component implements ControlValueAccessor {



    onChange: Function;


    onTouched: Function;

    @Input() SessionData: any;
    @Input() isAttachment: boolean = false;


    @ViewChild('fileUpload', { static: false }) fileUpload: FileUpload;

    attachmentForm: FormGroup;
    color: string = "#30e4c3";
    _value: any;
    src: any;
    private uploadedFiles: any[] = [];
    private attachedfiles: any[] = [];
    private AllFiles: any[] = [];
    readonly URL = AppConstants.UploadURL;
    readonly AttachmentURL = AppConstants.AttachmentURL;

    public attachmentfields: any[] = [];
    public attachmentfieldlist: any = { "fields": this.attachmentfields };
    bshowcolor: boolean = false;
    bshowcamera: boolean = false;

    // toggle webcam on/off
    private showWebcamImage = false;
    private showWebcam = false;
    private allowCameraSwitch = true;
    private multipleWebcamsAvailable = false;
    private deviceId: string;
    private videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };
    private errors: WebcamInitError[] = [];
    // latest snapshot
    private webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

    //uploader: FileUploader;
    public uploader: FileUploader = new FileUploader({
        url: URL,
        disableMultipart: true
    });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    fileObject: any;


    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    public async onFileSelected(event: EventEmitter<File[]>) {
        const file: File = event[0];

        //debugger;
        this.onFileSelect(event);
        this.src = await readBase64(file)
            .then(function (data) {
                return data;
            })

    }

    constructor(private fb: FormBuilder, public sharedService: SharedService, public dialog: DialogService) {
        ////debugger;
        this.attachmentForm = this.fb.group({
            description: [null],
            color: [null],
            ImageName: [null]
        });
    }

    upload() {
        ////debugger;
        //this.fileUpload.upload();
        this.sharedService.upload(this.AllFiles);
        this.AllFiles = [];
        if (this.fileUpload) this.fileUpload.clear();
    }
    remove(event: Event, file: any) {
        ////debugger;
        const index: number = this.uploadedFiles.indexOf(file);

        if (index > -1) {
            this.attachedfiles.splice(index, 1);
            this.uploadedFiles.splice(index, 1);
        }
        this.fileUpload.remove(event, index);
    }
    delete(file: any) {
        //debugger;
        const index: number = -1;
        for (let i = 0; i < this.attachedfiles.length; i++) {
            if (this.attachedfiles[i].name == file) {
                this.attachedfiles.splice(i, 1);
                return;
            }

        }

        //this.remove(null, index);
    }

    onChangeAction(val) {
        ////debugger;
        if (val == "Color") this.bshowcolor = !this.bshowcolor;
        if (val == "Camera") this.bshowcamera = !this.bshowcamera;
    }
    geturl(filename: string, filetype: string) {
        //debugger;
        this.dialog.open(openfileComponent,
            {
                data: { url: AppConstants.AttachmentURL + filename, ScreenType: 2 },
                header: filename
            }
        );
        //window.open(AppConstants.AttachmentURL + filename);
        return;
        fetch(AppConstants.AttachmentURL + filename)
            .then((res: any) => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                JSZip.loadAsync(blob).then(function (zip) {
                    console.log(zip.files);
                    var url;//  = this.createObjectURL(zip.files[0]);
                    let file = zip.files;
                    Object.keys(zip.files).forEach((filename) => {

                        zip.file(filename).async('blob').then((blob) => {
                            var file = new Blob([blob], {
                                type: filetype
                            });
                            url = window.URL.createObjectURL(file);//blob
                            window.open(url);
                        });
                    });
                    //url= window.URL.createObjectURL( file._data );

                    //window.open(url);
                    // folder1/
                    // folder1/folder2/
                    // folder1/folder2/folder3/
                    // folder1/folder2/folder3/file1.txt
                });

            });

        //return AppConstants.AttachmentURL + filename;
    }
    createObjectURL(file) {
        if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(file);
        } else {
            return null;
        }
    }
    getcolor(color: string) {
        return { 'background-color': color };
    }
    updatecolor() {
        return { 'background-color': this.color };
    }
    handleChange(e: any) {
        //////debugger;
        this.color = e;
    }
    getLength() {
        ////debugger;
        return this.attachedfiles?.length;
    }
    getAllFiles() {
        ////debugger;
        return this.AllFiles;
    }
    setattachmentlist(files) {
        ////debugger;
        this.attachedfiles = files;

    }
    getattachmentlist() {
        return this.attachedfiles;
    }
    getAttachmentList() {
        return this.attachedfiles;
    }
    async onFileSelect(e: any) {
        ////debugger;
        //this.attachedfiles = [];
        for (let i = 0; i < e.length; i++) {
            let max = 0;
            let attachmentobj = null;
            if (this.attachedfiles == null) this.attachedfiles = [];
            max = Array.of(this.uploadedFiles).length + Array.of(this.attachedfiles).length;



            //this.fileattachmentlist.push(e.files[i]);
            //this.AllFiles.push(e[i]);
            /*const jszip = new JSZip();
            
                
                let reader = new FileReader();
                let content;
 
                let filename=e[i].name;
                let filekey=Guid.create() + ".zip"; //e[i].name.split('.')[0]
                    let filetype=e[i].type;
                    
                    jszip.file(filename,e[i]);
                    let objFile=await  jszip.generateAsync({type:"blob",compression: "DEFLATE",compressionOptions: {level: 9}}).then(function(blob) {
                          return blob;
                    });
                    (objFile as any).name = filekey;
                      */
            this.AllFiles.push(e[i]);


            let description = this.attachmentForm.get('description').value;

            attachmentobj = { Key: (this.attachedfiles.length + 1 + max).toString(), name: e[i].name, size: e[i].size, type: e[i].type, username: this.SessionData.username, uploadeddate: this.getCurrentDate(), desc: description, color: this.color, filekey: e[i].name };


            this.attachmentfields.forEach((attachmentfield) => {
                attachmentobj[attachmentfield.name] = (document.all[attachmentfield.name + (this.attachedfiles.length + 1 + max).toString()]);
            });
            this.attachedfiles.push(attachmentobj);
            max = 0;
            //if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            //this.attachmentlist.push(attachmentobj);
            let arr = this.uploadedFiles.concat(this.attachedfiles);

            //let arr=this.attachedfiles;
            let jsonstring = JSON.stringify(arr);
            this._value = jsonstring;
            if (this.onChange) this.onChange(jsonstring);
            //this.attachmentForm.patchValue({ description: "" });
        }
        this.attachmentForm.patchValue({
            description: [null]
        });
    }

    /*
        makeZip(zip, name) {
            name = name.split('.')[0] + ".zip";
            zip.generateAsync({type:"blob", compression:"DEFLATE", compressionOptions: { level: 9 }})
              .then(function(content) {
                 // see FileSaver.js
                 console.log(content)
                 fileSaver.saveAs(content, name)       
                 var item = {
                   'name': name,
                   'type': content.type,
                   'size': content.size,
                   'guid': Guid.create()
                 };
              });
        }
    */
    clear() {
        //debugger;
        this.attachedfiles = [];
        if (this.fileUpload) this.fileUpload.files = [];
    }
    getCurrentDate() {
        return formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }
    getDescription() {
        console.log(this.attachmentForm.get('description').value);
        return this.attachmentForm.get('description').value;
    }
    getFile(file) {
        console.log(file);
        return "";
    }

    get value() {
        //////debugger;
        return this._value;

    }


    set value(value: any) {
        ////debugger;
        this._value = value;

        if (value != null && value != undefined && value != "[]") {
            this.uploadedFiles = value;
            if (this.uploadedFiles.length > 0) this.src = this.AttachmentURL + this.uploadedFiles[0].name;
        }
        //this.sharedService.JSON_parse(value)
        else
            this.uploadedFiles = [];

        this.attachmentForm.patchValue({ color: "#fff" });

        if (this.onChange) {
            this.onChange(value);
        }
    }

    writeValue(obj: any): void {
        this.value = obj;
    }


    registerOnChange(fn: any): void {
        //////debugger;
        this.onChange = fn;
    }


    registerOnTouched(fn: any): void {
        this.onTouched = fn;

    }

    public triggerSnapshot(): void {
        ////debugger;
        this.trigger.next();
        this.showWebcam = false;

    }

    public toggleWebcam(): void {
        ////debugger;
        this.showWebcam = !this.showWebcam;

        this.showWebcamImage = this.showWebcam;
    }

    public handleInitError(error: WebcamInitError): void {
        ////debugger;
        this.errors.push(error);
    }

    public showNextWebcam(directionOrDeviceId: boolean | string): void {
        ////debugger;
        // true => move forward through devices
        // false => move backwards through devices
        // string => move to device with given deviceId
        this.nextWebcam.next(directionOrDeviceId);
    }

    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
    }

    public cameraWasSwitched(deviceId: string): void {
        console.log('active device: ' + deviceId);
        this.deviceId = deviceId;
    }

    public get triggerObservable(): Observable<void> {
        ////debugger;
        return this.trigger.asObservable();
    }

    public get nextWebcamObservable(): Observable<boolean | string> {
        ////debugger;
        return this.nextWebcam.asObservable();
    }

    /*    
        async OCR() {
    
            const worker = createWorker({
                //logger: m => console.log(m),
            });
            await worker.load();
            await worker.loadLanguage('eng+ara');
            await worker.initialize('eng+ara');
            const rectangles = [];
            let rectangle: any;
            rectangle = { left: 294, top: 616, width: 335 - 294, height: 635 - 616 };
            rectangles.push(rectangle);
            rectangle = { left: 440, top: 618, width: 499 - 440, height: 635 - 618 };
            rectangles.push(rectangle);
            rectangle = { left: 568, top: 616, width: 739 - 568, height: 647 - 616 };
            rectangles.push(rectangle);
            rectangle = { left: 278, top: 655, width: 337 - 278, height: 674 - 655 };
            rectangles.push(rectangle);
            rectangle = { left: 276, top: 702, width: 740 - 276, height: 721 - 702 };
            rectangles.push(rectangle);
            rectangle = { left: 280, top: 744, width: 429 - 280, height: 769 - 744 };
            rectangles.push(rectangle);
            /*
              const values = [];
              for (let i = 0; i < rectangles.length; i++) {
                const { data: { text } } = await worker.recognize("/assets/"+this.camsassetadditionForm.get('ImageName').value, { rectangle: rectangles[i] });
                values.push(text);
              }
              console.log(values);
            */
    //, { rectangle }
    /*
    ////debugger;
    const { data: { text } } = await worker.recognize("/assets/" + this.camsassetadditionForm.get('ImageName').value);
    this.sharedService.alert(text);
    console.log(text);

    const { data } = await worker.detect("/assets/" + this.camsassetadditionForm.get('ImageName').value);
    console.log(data);
    await worker.terminate();
    if (this.customfieldservice.list != null) {
        for (let i = 0; i < this.customfieldservice.list.length; i++) {
            let value = this.customfieldservice.list[i];
            if (value.controltype == 'ocr' && (value.configurations != undefined && value.configurations != null)) {
                var obj = (document.all[value.name]) as any;
                var re = new RegExp(value.configurations, "gm");
                let match = re.exec(text);
                console.log(match);
                if (match != null && match[0] != null) obj.value = match[0];//result.text.replace(re,"$1");
            }
        }
    }

}
*/

    pushtoUpload() {
        var imageBlob = this.sharedService.dataURItoBlob(this.webcamImage.imageAsDataUrl);
        const imageFile = new File([imageBlob], this.attachmentForm.get('ImageName').value + ".jpeg", { type: 'image/jpeg' });
        var files: any[] = [];
        files.push(imageFile);
        let e = { files: files };
        this.onFileSelect(e);
        this.showWebcamImage = false;

    }



}



