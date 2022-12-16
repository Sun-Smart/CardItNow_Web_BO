import { NgCommonModule } from './appcommon.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { paths } from './app.layout.module';



const config: ExtraOptions = {
    useHash: true,
};

@NgModule({

    exports: [

    ],

    declarations: [

    ],

    imports: [
        NgCommonModule,
        RouterModule.forChild(paths),
        FormsModule, ReactiveFormsModule,

        CommonModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
    ],

})
export class NgWorkFlowModule { }

