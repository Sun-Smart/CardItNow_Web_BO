//import {NgCommonModule} from '../../../../../../n-tire-cams-app/src/app/appcommon.module';;;
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { TokenInterceptor } from '../../../n-tire-bo-app/src/app/auth/token.interceptor';
import { AuthService } from './auth/auth.service';

import { BsDropdownModule } from "ngx-bootstrap";
import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

//
import {MatTabsModule} from '@angular/material/tabs';
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

//import { HeaderBreadcrumbComponent } from '../../../n-tire-bo-app/src/app/pages/layout/header-breadcrumb/header-breadcrumb.component';

import { UserIdleModule } from 'angular-user-idle';
import { ThemeService } from './pages/core/services/theme.service';
import { ApplicationStateService } from './pages/core/services/application-state.service';
import { UserDataService } from './pages/core/services/user-data.service'
//import { MenuDataService } from '../../../n-tire-bo-app/src/app/pages/core/services/menu-data.service';

/*import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';*/

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
import { ExceptionService } from './service/exception.service';

import { NgCommonModule } from './appcommon.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JwtModule } from "@auth0/angular-jwt";
//import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CheckboxModule } from 'primeng/checkbox';

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
        HeaderComponent, FooterComponent,
        LayoutComponent,
        MenuComponent,
        //routedComponents
    ],
    exports: [
        NgCommonModule,
        //LoginComponent,
        NgScrollbarModule,
        HeaderComponent, FooterComponent, LayoutComponent
    ],
    imports: [
        CheckboxModule,
        //layoutModule,
        //
        //WebcamModule,
        NgCommonModule.forRoot(),
        NgbModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
        //,
        //NgxIntlTelInputModule,BsDropdownModule.forRoot(),
        //InternationalPhoneModule ,
        //NgPrimeModule,
        MatTabsModule,
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //
    providers: [
        /* {
             provide: HTTP_INTERCEPTORS,
             useClass: TokenInterceptor,
             multi: true
         },
         */
        Auth,
        AuthService,
        MessageService, DatePipe,
        AuthGuard,
        LoaderService,
        ToastService, RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService, SharedService, ExceptionService,
        CanDeactivateGuard,
        { provide: NgbDateParserFormatter, useFactory: () => new CustomNgbDateParserFormatter('longDate') }
    ],
    entryComponents: [
        //  ...ENTRY_COMPONENTS
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

/*
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/