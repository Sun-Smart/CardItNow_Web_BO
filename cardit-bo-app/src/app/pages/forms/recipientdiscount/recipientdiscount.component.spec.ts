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

import * as jsonData from './recipientdiscount.json';

import { recipientdiscountComponent } from './recipientdiscount.component';
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
        console.log('%c Toast recipientdiscount ' + message_detail, 'background: #fff; color: red');
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
describe('recipientdiscountComponent', () => {

    let component: recipientdiscountComponent;
    let fixture: ComponentFixture<recipientdiscountComponent>;
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

    // ?? 
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [recipientdiscountComponent],
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
            fixture = TestBed.createComponent(recipientdiscountComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c recipientdiscountComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c recipientdiscount fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c recipientdiscountComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c recipientdiscount checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c recipientdiscount recipientuid_List ' + component.recipientuid_List?.length + '', strCSS);
        console.log('%c recipientdiscount initiatoruid_List ' + component.initiatoruid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c recipientdiscount jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  recipientdiscount JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].discountid) component.recipientdiscount_Form.controls.discountid.setValue((json as any)[0].discountid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].recipientuid) component.recipientdiscount_Form.controls.recipientuid.setValue((json as any)[0].recipientuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].initiatoruid) component.recipientdiscount_Form.controls.initiatoruid.setValue((json as any)[0].initiatoruid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].contractnumber) component.recipientdiscount_Form.controls.contractnumber.setValue((json as any)[0].contractnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].discountpercentage) component.recipientdiscount_Form.controls.discountpercentage.setValue((json as any)[0].discountpercentage);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.recipientdiscount_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  recipientdiscount Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  recipientdiscount Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.recipientdiscount.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  recipientdiscount Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        // ??waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.recipientdiscount_Form.controls.recipientuid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  recipientdiscount -----------------------------------', strCSS);

    });

});
