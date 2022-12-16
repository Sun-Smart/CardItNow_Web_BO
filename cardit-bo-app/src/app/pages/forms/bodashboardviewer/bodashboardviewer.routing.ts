import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BODashboardViewerComponent } from './bodashboardviewer.component';

const routes: Routes = [
  {
    path: 'bodashboardviewer', children: [
      { path: '', component: BODashboardViewerComponent },
      { path: ':id', component: BODashboardViewerComponent },
      { path: 'edit/:id', component: BODashboardViewerComponent },
      { path: 'view/:viewid', component: BODashboardViewerComponent }
    ]
  },
  {
    path: '', children: [
      { path: '', component: BODashboardViewerComponent },
      { path: ':id', component: BODashboardViewerComponent },
      { path: 'edit/:id', component: BODashboardViewerComponent },
      { path: 'view/:viewid', component: BODashboardViewerComponent }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
