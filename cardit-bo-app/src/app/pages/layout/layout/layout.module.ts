import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';
import { LayoutComponent } from './layout.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [LayoutComponent]
})
export class layoutModule { }
