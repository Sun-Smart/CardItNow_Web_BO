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

import * as jsonData from './initiatorrecipientprivate.json';

import { initiatorrecipientprivateComponent } from './initiatorrecipientprivate.component';
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
        console.log('%c Toast initiatorrecipientprivate ' + message_detail, 'background: #fff; color: red');
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
describe('initiatorrecipientprivateComponent', () => {

    let component: initiatorrecipientprivateComponent;
    let fixture: ComponentFixture<initiatorrecipientprivateComponent>;
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
            declarations: [initiatorrecipientprivateComponent],
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
            fixture = TestBed.createComponent(initiatorrecipientprivateComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c initiatorrecipientprivateComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c initiatorrecipientprivate fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c initiatorrecipientprivateComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c initiatorrecipientprivate checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c initiatorrecipientprivate customerid_List ' + component.customerid_List?.length + '', strCSS);
        console.log('%c initiatorrecipientprivate uid_List ' + component.uid_List?.length + '', strCSS);
        console.log('%c initiatorrecipientprivate type_List ' + component.type_List?.length + '', strCSS);
        console.log('%c initiatorrecipientprivate geoid_List ' + component.geoid_List?.length + '', strCSS);
        console.log('%c initiatorrecipientprivate cityid_List ' + component.cityid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c initiatorrecipientprivate jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  initiatorrecipientprivate JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].privateid) component.initiatorrecipientprivate_Form.controls.privateid.setValue((json as any)[0].privateid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerid) component.initiatorrecipientprivate_Form.controls.customerid.setValue((json as any)[0].customerid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.initiatorrecipientprivate_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].type) component.initiatorrecipientprivate_Form.controls.type.setValue((json as any)[0].type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].firstname) component.initiatorrecipientprivate_Form.controls.firstname.setValue((json as any)[0].firstname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].lastname) component.initiatorrecipientprivate_Form.controls.lastname.setValue((json as any)[0].lastname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].email) component.initiatorrecipientprivate_Form.controls.email.setValue((json as any)[0].email);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].mobile) component.initiatorrecipientprivate_Form.controls.mobile.setValue((json as any)[0].mobile);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].geoid) component.initiatorrecipientprivate_Form.controls.geoid.setValue((json as any)[0].geoid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cityid) component.initiatorrecipientprivate_Form.controls.cityid.setValue((json as any)[0].cityid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].pincode) component.initiatorrecipientprivate_Form.controls.pincode.setValue((json as any)[0].pincode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].bankaccountnumber) component.initiatorrecipientprivate_Form.controls.bankaccountnumber.setValue((json as any)[0].bankaccountnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].bankname) component.initiatorrecipientprivate_Form.controls.bankname.setValue((json as any)[0].bankname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].iban) component.initiatorrecipientprivate_Form.controls.iban.setValue((json as any)[0].iban);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].accountname) component.initiatorrecipientprivate_Form.controls.accountname.setValue((json as any)[0].accountname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.initiatorrecipientprivate_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  initiatorrecipientprivate Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  initiatorrecipientprivate Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.initiatorrecipientprivate.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  initiatorrecipientprivate Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.initiatorrecipientprivate_Form.controls.customerid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  initiatorrecipientprivate -----------------------------------', strCSS);

    });

});
