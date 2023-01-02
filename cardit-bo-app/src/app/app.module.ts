import { NgCommonModule } from './appcommon.module';;
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { TokenInterceptor } from './auth/token.interceptor';

import { AuthService } from './auth/auth.service';
import {MatTabsModule} from '@angular/material/tabs';
import {SidebarModule} from 'primeng/sidebar';
import { BsDropdownModule } from "ngx-bootstrap";
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbDate, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_ROUTER_PROVIDERS } from './app-routing.module';
import { CanDeactivateGuard } from './pages/common/unsaved-changes';
import { CustomNgbDateParserFormatter } from './custom/custom-ngbDateParserFormatter'
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TreeNode } from 'primeng/api';
//import {WebcamModule} from 'ngx-webcam';
//
//import { NgPrimeModule, routedComponents, ENTRY_COMPONENTS } from './app.ngprime.module'

import { LoginComponent } from './pages/login/login.component';

import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResendEmailVerificationComponent } from './pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MenuItem} from 'primeng/api';
//
import { mainComponent } from './pages/main/main.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

import { LayoutComponent } from './pages/layout/layout/layout.component';
import { MenuComponent } from './pages/layout/menu/menu.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { FooterComponent } from './pages/layout/footer/footer.component';

//import { bokbmasterComponent } from './pages/forms/bokbmaster/bokbmaster.component';
import { Auth } from './service/auth.service';
import { LoaderService } from './pages/core/services/loader.service';
import { ToastService } from './pages/core/services/toast.service';
import { RouteStateService } from './pages/core/services/route-state.service';

import { SessionService } from './pages/core/services/session.service';

//import { HeaderBreadcrumbComponent } from './pages/layout/header-breadcrumb/header-breadcrumb.component';

import { UserIdleModule } from 'angular-user-idle';
import { ThemeService } from './pages/core/services/theme.service';
import { ApplicationStateService } from './pages/core/services/application-state.service';
import { UserDataService } from './pages/core/services/user-data.service'
//import { MenuDataService } from './pages/core/services/menu-data.service';

/*import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';*/
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserContextService } from './pages/core/services/user-context.service';
import { AuthGuard } from './pages/core/gaurds/auth.gaurd';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/*import { BOReportViewerComponent } from './pages/forms/boreportviewer/boreportviewer.component';
import { bomenumasterComponent } from './pages/forms/bomenumaster/bomenumaster.component';
import { bocountryComponent } from './pages/forms/bocountry/bocountry.component';*/
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';

//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
//import { InternationalPhoneModule  } from 'ng4-intl-phone';
import { NgxCurrencyModule } from "ngx-currency";
import { SharedService } from './service/shared.service';
import { ProgressSpinnerModule } 
    from 'primeng/progressspinner';
//import { NgCommonModule } from './appcommon.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JwtModule } from "@auth0/angular-jwt";
//import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';
import { NgxSpinnerModule } from "ngx-spinner";

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CommonModule } from '@angular/common';
import { FieldBuilderComponent } from './pages/forms/dynamic-form-builder/field-builder/field-builder.component';
import { DynamicFormBuilderComponent } from './pages/forms/dynamic-form-builder/dynamic-form-builder.component';
// import { TextBoxComponent } from './pages/forms/dynamic-form-builder/atoms/textbox';
import { TextBoxComponent } from './custom/dynamic-form-builder/atoms/textbox';
import { RadioComponent } from './custom/dynamic-form-builder/atoms/radio';
import { FileComponent } from '../app/custom/dynamic-form-builder/atoms/file';

import { CheckBoxComponent } from './pages/forms/dynamic-form-builder/atoms/checkbox';
import { CalendarFormComponent } from './pages/forms/calendarform/calendarform.component';
import { DropDownComponent } from './pages/forms/dynamic-form-builder/atoms/dropdown';
import { boworkflowComponent } from './pages/forms/boworkflow/boworkflow.component';
import { boworkflowstepComponent } from './pages/forms/boworkflowstep/boworkflowstep.component';
import { boworkflowmasterComponent } from './pages/forms/boworkflowmaster/boworkflowmaster.component';
import { boworkflowactionComponent } from './pages/forms/boworkflowaction/boworkflowaction.component';
import { boreportcolumn } from './model/boreportcolumn.model';
import { dataComponent } from './pages/forms/boreportdata/data.component';
import { boreportdetailComponent } from './pages/forms/boreportdetail/boreportdetail.component';
import { boreportothertable } from './model/boreportothertable.model';
import { boreportothertableComponent } from './pages/forms/boreportothertable/boreportothertable.component';
import { ReportViewerCtrlComponent } from './pages/forms/boreportviewer/reportviewerctrl.component';
import { bodashboardComponent } from './pages/forms/bodashboard/bodashboard.component';
import { bodashboarddetailComponent } from './pages/forms/bodashboarddetail/bodashboarddetail.component';
import { boreportcolumnComponent } from './pages/forms/boreportcolumn/boreportcolumn.component';
import { appmultipleentryComponent } from './custom/appmultipleentry.component';
import { CalendarHeaderComponent } from '../app/custom/calendarview.component';
import { commentComponent } from '../app/custom/comment.component';
import { ChildboxComponent } from './custom/comments/childbox/childbox.component';
import { CommentboxComponent } from './custom/comments/commentbox/commentbox.component';
import { durationComponent } from './custom/duration.component';
import { showdashboardComponent } from './pages/forms/bodashboardviewer/showdashboard.component';
import { BODashboardViewerComponent } from './pages/forms/bodashboardviewer/bodashboardviewer.component';
import { workflowComponent } from './custom/workflow/workflow.component';
import { titleComponent } from './custom/title.component';
import { stringlistComponent } from './custom/stringlist.component';
import { SignatureFieldComponent } from './custom/signature-field/signature-field.component';
import { PopupSelectComponent } from './custom/popupselect.component';
import { openfileComponent } from './custom/openfile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CarditImgCompressorDirective } from './service/cardit-img-compressor.directive';




export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
export function tokenGetter() {
    var value = localStorage.getItem("currentUser");
    return value;
    //return localStorage.getItem("access_token");
}
@NgModule({
    declarations: [
       
        AppComponent,
        LoginComponent,
        mainComponent,
        RegisterUserComponent,
        EmailVerificationComponent, ForgotPasswordComponent, ResendEmailVerificationComponent, ResetPasswordComponent,

        //bokbmasterComponent,
        HeaderComponent,
         FooterComponent,
        LayoutComponent,
        MenuComponent,
       
        // FieldBuilderComponent,
        // DynamicFormBuilderComponent,
        // DynamicFormBuilderComponent,
        // TextBoxComponent,
        // RadioComponent,
        // FileComponent,
        // FileComponent,
        // FieldBuilderComponent,
        // CheckBoxComponent,
        // CheckBoxComponent,
        // CalendarFormComponent,
        // DropDownComponent,
        boworkflowComponent,
        boworkflowstepComponent,
        boworkflowmasterComponent,
        boworkflowactionComponent,
        dataComponent,
        boreportcolumnComponent,
        bodashboarddetailComponent,
        bodashboardComponent,
        // ReportViewerCtrlComponent,
        boreportothertableComponent,
        boreportdetailComponent,
        // CalendarHeaderComponent,
// commentComponent,
// ChildboxComponent,
// CommentboxComponent,
// durationComponent,
// showdashboardComponent,
// BODashboardViewerComponent,
// BODashboardViewerComponent,
// workflowComponent,
// titleComponent,
// stringlistComponent,
// SignatureFieldComponent,
// PopupSelectComponent, 
// FieldBuilderComponent,
openfileComponent,
// DynamicFormBuilderComponent,
TextBoxComponent,
RadioComponent,
FileComponent,
CarditImgCompressorDirective

        //routedComponents
    ],
    exports: [
       
      ProgressSpinnerModule ,
       NgxSpinnerModule,
        SidebarModule,
        TranslateModule,
        NgScrollbarModule,
        MatTabsModule,
        PanelMenuModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        CommonModule

    ],
    imports: [
        //layoutModule,
        //
        //WebcamModule,
        FileUploadModule,
        NgCommonModule.forRoot(),
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
     
        HttpClientModule,
        //,
        //NgxIntlTelInputModule,BsDropdownModule.forRoot(),
        //InternationalPhoneModule ,
        //NgPrimeModule,
        NgbDatepickerModule,
        OverlayPanelModule,
        HttpClientModule,
        NgScrollbarModule,
        AppRoutingModule,

        // Optionally you can set time for `idle`, `timeout` and `ping` in seconds.
        // Default values: `idle` is 600 (10 minutes), `timeout` is 300 (5 minutes) 
        // and `ping` is 120 (2 minutes).
        UserIdleModule.forRoot({ idle: 6000, timeout: 3000, ping: 1200 }),


        //WebcamModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ["example.com"],
                blacklistedRoutes: ["example.com/examplebadroute/"]
            }
        }),
        // KeyboardShortcutsModule.forRoot() ,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
    //
    providers: [
        /* {
             provide: HTTP_INTERCEPTORS,
             useClass: TokenInterceptor,
             multi: true
         },*/
        Auth,
        AuthService,
       
        MessageService, DatePipe,
        AuthGuard,
        LoaderService,
        ToastService, RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService, SharedService,
        CanDeactivateGuard,
        { provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('longDate') }
    ],
    entryComponents: [
        //  ...ENTRY_COMPONENTS
    ],
    bootstrap: [AppComponent]
})
//, [APP_ROUTER_PROVIDERS]
/*
@Injectable({
    providedIn: 'root',
  })
*/
export class AppModule { }
/*
export { LoaderService } from './pages/core/services/loader.service';
export { ToastService } from './pages/core/services/toast.service';
export { RouteStateService } from './pages/core/services/route-state.service';
export { SessionService } from './pages/core/services/session.service';
export { ThemeService } from './pages/core/services/theme.service';
export { ApplicationStateService } from './pages/core/services/application-state.service';
export { UserDataService } from './pages/core/services/user-data.service'
export { UserContextService } from './pages/core/services/user-context.service';
export { MessageService } from 'primeng/dynamicdialog';
*/