import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BOReportViewerComponent } from './boreportviewer.component';
import { boformviewerComponent } from './boformviewer.component';
import { CanDeactivateGuard } from '../../../pages/common/unsaved-changes';
const routes: Routes = [
  //{ 
  //  path: 'boreportviewer',
  //  children: [


  //  { path: '', component: BOReportViewerComponent },
  { path: ':id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: ':id/:fkname/:fk', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: ':id/:fkname/:fk/:fkname1/:fk1', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'view/:id/:pk', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'show/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'show/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'edit/:id', component: BOReportViewerComponent, canDeactivate: [CanDeactivateGuard] }
]
//}
//];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
