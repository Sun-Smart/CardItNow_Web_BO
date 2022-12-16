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

import * as jsonData from './transactiondetail.json';

import { transactiondetailComponent } from './transactiondetail.component';
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
        console.log('%c Toast transactiondetail ' + message_detail, 'background: #fff; color: red');
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
describe('transactiondetailComponent', () => {

    let component: transactiondetailComponent;
    let fixture: ComponentFixture<transactiondetailComponent>;
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
            declarations: [transactiondetailComponent],
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
            fixture = TestBed.createComponent(transactiondetailComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c transactiondetailComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c transactiondetail fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c transactiondetailComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c transactiondetail checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c transactiondetail transactionid_List ' + component.transactionid_List?.length + '', strCSS);
        console.log('%c transactiondetail uid_List ' + component.uid_List?.length + '', strCSS);
        console.log('%c transactiondetail recipientuid_List ' + component.recipientuid_List?.length + '', strCSS);
        console.log('%c transactiondetail payid_List ' + component.payid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c transactiondetail jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  transactiondetail JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactiondetailid) component.transactiondetail_Form.controls.transactiondetailid.setValue((json as any)[0].transactiondetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionid) component.transactiondetail_Form.controls.transactionid.setValue((json as any)[0].transactionid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.transactiondetail_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientuid) component.transactiondetail_Form.controls.recipientuid.setValue((json as any)[0].recipientuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientid) component.transactiondetail_Form.controls.recipientid.setValue((json as any)[0].recipientid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].payid) component.transactiondetail_Form.controls.payid.setValue((json as any)[0].payid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactiondate) component.transactiondetail_Form.controls.transactiondate.setValue((json as any)[0].transactiondate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionamount) component.transactiondetail_Form.controls.transactionamount.setValue((json as any)[0].transactionamount);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].remarks) component.transactiondetail_Form.controls.remarks.setValue((json as any)[0].remarks);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].acquirername) component.transactiondetail_Form.controls.acquirername.setValue((json as any)[0].acquirername);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionconfirmnumber) component.transactiondetail_Form.controls.transactionconfirmnumber.setValue((json as any)[0].transactionconfirmnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].processedon) component.transactiondetail_Form.controls.processedon.setValue((json as any)[0].processedon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].processedamount) component.transactiondetail_Form.controls.processedamount.setValue((json as any)[0].processedamount);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].acquirercharges) component.transactiondetail_Form.controls.acquirercharges.setValue((json as any)[0].acquirercharges);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].amountrecipient) component.transactiondetail_Form.controls.amountrecipient.setValue((json as any)[0].amountrecipient);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].carditcharges) component.transactiondetail_Form.controls.carditcharges.setValue((json as any)[0].carditcharges);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientprocessdate) component.transactiondetail_Form.controls.recipientprocessdate.setValue((json as any)[0].recipientprocessdate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientprocesscode) component.transactiondetail_Form.controls.recipientprocesscode.setValue((json as any)[0].recipientprocesscode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].carditprocessdate) component.transactiondetail_Form.controls.carditprocessdate.setValue((json as any)[0].carditprocessdate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].carditprocesscode) component.transactiondetail_Form.controls.carditprocesscode.setValue((json as any)[0].carditprocesscode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.transactiondetail_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.transactiondetail_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.transactiondetail_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  transactiondetail Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  transactiondetail Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.transactiondetail.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  transactiondetail Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.transactiondetail_Form.controls.transactionid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  transactiondetail -----------------------------------', strCSS);

    });

});
