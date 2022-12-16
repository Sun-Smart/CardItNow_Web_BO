import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FieldErrorDisplayComponent } from './field-error-display.component';
import { CanDeactivateGuard } from '../../../pages/common/unsaved-changes';
const routes: Routes = [
  {
    path: 'fielderrordisplays', children: [
      { path: '', component: FieldErrorDisplayComponent, canDeactivate: [CanDeactivateGuard] },
      { path: 'edit/:id', component: FieldErrorDisplayComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
