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

import * as jsonData from './transactionmaster.json';

import { transactionmasterComponent } from './transactionmaster.component';
//import { transactiondetailComponent } from '../transactiondetail/transactiondetail.component';
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
        console.log('%c Toast transactionmaster ' + message_detail, 'background: #fff; color: red');
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
describe('transactionmasterComponent', () => {

    let component: transactionmasterComponent;
    let fixture: ComponentFixture<transactionmasterComponent>;
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

    let index_transactiondetail = 1;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [transactionmasterComponent],
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
            fixture = TestBed.createComponent(transactionmasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c transactionmasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c transactionmaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c transactionmasterComponent true', strCSS);
    });
    it('transactiondetail functionality', () => {

        console.log('%c ' + index_transactiondetail + ' transactionmaster transactiondetail dialog', strCSSheader);
        console.log('%c  ' + index_transactiondetail + '  transactionmaster transactiondetail+ clicking the add and edit button', strCSS);
        component.AddOrEdit_transactiondetail(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_transactiondetail + ' transactionmaster transactiondetail+ checking the existence of the transactiondetail dialog', strCSS);
        let obj = document.getElementsByTagName('app-transactiondetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_transactiondetail + ' transactionmaster transactiondetail obj ' + obj.length, strCSS);
        console.log('%c  ' + index_transactiondetail + ' transactionmaster transactiondetail pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_transactiondetail + ' transactionmaster transactiondetail clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-transactiondetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_transactiondetail + ' transactionmaster transactiondetail obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_transactiondetail + ' transactionmaster transactiondetail pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c transactionmaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c transactionmaster uid_List ' + component.uid_List?.length + '', strCSS);
        console.log('%c transactionmaster recipientuid_List ' + component.recipientuid_List?.length + '', strCSS);
        console.log('%c transactionmaster transactiontype_List ' + component.transactiontype_List?.length + '', strCSS);
        console.log('%c transactionmaster payid_List ' + component.payid_List?.length + '', strCSS);
        console.log('%c transactionmaster paytype_List ' + component.paytype_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c transactionmaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  transactionmaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactionid) component.transactionmaster_Form.controls.transactionid.setValue((json as any)[0].transactionid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.transactionmaster_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientuid) component.transactionmaster_Form.controls.recipientuid.setValue((json as any)[0].recipientuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientid) component.transactionmaster_Form.controls.recipientid.setValue((json as any)[0].recipientid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].transactiontype) component.transactionmaster_Form.controls.transactiontype.setValue((json as any)[0].transactiontype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientname) component.transactionmaster_Form.controls.recipientname.setValue((json as any)[0].recipientname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].documentnumber) component.transactionmaster_Form.controls.documentnumber.setValue((json as any)[0].documentnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].additionaldocumentnumber) component.transactionmaster_Form.controls.additionaldocumentnumber.setValue((json as any)[0].additionaldocumentnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].startdate) component.transactionmaster_Form.controls.startdate.setValue((json as any)[0].startdate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].expirydate) component.transactionmaster_Form.controls.expirydate.setValue((json as any)[0].expirydate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].address) component.transactionmaster_Form.controls.address.setValue((json as any)[0].address);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].billdate) component.transactionmaster_Form.controls.billdate.setValue((json as any)[0].billdate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].contractamount) component.transactionmaster_Form.controls.contractamount.setValue((json as any)[0].contractamount);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].discount) component.transactionmaster_Form.controls.discount.setValue((json as any)[0].discount);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].carditconvfee) component.transactionmaster_Form.controls.carditconvfee.setValue((json as any)[0].carditconvfee);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].payamount) component.transactionmaster_Form.controls.payamount.setValue((json as any)[0].payamount);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].payid) component.transactionmaster_Form.controls.payid.setValue((json as any)[0].payid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].paytype) component.transactionmaster_Form.controls.paytype.setValue((json as any)[0].paytype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.transactionmaster_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.transactionmaster_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.transactionmaster_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  transactionmaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  transactionmaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.transactionmaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  transactionmaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.transactionmaster_Form.controls.uid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  transactionmaster -----------------------------------', strCSS);

    });

});
