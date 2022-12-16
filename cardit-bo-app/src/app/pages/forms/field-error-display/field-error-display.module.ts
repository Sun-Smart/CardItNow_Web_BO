import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { boreportviewerModule } from '../../../pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './field-error-display.routing';
import { FieldErrorDisplayComponent } from './field-error-display.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FieldErrorDisplayComponent]
})
export class FieldErrorDisplayModule { }
