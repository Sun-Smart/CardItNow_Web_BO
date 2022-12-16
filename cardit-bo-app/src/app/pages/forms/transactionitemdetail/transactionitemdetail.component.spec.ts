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

import * as jsonData from './transactionitemdetail.json';

import { transactionitemdetailComponent } from './transactionitemdetail.component';
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
        console.log('%c Toast transactionitemdetail ' + message_detail, 'background: #fff; color: red');
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
describe('transactionitemdetailComponent', () => {

    let component: transactionitemdetailComponent;
    let fixture: ComponentFixture<transactionitemdetailComponent>;
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
            declarations: [transactionitemdetailComponent],
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
            fixture = TestBed.createComponent(transactionitemdetailComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c transactionitemdetailComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c transactionitemdetail fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c transactionitemdetailComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c transactionitemdetail checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c transactionitemdetail transactiondetailid_List ' + component.transactiondetailid_List?.length + '', strCSS);
        console.log('%c transactionitemdetail transactionid_List ' + component.transactionid_List?.length + '', strCSS);
        console.log('%c transactionitemdetail uid_List ' + component.uid_List?.length + '', strCSS);
        console.log('%c transactionitemdetail recipientuid_List ' + component.recipientuid_List?.length + '', strCSS);
        console.log('%c transactionitemdetail payid_List ' + component.payid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c transactionitemdetail jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  transactionitemdetail JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionitemdetailid) component.transactionitemdetail_Form.controls.transactionitemdetailid.setValue((json as any)[0].transactionitemdetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactiondetailid) component.transactionitemdetail_Form.controls.transactiondetailid.setValue((json as any)[0].transactiondetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionid) component.transactionitemdetail_Form.controls.transactionid.setValue((json as any)[0].transactionid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.transactionitemdetail_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientuid) component.transactionitemdetail_Form.controls.recipientuid.setValue((json as any)[0].recipientuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientid) component.transactionitemdetail_Form.controls.recipientid.setValue((json as any)[0].recipientid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].payid) component.transactionitemdetail_Form.controls.payid.setValue((json as any)[0].payid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].av) component.transactionitemdetail_Form.controls.av.setValue((json as any)[0].av);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].period) component.transactionitemdetail_Form.controls.period.setValue((json as any)[0].period);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].basic) component.transactionitemdetail_Form.controls.basic.setValue((json as any)[0].basic);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dp) component.transactionitemdetail_Form.controls.dp.setValue((json as any)[0].dp);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].netbasic) component.transactionitemdetail_Form.controls.netbasic.setValue((json as any)[0].netbasic);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sef) component.transactionitemdetail_Form.controls.sef.setValue((json as any)[0].sef);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sdp) component.transactionitemdetail_Form.controls.sdp.setValue((json as any)[0].sdp);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].netsef) component.transactionitemdetail_Form.controls.netsef.setValue((json as any)[0].netsef);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].total) component.transactionitemdetail_Form.controls.total.setValue((json as any)[0].total);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.transactionitemdetail_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.transactionitemdetail_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.transactionitemdetail_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  transactionitemdetail Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  transactionitemdetail Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.transactionitemdetail.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  transactionitemdetail Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.transactionitemdetail_Form.controls.transactiondetailid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  transactionitemdetail -----------------------------------', strCSS);

    });

});
