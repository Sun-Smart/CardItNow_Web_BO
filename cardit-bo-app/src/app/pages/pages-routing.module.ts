import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BOReportViewerComponent } from '../pages/forms/boreportviewer/boreportviewer.component';


const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        {
            path: 'forms',
            //loadChildren: () => import('../pages/forms/forms.module').then(m => m.FormsModule),
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)
    ],
    exports: [RouterModule],

})
export class PagesRoutingModule {

}

