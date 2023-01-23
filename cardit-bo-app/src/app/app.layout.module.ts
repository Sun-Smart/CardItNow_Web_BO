import { NgCommonModule } from './appcommon.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CalendarFormComponent } from './pages/forms/calendarform/calendarform.component';


import { showdashboardComponent } from './pages/forms/bodashboardviewer/showdashboard.component';


//import { DashboardComponent } from './pages/forms/dashboard/dashboard.component';
import { boworkflowdesignComponent } from './pages/forms/boworkflowdesign/boworkflowdesign.component';

import { BODashboardViewerComponent } from './pages/forms/bodashboardviewer/bodashboardviewer.component';

import { FieldErrorDisplayComponent } from './pages/forms/field-error-display/field-error-display.component'


import { boworkflowactionComponent } from "./pages/forms/boworkflowaction/boworkflowaction.component";

import { boreportdetailComponent } from "./pages/forms/boreportdetail/boreportdetail.component";
import { boworkflowstepComponent } from "./pages/forms/boworkflowstep/boworkflowstep.component";
import { boworkflowmasterComponent } from "./pages/forms/boworkflowmaster/boworkflowmaster.component";
import { boconfigvalueComponent } from "./pages/forms/boconfigvalue/boconfigvalue.component";

import { boworkflowComponent } from "./pages/forms/boworkflow/boworkflow.component";

import { bodashboardComponent } from "./pages/forms/bodashboard/bodashboard.component";
import { boreportcolumnComponent } from "./pages/forms/boreportcolumn/boreportcolumn.component";

import { bodashboarddetailComponent } from "./pages/forms/bodashboarddetail/bodashboarddetail.component";
import { boreportothertableComponent } from "./pages/forms/boreportothertable/boreportothertable.component";
import { boreportComponent } from "./pages/forms/boreport/boreport.component";

import { BOReportViewerComponent } from "./pages/forms/boreportviewer/boreportviewer.component";

import { pagenotfoundComponent } from './pages/forms/pagenotfound/pagenotfound.component';

import { avatarmasterComponent } from './pages/forms/avatarmaster/avatarmaster.component';
import { carditchargesdiscountComponent } from './pages/forms/carditchargesdiscount/carditchargesdiscount.component';
import { citymasterComponent } from './pages/forms/citymaster/citymaster.component';
import { customerdetailComponent } from './pages/forms/customerdetail/customerdetail.component';
import { customermasterComponent } from './pages/forms/customermaster/customermaster.component';
import { customerpaymodeComponent } from './pages/forms/customerpaymode/customerpaymode.component';
import { customerrecipientlinkComponent } from './pages/forms/customerrecipientlink/customerrecipientlink.component';
import { customersecurityquestionComponent } from './pages/forms/customersecurityquestion/customersecurityquestion.component';
import { customersecurityquestionshistoryComponent } from './pages/forms/customersecurityquestionshistory/customersecurityquestionshistory.component';
import { customertermsacceptanceComponent } from './pages/forms/customertermsacceptance/customertermsacceptance.component';
import { geoaccessComponent } from './pages/forms/geoaccess/geoaccess.component';
import { geographymasterComponent } from './pages/forms/geographymaster/geographymaster.component';
import { initiatorrecipientmappingComponent } from './pages/forms/initiatorrecipientmapping/initiatorrecipientmapping.component';
import { initiatorrecipientprivateComponent } from './pages/forms/initiatorrecipientprivate/initiatorrecipientprivate.component';
import { masterdataComponent } from './pages/forms/masterdata/masterdata.component';
import { masterdatatypeComponent } from './pages/forms/masterdatatype/masterdatatype.component';
import { menuaccessComponent } from './pages/forms/menuaccess/menuaccess.component';
import { menumasterComponent } from './pages/forms/menumaster/menumaster.component';
import { recipientdiscountComponent } from './pages/forms/recipientdiscount/recipientdiscount.component';
import { termsmasterComponent } from './pages/forms/termsmaster/termsmaster.component';
import { transactiondetailComponent } from './pages/forms/transactiondetail/transactiondetail.component';
import { transactionitemdetailComponent } from './pages/forms/transactionitemdetail/transactionitemdetail.component';
import { transactionmasterComponent } from './pages/forms/transactionmaster/transactionmaster.component';
import { usermasterComponent } from './pages/forms/usermaster/usermaster.component';
import { userrolemasterComponent } from './pages/forms/userrolemaster/userrolemaster.component';
import { FieldBuilderComponent } from './custom/dynamic-form-builder/field-builder/field-builder.component';
import { DynamicFormBuilderComponent } from './custom/dynamic-form-builder/dynamic-form-builder.component';
import { TextBoxComponent } from './pages/forms/dynamic-form-builder/atoms/textbox';
import { RadioComponent } from './pages/forms/dynamic-form-builder/atoms/radio';
import { FileComponent } from './pages/forms/dynamic-form-builder/atoms/file';
import { NgxSpinnerModule } from "ngx-spinner";


export const ENTRY_COMPONENTS = [];


export const routedComponents = [];

export const paths = [

    {
        path: '',
        children: [

            {//CalendarComponent   //, component: LayoutComponent,
                path: '',
                children: [

                    { path: 'showdashboard/:id', component: showdashboardComponent },
                    { path: 'bodashboardviewer/bodashboardviewer/:id', component: showdashboardComponent },
                    { path: 'calendar/:id', component: CalendarFormComponent },

                    { path: 'boreportviewer', pathMatch: 'full', component: BOReportViewerComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },

                    { path: 'boreportviewer/:id', pathMatch: 'full', component: BOReportViewerComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk', pathMatch: 'full', component: BOReportViewerComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/:id/:fkname/:fk/:fkname1/:fk1', pathMatch: 'full', component: BOReportViewerComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },
                    { path: 'boreportviewer/view/:id/:pk', pathMatch: 'full', component: BOReportViewerComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/boreportviewer.module').then(m => m.boreportviewerModule) },

                    { path: 'boworkflowmasters', component: boworkflowmasterComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.module').then(m => m.boworkflowmasterModule) },
                    { path: 'boworkflows', component: boworkflowComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boworkflow/boworkflow.module').then(m => m.boworkflowModule) },
                    { path: 'boreports', component: boreportComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/boreport/boreport.module').then(m => m.boreportModule) },
                    { path: 'boreports/edit/:id', pathMatch: 'partial', component: boreportComponent, },
                    { path: 'boreports/view/:id', pathMatch: 'partial', component: boreportComponent, },
                   
                    
                    { path: 'bodashboards', component: bodashboardComponent, }, // loadChildren: () => import('../../../n-tire-bo-app/src/app/pages/forms/bodashboard/bodashboard.module').then(m => m.bodashboardModule) },
                    { path: 'showdashboard/:id', component: showdashboardComponent },

                    { path: 'boconfigvalues', component: boconfigvalueComponent, },
                    { path: 'boconfigvalues/edit/:id', pathMatch: 'partial', component: boconfigvalueComponent, },
                    { path: 'boconfigvalues/view/:id', pathMatch: 'partial', component: boconfigvalueComponent, },

                    { path: 'avatarmasters', component: avatarmasterComponent, },
                    { path: 'avatarmasters/edit/:id', pathMatch: 'partial', component: avatarmasterComponent, },
                    { path: 'avatarmasters/view/:id', pathMatch: 'partial', component: avatarmasterComponent, },
                    { path: 'carditchargesdiscounts', component: carditchargesdiscountComponent, },
                    { path: 'carditchargesdiscounts/edit/:id', pathMatch: 'partial', component: carditchargesdiscountComponent, },
                    { path: 'carditchargesdiscounts/view/:id', pathMatch: 'partial', component: carditchargesdiscountComponent, },
                    { path: 'citymasters', component: citymasterComponent, },
                    { path: 'citymasters/edit/:id', pathMatch: 'partial', component: citymasterComponent, },
                    { path: 'citymasters/view/:id', pathMatch: 'partial', component: citymasterComponent, },
                    { path: 'customerdetails', component: customerdetailComponent, },
                    { path: 'customerdetails/edit/:id', pathMatch: 'partial', component: customerdetailComponent, },
                    { path: 'customerdetails/view/:id', pathMatch: 'partial', component: customerdetailComponent, },
                    { path: 'customermasters', component: customermasterComponent, },
                    { path: 'customermasters/edit/:id', pathMatch: 'partial', component: customermasterComponent, },
                    { path: 'customermasters/view/:id', pathMatch: 'partial', component: customermasterComponent, },
                    { path: 'customerpaymodes', component: customerpaymodeComponent, },
                    { path: 'customerpaymodes/edit/:id', pathMatch: 'partial', component: customerpaymodeComponent, },
                    { path: 'customerpaymodes/view/:id', pathMatch: 'partial', component: customerpaymodeComponent, },
                    { path: 'customerrecipientlinks', component: customerrecipientlinkComponent, },
                    { path: 'customerrecipientlinks/edit/:id', pathMatch: 'partial', component: customerrecipientlinkComponent, },
                    { path: 'customerrecipientlinks/view/:id', pathMatch: 'partial', component: customerrecipientlinkComponent, },
                    { path: 'customersecurityquestions', component: customersecurityquestionComponent, },
                    { path: 'customersecurityquestions/edit/:id', pathMatch: 'partial', component: customersecurityquestionComponent, },
                    { path: 'customersecurityquestions/view/:id', pathMatch: 'partial', component: customersecurityquestionComponent, },
                    { path: 'customersecurityquestionshistories', component: customersecurityquestionshistoryComponent, },
                    { path: 'customersecurityquestionshistories/edit/:id', pathMatch: 'partial', component: customersecurityquestionshistoryComponent, },
                    { path: 'customersecurityquestionshistories/view/:id', pathMatch: 'partial', component: customersecurityquestionshistoryComponent, },
                    { path: 'customertermsacceptances', component: customertermsacceptanceComponent, },
                    { path: 'customertermsacceptances/edit/:id', pathMatch: 'partial', component: customertermsacceptanceComponent, },
                    { path: 'customertermsacceptances/view/:id', pathMatch: 'partial', component: customertermsacceptanceComponent, },
                    { path: 'geoaccesses', component: geoaccessComponent, },
                    { path: 'geoaccesses/edit/:id', pathMatch: 'partial', component: geoaccessComponent, },
                    { path: 'geoaccesses/view/:id', pathMatch: 'partial', component: geoaccessComponent, },
                    { path: 'geographymasters', component: geographymasterComponent, },
                    { path: 'geographymasters/edit/:id', pathMatch: 'partial', component: geographymasterComponent, },
                    { path: 'geographymasters/view/:id', pathMatch: 'partial', component: geographymasterComponent, },
                    { path: 'initiatorrecipientmappings', component: initiatorrecipientmappingComponent, },
                    { path: 'initiatorrecipientmappings/edit/:id', pathMatch: 'partial', component: initiatorrecipientmappingComponent, },
                    { path: 'initiatorrecipientmappings/view/:id', pathMatch: 'partial', component: initiatorrecipientmappingComponent, },
                    { path: 'initiatorrecipientprivates', component: initiatorrecipientprivateComponent, },
                    { path: 'initiatorrecipientprivates/edit/:id', pathMatch: 'partial', component: initiatorrecipientprivateComponent, },
                    { path: 'initiatorrecipientprivates/view/:id', pathMatch: 'partial', component: initiatorrecipientprivateComponent, },
                    { path: 'masterdatas', component: masterdataComponent, },
                    { path: 'masterdatas/edit/:id', pathMatch: 'partial', component: masterdataComponent, },
                    { path: 'masterdatas/view/:id', pathMatch: 'partial', component: masterdataComponent, },
                    { path: 'masterdatatypes', component: masterdatatypeComponent, },
                    { path: 'masterdatatypes/edit/:id', pathMatch: 'partial', component: masterdatatypeComponent, },
                    { path: 'masterdatatypes/view/:id', pathMatch: 'partial', component: masterdatatypeComponent, },
                    { path: 'menuaccesses', component: menuaccessComponent, },
                    { path: 'menuaccesses/edit/:id', pathMatch: 'partial', component: menuaccessComponent, },
                    { path: 'menuaccesses/view/:id', pathMatch: 'partial', component: menuaccessComponent, },
                    { path: 'menumasters', component: menumasterComponent, },
                    { path: 'menumasters/edit/:id', pathMatch: 'partial', component: menumasterComponent, },
                    { path: 'menumasters/view/:id', pathMatch: 'partial', component: menumasterComponent, },
                    { path: 'recipientdiscounts', component: recipientdiscountComponent, },
                    { path: 'recipientdiscounts/edit/:id', pathMatch: 'partial', component: recipientdiscountComponent, },
                    { path: 'recipientdiscounts/view/:id', pathMatch: 'partial', component: recipientdiscountComponent, },
                    { path: 'termsmasters', component: termsmasterComponent, },
                    { path: 'termsmasters/edit/:id', pathMatch: 'partial', component: termsmasterComponent, },
                    { path: 'termsmasters/view/:id', pathMatch: 'partial', component: termsmasterComponent, },
                    { path: 'transactiondetails', component: transactiondetailComponent, },
                    { path: 'transactiondetails/edit/:id', pathMatch: 'partial', component: transactiondetailComponent, },
                    { path: 'transactiondetails/view/:id', pathMatch: 'partial', component: transactiondetailComponent, },
                    { path: 'transactionitemdetails', component: transactionitemdetailComponent, },
                    { path: 'transactionitemdetails/edit/:id', pathMatch: 'partial', component: transactionitemdetailComponent, },
                    { path: 'transactionitemdetails/view/:id', pathMatch: 'partial', component: transactionitemdetailComponent, },
                    { path: 'transactionmasters', component: transactionmasterComponent, },
                    { path: 'transactionmasters/edit/:id', pathMatch: 'partial', component: transactionmasterComponent, },
                    { path: 'transactionmasters/view/:id', pathMatch: 'partial', component: transactionmasterComponent, },
                    { path: 'usermasters', component: usermasterComponent, },
                    { path: 'usermasters/edit/:id', pathMatch: 'partial', component: usermasterComponent, },
                    { path: 'usermasters/view/:id', pathMatch: 'partial', component: usermasterComponent, },
                    { path: 'userrolemasters', component: userrolemasterComponent, },
                    { path: 'userrolemasters/edit/:id', pathMatch: 'partial', component: userrolemasterComponent, },
                    { path: 'userrolemasters/view/:id', pathMatch: 'partial', component: userrolemasterComponent, },

                    //Wild Card Route for 404 request
                    { path: '**', pathMatch: 'full', component: pagenotfoundComponent },

                ]
            },
        ]
    },
];



console.log(paths);
console.log(paths[0].children[0].children);
//(paths[0].children as any)

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({

    exports: [],

    declarations: [

        ...routedComponents,
        boconfigvalueComponent,
        avatarmasterComponent,
        carditchargesdiscountComponent,
        citymasterComponent,
        customerdetailComponent,
        customermasterComponent,
        customerpaymodeComponent,
        customerrecipientlinkComponent,
        customersecurityquestionComponent,
        customersecurityquestionshistoryComponent,
        // customertermsacceptanceComponent,
        // geoaccessComponent,
        // geographymasterComponent,
        // initiatorrecipientmappingComponent,
        // initiatorrecipientprivateComponent,
        // masterdataComponent,
        // masterdatatypeComponent,
        // menuaccessComponent,
        // menumasterComponent,
        // recipientdiscountComponent,
        // termsmasterComponent,
        // transactiondetailComponent,
        // transactionitemdetailComponent,
        // transactionmasterComponent,
        // usermasterComponent,
        // userrolemasterComponent,
        boreportComponent,
        pagenotfoundComponent,
        FieldBuilderComponent,
        DynamicFormBuilderComponent,
        DynamicFormBuilderComponent,
        TextBoxComponent,
        RadioComponent,
        FileComponent,
        FileComponent,
        FieldBuilderComponent,

    ],
    imports: [
      
        NgxSpinnerModule,
        NgCommonModule,
        RouterModule.forChild(paths),
        FormsModule, ReactiveFormsModule,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    entryComponents: [
        ...ENTRY_COMPONENTS
    ],

})
export class NgPrimeModule { }

