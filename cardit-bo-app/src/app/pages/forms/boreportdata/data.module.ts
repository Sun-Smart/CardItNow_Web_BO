import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { boreportviewerModule } from '../../../pages/forms/boreportviewer/boreportviewer.module';
import { routing } from './data.routing';
import { dataComponent } from './data.component';


@NgModule({
  exports: [
    NgCommonModule

  ],
  imports: [boreportviewerModule,
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [dataComponent]
})
export class dataModule { }
