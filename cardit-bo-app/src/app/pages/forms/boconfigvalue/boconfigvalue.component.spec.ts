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

import * as jsonData from './boconfigvalue.json';

import { boconfigvalueComponent } from './boconfigvalue.component';
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
        console.log('%c Toast boconfigvalue ' + message_detail, 'background: #fff; color: red');
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
describe('boconfigvalueComponent', () => {

    let component: boconfigvalueComponent;
    let fixture: ComponentFixture<boconfigvalueComponent>;
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
            declarations: [boconfigvalueComponent],
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
            fixture = TestBed.createComponent(boconfigvalueComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boconfigvalueComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boconfigvalue fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boconfigvalueComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boconfigvalue checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boconfigvalue jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boconfigvalue JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].configid) component.boconfigvalue_Form.controls.configid.setValue((json as any)[0].configid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].param) component.boconfigvalue_Form.controls.param.setValue((json as any)[0].param);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].configkey) component.boconfigvalue_Form.controls.configkey.setValue((json as any)[0].configkey);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].configtext) component.boconfigvalue_Form.controls.configtext.setValue((json as any)[0].configtext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].orderno) component.boconfigvalue_Form.controls.orderno.setValue((json as any)[0].orderno);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].htmlcode) component.boconfigvalue_Form.controls.htmlcode.setValue((json as any)[0].htmlcode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].param1) component.boconfigvalue_Form.controls.param1.setValue((json as any)[0].param1);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].param2) component.boconfigvalue_Form.controls.param2.setValue((json as any)[0].param2);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].helptext) component.boconfigvalue_Form.controls.helptext.setValue((json as any)[0].helptext);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].flag) component.boconfigvalue_Form.controls.flag.setValue((json as any)[0].flag);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boconfigvalue_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boconfigvalue Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boconfigvalue Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boconfigvalue.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boconfigvalue Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boconfigvalue_Form.controls.param.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boconfigvalue -----------------------------------', strCSS);

    });

});
