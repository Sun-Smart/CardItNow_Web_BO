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

import * as jsonData from './bodashboarddetail.json';

import { bodashboarddetailComponent } from './bodashboarddetail.component';
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
        console.log('%c Toast bodashboarddetail ' + message_detail, 'background: #fff; color: red');
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
describe('bodashboarddetailComponent', () => {

    let component: bodashboarddetailComponent;
    let fixture: ComponentFixture<bodashboarddetailComponent>;
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

    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [bodashboarddetailComponent],
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
            fixture = TestBed.createComponent(bodashboarddetailComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c bodashboarddetailComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c bodashboarddetail fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c bodashboarddetailComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c bodashboarddetail checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c bodashboarddetail dashboardid_List ' + component.dashboardid_List?.length + '', strCSS);
        console.log('%c bodashboarddetail charttype_List ' + component.charttype_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter1type_List ' + component.parameter1type_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter1datetype_List ' + component.parameter1datetype_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter2type_List ' + component.parameter2type_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter2datetype_List ' + component.parameter2datetype_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter3type_List ' + component.parameter3type_List?.length + '', strCSS);
        console.log('%c bodashboarddetail parameter3datetype_List ' + component.parameter3datetype_List?.length + '', strCSS);
        console.log('%c bodashboarddetail menuid_List ' + component.menuid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c bodashboarddetail jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  bodashboarddetail JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboarddetailid) component.bodashboarddetail_Form.controls.dashboarddetailid.setValue((json as any)[0].dashboarddetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboardid) component.bodashboarddetail_Form.controls.dashboardid.setValue((json as any)[0].dashboardid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dashboardname) component.bodashboarddetail_Form.controls.dashboardname.setValue((json as any)[0].dashboardname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].title) component.bodashboarddetail_Form.controls.title.setValue((json as any)[0].title);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].row) component.bodashboarddetail_Form.controls.row.setValue((json as any)[0].row);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].col) component.bodashboarddetail_Form.controls.col.setValue((json as any)[0].col);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].charttype) component.bodashboarddetail_Form.controls.charttype.setValue((json as any)[0].charttype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tablename) component.bodashboarddetail_Form.controls.tablename.setValue((json as any)[0].tablename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recordname) component.bodashboarddetail_Form.controls.recordname.setValue((json as any)[0].recordname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter) component.bodashboarddetail_Form.controls.parameter.setValue((json as any)[0].parameter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].name) component.bodashboarddetail_Form.controls.name.setValue((json as any)[0].name);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].value) component.bodashboarddetail_Form.controls.value.setValue((json as any)[0].value);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter1variable) component.bodashboarddetail_Form.controls.parameter1variable.setValue((json as any)[0].parameter1variable);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter1type) component.bodashboarddetail_Form.controls.parameter1type.setValue((json as any)[0].parameter1type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter1datetype) component.bodashboarddetail_Form.controls.parameter1datetype.setValue((json as any)[0].parameter1datetype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter2variable) component.bodashboarddetail_Form.controls.parameter2variable.setValue((json as any)[0].parameter2variable);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter2type) component.bodashboarddetail_Form.controls.parameter2type.setValue((json as any)[0].parameter2type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter2datetype) component.bodashboarddetail_Form.controls.parameter2datetype.setValue((json as any)[0].parameter2datetype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter3variable) component.bodashboarddetail_Form.controls.parameter3variable.setValue((json as any)[0].parameter3variable);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter3type) component.bodashboarddetail_Form.controls.parameter3type.setValue((json as any)[0].parameter3type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parameter3datetype) component.bodashboarddetail_Form.controls.parameter3datetype.setValue((json as any)[0].parameter3datetype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].backgroundcolor) component.bodashboarddetail_Form.controls.backgroundcolor.setValue((json as any)[0].backgroundcolor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].hoverbackgroundcolor) component.bodashboarddetail_Form.controls.hoverbackgroundcolor.setValue((json as any)[0].hoverbackgroundcolor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].bordercolor) component.bodashboarddetail_Form.controls.bordercolor.setValue((json as any)[0].bordercolor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].menuid) component.bodashboarddetail_Form.controls.menuid.setValue((json as any)[0].menuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportid) component.bodashboarddetail_Form.controls.reportid.setValue((json as any)[0].reportid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].helptext) component.bodashboarddetail_Form.controls.helptext.setValue((json as any)[0].helptext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.bodashboarddetail_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  bodashboarddetail Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  bodashboarddetail Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.bodashboarddetail.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  bodashboarddetail Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.bodashboarddetail_Form.controls.dashboardid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  bodashboarddetail -----------------------------------', strCSS);

    });

});
