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

import * as jsonData from './customersecurityquestionshistory.json';

import { customersecurityquestionshistoryComponent } from './customersecurityquestionshistory.component';
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
        console.log('%c Toast customersecurityquestionshistory ' + message_detail, 'background: #fff; color: red');
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
describe('customersecurityquestionshistoryComponent', () => {

    let component: customersecurityquestionshistoryComponent;
    let fixture: ComponentFixture<customersecurityquestionshistoryComponent>;
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
            declarations: [customersecurityquestionshistoryComponent],
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
            fixture = TestBed.createComponent(customersecurityquestionshistoryComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c customersecurityquestionshistoryComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c customersecurityquestionshistory fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c customersecurityquestionshistoryComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c customersecurityquestionshistory checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c customersecurityquestionshistory customerid_List ' + component.customerid_List?.length + '', strCSS);
        console.log('%c customersecurityquestionshistory securityquestionid_List ' + component.securityquestionid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c customersecurityquestionshistory jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  customersecurityquestionshistory JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerid) component.customersecurityquestionshistory_Form.controls.customerid.setValue((json as any)[0].customerid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].historyid) component.customersecurityquestionshistory_Form.controls.historyid.setValue((json as any)[0].historyid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].securityquestionid) component.customersecurityquestionshistory_Form.controls.securityquestionid.setValue((json as any)[0].securityquestionid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].questionid) component.customersecurityquestionshistory_Form.controls.questionid.setValue((json as any)[0].questionid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].oldanswer) component.customersecurityquestionshistory_Form.controls.oldanswer.setValue((json as any)[0].oldanswer);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].newanswer) component.customersecurityquestionshistory_Form.controls.newanswer.setValue((json as any)[0].newanswer);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.customersecurityquestionshistory_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  customersecurityquestionshistory Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  customersecurityquestionshistory Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.customersecurityquestionshistory.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  customersecurityquestionshistory Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.customersecurityquestionshistory_Form.controls.customerid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  customersecurityquestionshistory -----------------------------------', strCSS);

    });

});
