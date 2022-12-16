
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCommonModule } from '../../../appcommon.module';

import { routing } from './boreportviewer.routing';

import { boformviewerComponent } from './boformviewer.component';
import { dataComponent } from '../boreportdata/data.component';
import { bodlgviewerComponent } from './bodlgviewer.component';

/*import { hrmsleaverequestModule } from '../hrmsleaverequest/hrmsleaverequest.module';
import { hrmsletterrequestModule } from '../hrmsletterrequest/hrmsletterrequest.module';
import { erppurchaserequestModule } from '../erppurchaserequest/erppurchaserequest.module';
import { umscourseModule } from '../umscourse/umscourse.module';*/
//import { bodashboardviewerModule } from '../../bodashboardviewer/bodashboardviewer.module';

@NgModule({
  exports: [
    //NgCommonModule,
    dataComponent
  ],
  imports: [
    // routing,
    NgCommonModule
    //,bodashboardviewerModule
    //erppurchaserequestModule,
    //hrmsleaverequestModule,hrmsletterrequestModule,umscourseModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [dataComponent, boformviewerComponent, bodlgviewerComponent],
  entryComponents: [dataComponent, bodlgviewerComponent]
})
export class boreportviewerModule { }
