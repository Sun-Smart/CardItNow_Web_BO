

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { NewheaderComponent } from './layout/newheader/newheader.component';





const PAGES_COMPONENTS = [

    PagesComponent,

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        MatTabsModule

    ],
    declarations: [
        ...PAGES_COMPONENTS,
        NewheaderComponent,
        
     
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
}
