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

import * as jsonData from './bodashboard.json';

import { bodashboardComponent } from './bodashboard.component';
//import { bodashboarddetailComponent } from '../bodashboarddetail/bodashboarddetail.component';
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
        console.log('%c Toast bodashboard ' + message_detail, 'background: #fff; color: red');
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
describe('bodashboardComponent', () => {

    let component: bodashboardComponent;
    let fixture: ComponentFixture<bodashboardComponent>;
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

    let index_bodashboarddetail = 1;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [bodashboardComponent],
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
            fixture = TestBed.createComponent(bodashboardComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c bodashboardComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c bodashboard fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c bodashboardComponent true', strCSS);
    });
    it('bodashboarddetail functionality', () => {

        console.log('%c ' + index_bodashboarddetail + ' bodashboard bodashboarddetail dialog', strCSSheader);
        console.log('%c  ' + index_bodashboarddetail + '  bodashboard bodashboarddetail+ clicking the add and edit button', strCSS);
        component.AddOrEdit_bodashboarddetail(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_bodashboarddetail + ' bodashboard bodashboarddetail+ checking the existence of the bodashboarddetail dialog', strCSS);
        let obj = document.getElementsByTagName('app-bodashboarddetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_bodashboarddetail + ' bodashboard bodashboarddetail obj ' + obj.length, strCSS);
        console.log('%c  ' + index_bodashboarddetail + ' bodashboard bodashboarddetail pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_bodashboarddetail + ' bodashboard bodashboarddetail clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-bodashboarddetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_bodashboarddetail + ' bodashboard bodashboarddetail obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_bodashboarddetail + ' bodashboard bodashboarddetail pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c bodashboard checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c bodashboard dashboardid_List ' + component.dashboardid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c bodashboard jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  bodashboard JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboardid) component.bodashboard_Form.controls.dashboardid.setValue((json as any)[0].dashboardid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboardname) component.bodashboard_Form.controls.dashboardname.setValue((json as any)[0].dashboardname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].rows) component.bodashboard_Form.controls.rows.setValue((json as any)[0].rows);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cols) component.bodashboard_Form.controls.cols.setValue((json as any)[0].cols);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].design) component.bodashboard_Form.controls.design.setValue((json as any)[0].design);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].remarks) component.bodashboard_Form.controls.remarks.setValue((json as any)[0].remarks);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].userid) component.bodashboard_Form.controls.userid.setValue((json as any)[0].userid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].module) component.bodashboard_Form.controls.module.setValue((json as any)[0].module);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].helptext) component.bodashboard_Form.controls.helptext.setValue((json as any)[0].helptext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.bodashboard_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  bodashboard Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  bodashboard Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.bodashboard.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  bodashboard Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.bodashboard_Form.controls.dashboardname.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  bodashboard -----------------------------------', strCSS);

    });

});
