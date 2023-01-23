import {Directive, ElementRef, NgZone} from '@angular/core';
import {FileSelectDirective} from 'ng2-file-upload';
 
declare var ImageCompressor: any;
 
const compressor=null;// = new ImageCompressor();
 
@Directive({
  selector: '[appImgCompressor]'
})
export class ImgCompressorDirective extends FileSelectDirective {
 
  constructor(private zone: NgZone,
              private elementRef: ElementRef) {
    super(elementRef);
  }
 
  onChange(): any {
    debugger;
    // Retrieve the selected files.
    const files: FileList = this.element.nativeElement.files;
    let objfile = files[0];
    if(objfile.type == "image/bmp")
    {
    this.zone.runOutsideAngular(() => {
 
      const promises: Promise<Blob>[] = [];
 
      // Compress each file and preserve a quality of 50%.
      for (let i = 0; i < files.length; ++i) {
        const file = files[i];

        promises.push(compressor.compress(file, {quality: .5}));
        
      }
 
      // When all promises resolve, then upload files to server.
      Promise.all(promises).then(_files => this.uploadFile(_files));
    });
    }
    else
    {
      const objfiles:File[]=[];
      
      objfiles.push(objfile);
      this.uploadFile(objfiles);
    }
  }
 
  protected uploadFile(files: any[]) {
    debugger;
    this.uploader.addToQueue(files, this.getOptions(), this.getFilters());
    this.onFileSelected.emit(files);
    if (!this.isEmptyAfterSelection()) {
      return;
    }
  }
}