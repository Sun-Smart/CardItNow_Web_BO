import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module'
import { routing } from './bodashboardviewer.routing';
import { BODashboardViewerComponent } from './bodashboardviewer.component';


@NgModule({
  exports: [
    NgCommonModule
  ],
  imports: [
    routing,
    NgCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [BODashboardViewerComponent]
})
export class bodashboardviewerModule { }
