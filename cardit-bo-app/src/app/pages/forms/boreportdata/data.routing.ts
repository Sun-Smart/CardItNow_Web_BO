import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { dataComponent } from './data.component';
import { CanDeactivateGuard } from '../../../pages/common/unsaved-changes';
const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: dataComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
