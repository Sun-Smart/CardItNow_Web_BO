//import 'zone.js/dist/zone-testing';
//import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { waitForAsync } from '@angular/core/testing';

import { async, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
//import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateMockModule } from '@hetznercloud/ngx-translate-mock';
import { RouterTestingModule } from '@angular/router/testing';


import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

import { AppModule } from '../../../app.module';
import { NgPrimeModule } from '../../../app.layout.module';

import * as jsonData from './boreport.json';

import { boreportComponent } from './boreport.component';
//import { boreportdetailComponent } from '../boreportdetail/boreportdetail.component';
//import { boreportothertableComponent } from '../boreportothertable/boreportothertable.component';
//import { boreportcolumnComponent } from '../boreportcolumn/boreportcolumn.component';
import { AuthService } from '../../../auth/auth.service';
import { SharedService } from '../../../service/shared.service';
import { UserContextService } from '../../../pages/core/services/user-context.service';
import { MessageService } from 'primeng/api';
import { setupMaster } from 'cluster';

class MockMessageService extends MessageService {

    messages: any[] = [];
    add(message: any) {
        this.messages.push(message);
        let message_detail = message.summary + ' : ' + message.detail;
        console.log('%c Toast boreport ' + message_detail, 'background: #fff; color: red');
    }
    get() {
        return (this.messages.length == 0) ? '' : this.messages[this.messages.length - 1].detail;
    }
}
/*
export function async(specFunc) {
  return (done) => {
      specFunc().then(() => {
          done();
      }).catch((error) => {
          done.fail(error);
      });
  };
}
*/
describe('boreportComponent', () => {

    let component: boreportComponent;
    let fixture: ComponentFixture<boreportComponent>;
    let element;

    let AuthServiceSpy: SpyObj<AuthService>;

    let UserContextServiceSpy: SpyObj<UserContextService>;
    let MessageServiceSpy: SpyObj<MessageService>;
    let _MockMessageService: MockMessageService = new MockMessageService();
    let token = "";
    let lastmessage = ''
    //let log=''
    let strCSSheader = 'background: #222; color: #bada55';
    let strCSS = 'background: #fff;color: #3778c2';

    let index_boreportdetail = 1;
    let index_boreportothertable = 2;
    let index_boreportcolumn = 3;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [boreportComponent],
            providers: [SharedService,
                { provide: AuthService, useValue: AuthServiceSpy }, { provide: MessageService, useValue: _MockMessageService }, { provide: UserContextService, useValue: UserContextServiceSpy },
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
        token = TestBed.get(SharedService).token;
        AuthServiceSpy.getToken.and.returnValue(token);

        spyOn(window, 'confirm').and.returnValue(true);
        if (component == undefined) {
            if (token == "") {
                token = TestBed.get(SharedService).token;
                AuthServiceSpy.getToken.and.returnValue(token);
            }
            fixture = TestBed.createComponent(boreportComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boreportComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boreport fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boreportComponent true', strCSS);
    });
    it('boreportdetail functionality', () => {

        console.log('%c ' + index_boreportdetail + ' boreport boreportdetail dialog', strCSSheader);
        console.log('%c  ' + index_boreportdetail + '  boreport boreportdetail+ clicking the add and edit button', strCSS);
        component.AddOrEdit_boreportdetail(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_boreportdetail + ' boreport boreportdetail+ checking the existence of the boreportdetail dialog', strCSS);
        let obj = document.getElementsByTagName('app-boreportdetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_boreportdetail + ' boreport boreportdetail obj ' + obj.length, strCSS);
        console.log('%c  ' + index_boreportdetail + ' boreport boreportdetail pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_boreportdetail + ' boreport boreportdetail clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-boreportdetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_boreportdetail + ' boreport boreportdetail obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_boreportdetail + ' boreport boreportdetail pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('boreportothertable functionality', () => {

        console.log('%c ' + index_boreportothertable + ' boreport boreportothertable dialog', strCSSheader);
        console.log('%c  ' + index_boreportothertable + '  boreport boreportothertable+ clicking the add and edit button', strCSS);
        component.AddOrEdit_boreportothertable(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_boreportothertable + ' boreport boreportothertable+ checking the existence of the boreportothertable dialog', strCSS);
        let obj = document.getElementsByTagName('app-boreportothertable') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_boreportothertable + ' boreport boreportothertable obj ' + obj.length, strCSS);
        console.log('%c  ' + index_boreportothertable + ' boreport boreportothertable pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_boreportothertable + ' boreport boreportothertable clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-boreportothertable') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_boreportothertable + ' boreport boreportothertable obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_boreportothertable + ' boreport boreportothertable pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('boreportcolumn functionality', () => {

        console.log('%c ' + index_boreportcolumn + ' boreport boreportcolumn dialog', strCSSheader);
        console.log('%c  ' + index_boreportcolumn + '  boreport boreportcolumn+ clicking the add and edit button', strCSS);
        component.AddOrEdit_boreportcolumn(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_boreportcolumn + ' boreport boreportcolumn+ checking the existence of the boreportcolumn dialog', strCSS);
        let obj = document.getElementsByTagName('app-boreportcolumn') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_boreportcolumn + ' boreport boreportcolumn obj ' + obj.length, strCSS);
        console.log('%c  ' + index_boreportcolumn + ' boreport boreportcolumn pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_boreportcolumn + ' boreport boreportcolumn clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-boreportcolumn') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_boreportcolumn + ' boreport boreportcolumn obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_boreportcolumn + ' boreport boreportcolumn pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c boreport checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boreport reportmodule_List ' + component.reportmodule_List?.length + '', strCSS);
        console.log('%c boreport reporttype_List ' + component.reporttype_List?.length + '', strCSS);
        console.log('%c boreport sidefiltertype_List ' + component.sidefiltertype_List?.length + '', strCSS);
        console.log('%c boreport datefiltertype_List ' + component.datefiltertype_List?.length + '', strCSS);
        console.log('%c boreport groupbyrelationship_List ' + component.groupbyrelationship_List?.length + '', strCSS);
        console.log('%c boreport jointype_List ' + component.jointype_List?.length + '', strCSS);
        console.log('%c boreport reportoutputtype_List ' + component.reportoutputtype_List?.length + '', strCSS);
        console.log('%c boreport viewhtmltype_List ' + component.viewhtmltype_List?.length + '', strCSS);
        console.log('%c boreport workflowhtmltype_List ' + component.workflowhtmltype_List?.length + '', strCSS);
        console.log('%c boreport recordtype_List ' + component.recordtype_List?.length + '', strCSS);
        console.log('%c boreport dashboardid_List ' + component.dashboardid_List?.length + '', strCSS);
        console.log('%c boreport schedule_List ' + component.schedule_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boreport jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boreport JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportid) component.boreport_Form.controls.reportid.setValue((json as any)[0].reportid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportcode) component.boreport_Form.controls.reportcode.setValue((json as any)[0].reportcode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportname) component.boreport_Form.controls.reportname.setValue((json as any)[0].reportname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportmodule) component.boreport_Form.controls.reportmodule.setValue((json as any)[0].reportmodule);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].actionkey) component.boreport_Form.controls.actionkey.setValue((json as any)[0].actionkey);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reporttype) component.boreport_Form.controls.reporttype.setValue((json as any)[0].reporttype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].columns) component.boreport_Form.controls.columns.setValue((json as any)[0].columns);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sidefilter) component.boreport_Form.controls.sidefilter.setValue((json as any)[0].sidefilter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sidefiltertype) component.boreport_Form.controls.sidefiltertype.setValue((json as any)[0].sidefiltertype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sidefilters) component.boreport_Form.controls.sidefilters.setValue((json as any)[0].sidefilters);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].maintablename) component.boreport_Form.controls.maintablename.setValue((json as any)[0].maintablename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].maintablealias) component.boreport_Form.controls.maintablealias.setValue((json as any)[0].maintablealias);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].maintableidentityfield) component.boreport_Form.controls.maintableidentityfield.setValue((json as any)[0].maintableidentityfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].pk) component.boreport_Form.controls.pk.setValue((json as any)[0].pk);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].query) component.boreport_Form.controls.query.setValue((json as any)[0].query);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].wherecondition) component.boreport_Form.controls.wherecondition.setValue((json as any)[0].wherecondition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cardtype) component.boreport_Form.controls.cardtype.setValue((json as any)[0].cardtype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].html) component.boreport_Form.controls.html.setValue((json as any)[0].html);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].calendar) component.boreport_Form.controls.calendar.setValue((json as any)[0].calendar);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kanbanview) component.boreport_Form.controls.kanbanview.setValue((json as any)[0].kanbanview);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].kanbankey) component.boreport_Form.controls.kanbankey.setValue((json as any)[0].kanbankey);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].datefilter) component.boreport_Form.controls.datefilter.setValue((json as any)[0].datefilter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].datefiltercolumnname) component.boreport_Form.controls.datefiltercolumnname.setValue((json as any)[0].datefiltercolumnname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].datefiltertype) component.boreport_Form.controls.datefiltertype.setValue((json as any)[0].datefiltertype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupby) component.boreport_Form.controls.groupby.setValue((json as any)[0].groupby);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupbytext) component.boreport_Form.controls.groupbytext.setValue((json as any)[0].groupbytext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupby2) component.boreport_Form.controls.groupby2.setValue((json as any)[0].groupby2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupby2text) component.boreport_Form.controls.groupby2text.setValue((json as any)[0].groupby2text);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupbyrelationship) component.boreport_Form.controls.groupbyrelationship.setValue((json as any)[0].groupbyrelationship);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sortby1) component.boreport_Form.controls.sortby1.setValue((json as any)[0].sortby1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sortby2) component.boreport_Form.controls.sortby2.setValue((json as any)[0].sortby2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sortby3) component.boreport_Form.controls.sortby3.setValue((json as any)[0].sortby3);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parentid) component.boreport_Form.controls.parentid.setValue((json as any)[0].parentid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parentdescription) component.boreport_Form.controls.parentdescription.setValue((json as any)[0].parentdescription);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtablename) component.boreport_Form.controls.detailtablename.setValue((json as any)[0].detailtablename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtablealias) component.boreport_Form.controls.detailtablealias.setValue((json as any)[0].detailtablealias);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].jointype) component.boreport_Form.controls.jointype.setValue((json as any)[0].jointype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtableidentityfield) component.boreport_Form.controls.detailtableidentityfield.setValue((json as any)[0].detailtableidentityfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtablefk) component.boreport_Form.controls.detailtablefk.setValue((json as any)[0].detailtablefk);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtableconcatenate) component.boreport_Form.controls.detailtableconcatenate.setValue((json as any)[0].detailtableconcatenate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtableheader) component.boreport_Form.controls.detailtableheader.setValue((json as any)[0].detailtableheader);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtablefooter) component.boreport_Form.controls.detailtablefooter.setValue((json as any)[0].detailtablefooter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].detailtablequery) component.boreport_Form.controls.detailtablequery.setValue((json as any)[0].detailtablequery);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].masterdetailwhere) component.boreport_Form.controls.masterdetailwhere.setValue((json as any)[0].masterdetailwhere);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].numrows) component.boreport_Form.controls.numrows.setValue((json as any)[0].numrows);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportoutputtype) component.boreport_Form.controls.reportoutputtype.setValue((json as any)[0].reportoutputtype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].noheader) component.boreport_Form.controls.noheader.setValue((json as any)[0].noheader);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header) component.boreport_Form.controls.header.setValue((json as any)[0].header);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer) component.boreport_Form.controls.footer.setValue((json as any)[0].footer);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery) component.boreport_Form.controls.headerquery.setValue((json as any)[0].headerquery);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery) component.boreport_Form.controls.footerquery.setValue((json as any)[0].footerquery);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery1) component.boreport_Form.controls.headerquery1.setValue((json as any)[0].headerquery1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery1) component.boreport_Form.controls.footerquery1.setValue((json as any)[0].footerquery1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery2) component.boreport_Form.controls.headerquery2.setValue((json as any)[0].headerquery2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery2) component.boreport_Form.controls.footerquery2.setValue((json as any)[0].footerquery2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery3) component.boreport_Form.controls.headerquery3.setValue((json as any)[0].headerquery3);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery3) component.boreport_Form.controls.footerquery3.setValue((json as any)[0].footerquery3);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery4) component.boreport_Form.controls.headerquery4.setValue((json as any)[0].headerquery4);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery4) component.boreport_Form.controls.footerquery4.setValue((json as any)[0].footerquery4);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].headerquery5) component.boreport_Form.controls.headerquery5.setValue((json as any)[0].headerquery5);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footerquery5) component.boreport_Form.controls.footerquery5.setValue((json as any)[0].footerquery5);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header1) component.boreport_Form.controls.header1.setValue((json as any)[0].header1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer1) component.boreport_Form.controls.footer1.setValue((json as any)[0].footer1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header2) component.boreport_Form.controls.header2.setValue((json as any)[0].header2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer2) component.boreport_Form.controls.footer2.setValue((json as any)[0].footer2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header3) component.boreport_Form.controls.header3.setValue((json as any)[0].header3);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer3) component.boreport_Form.controls.footer3.setValue((json as any)[0].footer3);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header4) component.boreport_Form.controls.header4.setValue((json as any)[0].header4);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer4) component.boreport_Form.controls.footer4.setValue((json as any)[0].footer4);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header5) component.boreport_Form.controls.header5.setValue((json as any)[0].header5);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer5) component.boreport_Form.controls.footer5.setValue((json as any)[0].footer5);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boreport_Form.controls.status.setValue((json as any)[0].status);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].css) component.boreport_Form.controls.css.setValue((json as any)[0].css);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].viewhtmltype) component.boreport_Form.controls.viewhtmltype.setValue((json as any)[0].viewhtmltype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].viewhtml) component.boreport_Form.controls.viewhtml.setValue((json as any)[0].viewhtml);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].viewcss) component.boreport_Form.controls.viewcss.setValue((json as any)[0].viewcss);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reporthtml) component.boreport_Form.controls.reporthtml.setValue((json as any)[0].reporthtml);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowhtmltype) component.boreport_Form.controls.workflowhtmltype.setValue((json as any)[0].workflowhtmltype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowhtml) component.boreport_Form.controls.workflowhtml.setValue((json as any)[0].workflowhtml);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].component) component.boreport_Form.controls.component.setValue((json as any)[0].component);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].alternateview) component.boreport_Form.controls.alternateview.setValue((json as any)[0].alternateview);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recordtype) component.boreport_Form.controls.recordtype.setValue((json as any)[0].recordtype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].userfield) component.boreport_Form.controls.userfield.setValue((json as any)[0].userfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].employeefield) component.boreport_Form.controls.employeefield.setValue((json as any)[0].employeefield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].userfiltertype) component.boreport_Form.controls.userfiltertype.setValue((json as any)[0].userfiltertype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].rolefield) component.boreport_Form.controls.rolefield.setValue((json as any)[0].rolefield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboardid) component.boreport_Form.controls.dashboardid.setValue((json as any)[0].dashboardid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tableheader) component.boreport_Form.controls.tableheader.setValue((json as any)[0].tableheader);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportjsondata) component.boreport_Form.controls.reportjsondata.setValue((json as any)[0].reportjsondata);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].helptext) component.boreport_Form.controls.helptext.setValue((json as any)[0].helptext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].filters) component.boreport_Form.controls.filters.setValue((json as any)[0].filters);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].filtercolumns) component.boreport_Form.controls.filtercolumns.setValue((json as any)[0].filtercolumns);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupbyfooter) component.boreport_Form.controls.groupbyfooter.setValue((json as any)[0].groupbyfooter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].email) component.boreport_Form.controls.email.setValue((json as any)[0].email);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].schedule) component.boreport_Form.controls.schedule.setValue((json as any)[0].schedule);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].nextschedule) component.boreport_Form.controls.nextschedule.setValue((json as any)[0].nextschedule);
        debugger;
        console.log('%c  boreport Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boreport Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boreport.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boreport Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boreport_Form.controls.reportcode.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boreport -----------------------------------', strCSS);

    });

});
