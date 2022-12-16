//import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Injectable, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

import { AuthGuard } from './pages/core/gaurds/auth.gaurd';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PickListModule } from 'primeng/picklist';
import { NgbDate, NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { RippleModule } from 'primeng/ripple';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
//import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NgxCurrencyModule } from "ngx-currency";
//import { SharedService } from './service/shared.service';
import { TreeTableModule } from 'primeng/treetable';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeModule } from 'primeng/tree';
import { FieldErrorDisplayComponent } from './pages/forms/field-error-display/field-error-display.component';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { TreeNode } from 'primeng/api';
import { MenuItem } from 'primeng/api'
//import { MessageService } from 'primeng/api';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { SidebarModule } from 'primeng/sidebar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';;
import { ToolbarModule } from 'primeng/toolbar';
import { FileUpload } from 'primeng/fileupload';//FileUploadModule
import { MultiSelectModule } from 'primeng/multiselect';
import { } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
//import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginatorModule } from 'primeng/paginator';
//import { ResponsiveScrollModule } from 'p-table-responsive-scroll';
import { workflowComponent } from './custom/workflow/workflow.component';
import { actionComponent } from './custom/actions/action.component';
import { SignatureFieldComponent } from './custom/signature-field/signature-field.component';

import { LoaderService } from './pages/core/services/loader.service';
import { ToastService } from './pages/core/services/toast.service';
import { RouteStateService } from './pages/core/services/route-state.service';
import { SessionService } from './pages/core/services/session.service';
import { ThemeService } from './pages/core/services/theme.service';
import { ApplicationStateService } from './pages/core/services/application-state.service';
import { UserDataService } from './pages/core/services/user-data.service'
import { UserContextService } from './pages/core/services/user-context.service';
import { DynamicFormBuilderComponent } from './pages/forms/dynamic-form-builder/dynamic-form-builder.component';
import { FieldBuilderComponent } from './pages/forms/dynamic-form-builder/field-builder/field-builder.component';

import { CheckBoxComponent } from './pages/forms/dynamic-form-builder/atoms/checkbox';
import { DropDownComponent } from './pages/forms/dynamic-form-builder/atoms/dropdown';
import { FileComponent } from './pages/forms/dynamic-form-builder/atoms/file';
import { RadioComponent } from './pages/forms/dynamic-form-builder/atoms/radio';
import { TextBoxComponent } from './pages/forms/dynamic-form-builder/atoms/textbox';

//import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';


import { NgScrollbarModule } from 'ngx-scrollbar';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { AutoCompleteModule } from 'primeng/autocomplete';
//import { crmtatconfigurationComponent } from './pages/forms/crmtatconfiguration/crmtatconfiguration.component';
import { WebcamModule } from 'ngx-webcam';
import { CalendarFormComponent } from './pages/forms/calendarform/calendarform.component';
import { boworkflowdesignComponent } from './pages/forms/boworkflowdesign/boworkflowdesign.component';
import { CalendarHeaderComponent } from './custom/calendarview.component';
import { CalendarModule as CalendarAGModule, DateAdapter } from 'angular-calendar';// 
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
//import { boreportviewerModule } from './pages/forms/boreportviewer.module';
import { BOReportViewerComponent } from './pages/forms/boreportviewer/boreportviewer.component';
import { BODashboardViewerComponent } from './pages/forms/bodashboardviewer/bodashboardviewer.component';
import { AttachmentComponent } from './custom/attachment/attachment.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { ScrollTopModule } from "primeng/scrolltop";
import { useraccessComponent } from './custom/useraccess.component';
import { appmultipleentryComponent } from './custom/appmultipleentry.component';
import { stringlistComponent } from './custom/stringlist.component';
import { durationComponent } from './custom/duration.component';

import { titleComponent } from './custom/title.component';
import { commentComponent } from './custom/comment.component';

import { CommentboxComponent } from './custom/comments/commentbox/commentbox.component';
import { CommentsComponent } from './custom/comments/comments/comments.component';
import { ChildboxComponent } from './custom/comments/childbox/childbox.component';
import { DatacontainerDirective } from './custom/comments/comments/comments.component';
import { TabViewModule } from 'primeng/tabview';

//import { lmstaskComponent }   from './pages/forms/lmstask/lmstask.component';
import { TimerComponent } from './pages/timer/timer.component';



import { PopupSelectComponent } from './custom/popupselect.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { showdashboardComponent } from './pages/forms/bodashboardviewer/showdashboard.component';

import { FileUploadModule } from 'ng2-file-upload';

import { ReportViewerCtrlComponent } from './pages/forms/boreportviewer/reportviewerctrl.component';
import { TooltipModule } from 'primeng/tooltip';
import { SafePipe } from './service/safe.pipe';

//import { Papa } from 'ngx-papaparse';
//import { ImageViewerModule } from 'ng2-image-viewer';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';




import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressBarModule } from 'primeng/progressbar';
import { BlockableUI } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeDragDropService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { MenubarModule } from 'primeng/menubar';
import { SlideMenuModule } from 'primeng/slidemenu';

import { RouteReuseStrategy } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

import { SignaturePadModule } from 'angular2-signaturepad';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ",",
    nullable: true
};





export const ENTRY_COMPONENTS = [

];


export const routedComponents = [

];



const config: ExtraOptions = {
    useHash: true,
};
/*
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
*/
@NgModule({

    exports: [

        CommonModule,
        SignatureFieldComponent,
        SlideMenuModule,
        CascadeSelectModule,
        MenubarModule,
        PickListModule,
        ScrollTopModule,
        ContextMenuModule,
        TieredMenuModule,
        ToolbarModule,
        ProgressBarModule,
        RippleModule,
        TooltipModule,
        BlockUIModule,
        KeyFilterModule,
        InputSwitchModule,
        TriStateCheckboxModule,
        SplitButtonModule,
        AutoCompleteModule,
        InputNumberModule,
        ChipsModule,
        //lmstaskComponent,
        TabViewModule, ScrollPanelModule,
        //BrowserModule,
        //BrowserAnimationsModule,
        TimerComponent,
        showdashboardComponent,
        BODashboardViewerComponent,
        ReportViewerCtrlComponent,
        AttachmentComponent, PopupSelectComponent, useraccessComponent, durationComponent, titleComponent, commentComponent, appmultipleentryComponent,
        stringlistComponent,

        BOReportViewerComponent,
        //boreportviewerModule,
        CalendarHeaderComponent,

        CalendarFormComponent, boworkflowdesignComponent,

        FormsModule, ReactiveFormsModule, AccordionModule,
        NgbModule,
        CommonModule,
        //Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,
        RatingModule,
        SelectButtonModule, CheckboxModule, DropdownModule,
        TreeModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        RadioButtonModule,
        ToastModule,
        MegaMenuModule,
        TableModule,
        //ResponsiveScrollModule,
        MessageModule,
        CardModule,
        ChartModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarAGModule,
        CalendarModule,
        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule, PaginatorModule,
        MessagesModule, EditorModule,
        DynamicFormBuilderComponent,
        CheckBoxComponent, DropDownComponent, FileComponent, RadioComponent, TextBoxComponent,
        FieldBuilderComponent,
        RouterModule,
        //NgxIntlTelInputModule,
        durationComponent,

        //SmartTablepopupselectComponent,SmartTablepopupselectRenderComponent,
        workflowComponent,
        actionComponent,
        NgxCurrencyModule,
        SliderModule,
        NgScrollbarModule,
        FieldErrorDisplayComponent,
        //InternationalPhoneNumberModule,
        InternationalPhoneModule,
        TranslateModule,
        ////crmtatconfigurationComponent,
        WebcamModule,
        TagInputModule, ColorPickerModule,
        FileUploadModule,

        //ImageViewerModule, 
        SafePipe,
        SignaturePadModule,
        MatTabsModule
    ],
    declarations: [
        //lmstaskComponent,
        SignatureFieldComponent,
        FileUpload,
        TimerComponent,
        CommentboxComponent,
        CommentsComponent,
        ChildboxComponent,
        DatacontainerDirective,

        showdashboardComponent,
        BODashboardViewerComponent,
        ReportViewerCtrlComponent,
        PopupSelectComponent,

        AttachmentComponent, useraccessComponent, durationComponent, titleComponent, commentComponent, appmultipleentryComponent,
        stringlistComponent,
        BOReportViewerComponent,
        CalendarHeaderComponent,
        CalendarFormComponent, boworkflowdesignComponent,

        actionComponent,
        workflowComponent,
        FieldErrorDisplayComponent,
        DynamicFormBuilderComponent,
        CheckBoxComponent, DropDownComponent, FileComponent, RadioComponent, TextBoxComponent,
        FieldBuilderComponent,

        SafePipe,

    ],

    providers: [

        NFC, Ndef,
        TreeDragDropService, MessageService,
        //MessageService,
        DatePipe, AuthGuard, Pipe,
        LoaderService,
        //ToastService, 
        RouteStateService,
        SessionService,
        ThemeService, ApplicationStateService, UserDataService, UserContextService,
        DynamicDialogRef, DynamicDialogConfig, DialogService
        //SharedService
    ],

    imports: [

        CommonModule,
        LayoutModule,

        SlideMenuModule,
        CascadeSelectModule,
        MenubarModule,
        PickListModule,
        ScrollTopModule,
        ContextMenuModule,
        TieredMenuModule,
        ToolbarModule,
        ProgressBarModule,
        RippleModule,
        TooltipModule,
        BlockUIModule,
        KeyFilterModule,
        InputSwitchModule,
        TriStateCheckboxModule,
        SplitButtonModule,
        ChipsModule,
        AutoCompleteModule,
        InputNumberModule,
        ScrollPanelModule,
        TabViewModule,
        WebcamModule,
        ColorPickerModule,
        //boreportviewerModule,
        TagInputModule,
        FlatpickrModule.forRoot(),
        NgbModule,
        FormsModule, ReactiveFormsModule,
        MultiSelectModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        //NgxIntlTelInputModule,
        InternationalPhoneModule,
        CommonModule,
        //Ng2SmartTableModule,
        PanelMenuModule,
        FileUploadModule,
        MenuModule,
        TreeTableModule,
        RatingModule, SelectButtonModule, CheckboxModule, DropdownModule,
        TreeModule, AccordionModule,
        InputTextModule,
        ButtonModule,
        PanelModule,
        ToastModule,
        MegaMenuModule,
        RadioButtonModule,
        TableModule,
        //ResponsiveScrollModule,
        MessageModule,
        CardModule,
        ChartModule,
        ProgressSpinnerModule,
        OverlayPanelModule,
        BreadcrumbModule,
        CalendarModule,

        CalendarAGModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),

        SidebarModule,
        DynamicDialogModule,
        InputTextareaModule, PaginatorModule,
        MessagesModule, EditorModule,
        SliderModule, FileUploadModule,
        NgScrollbarModule,
        KeyboardShortcutsModule,

        TranslateModule,
        //ImageViewerModule, 

        SignaturePadModule,


    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        //...ENTRY_COMPONENTS,
        PopupSelectComponent,

        FieldErrorDisplayComponent, ChildboxComponent,
        //lmstaskComponent,
        TimerComponent
        //crmtatconfigurationComponent
    ],

})

@Injectable({
    providedIn: 'root',
})


export class NgCommonModule {
    static forRoot(): ModuleWithProviders<NgCommonModule> {
        return {
            ngModule: NgCommonModule,
            providers: [
                //  MessageService,
                DatePipe, AuthGuard,
                LoaderService,
                ToastService,
                RouteStateService,
                SessionService,
                ThemeService, ApplicationStateService, UserDataService, UserContextService,
                DynamicDialogRef, DynamicDialogConfig, DialogService]
        };
    }
}
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