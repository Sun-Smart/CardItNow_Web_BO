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

import * as jsonData from './usermaster.json';

import { usermasterComponent } from './usermaster.component';
//import { userrolemasterComponent } from '../userrolemaster/userrolemaster.component';
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
        console.log('%c Toast usermaster ' + message_detail, 'background: #fff; color: red');
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
describe('usermasterComponent', () => {

    let component: usermasterComponent;
    let fixture: ComponentFixture<usermasterComponent>;
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

    let index_userrolemaster = 1;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [usermasterComponent],
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
            fixture = TestBed.createComponent(usermasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c usermasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c usermaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c usermasterComponent true', strCSS);
    });
    it('userrolemaster functionality', () => {

        console.log('%c ' + index_userrolemaster + ' usermaster userrolemaster dialog', strCSSheader);
        console.log('%c  ' + index_userrolemaster + '  usermaster userrolemaster+ clicking the add and edit button', strCSS);
        component.AddOrEdit_userrolemaster(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_userrolemaster + ' usermaster userrolemaster+ checking the existence of the userrolemaster dialog', strCSS);
        let obj = document.getElementsByTagName('app-userrolemaster') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_userrolemaster + ' usermaster userrolemaster obj ' + obj.length, strCSS);
        console.log('%c  ' + index_userrolemaster + ' usermaster userrolemaster pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_userrolemaster + ' usermaster userrolemaster clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-userrolemaster') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_userrolemaster + ' usermaster userrolemaster obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_userrolemaster + ' usermaster userrolemaster pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c usermaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c usermaster roleid_List ' + component.roleid_List?.length + '', strCSS);
        console.log('%c usermaster basegeoid_List ' + component.basegeoid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c usermaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  usermaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].userid) component.usermaster_Form.controls.userid.setValue((json as any)[0].userid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].username) component.usermaster_Form.controls.username.setValue((json as any)[0].username);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].roleid) component.usermaster_Form.controls.roleid.setValue((json as any)[0].roleid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].email) component.usermaster_Form.controls.email.setValue((json as any)[0].email);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].emailpassword) component.usermaster_Form.controls.emailpassword.setValue((json as any)[0].emailpassword);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].mobile) component.usermaster_Form.controls.mobile.setValue((json as any)[0].mobile);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].basegeoid) component.usermaster_Form.controls.basegeoid.setValue((json as any)[0].basegeoid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.usermaster_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  usermaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  usermaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.usermaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  usermaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.usermaster_Form.controls.username.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  usermaster -----------------------------------', strCSS);

    });

});
