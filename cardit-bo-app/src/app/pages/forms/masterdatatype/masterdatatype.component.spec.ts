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

import * as jsonData from './masterdatatype.json';

import { masterdatatypeComponent } from './masterdatatype.component';
//import { masterdataComponent } from '../masterdata/masterdata.component';
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
        console.log('%c Toast masterdatatype ' + message_detail, 'background: #fff; color: red');
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
describe('masterdatatypeComponent', () => {

    let component: masterdatatypeComponent;
    let fixture: ComponentFixture<masterdatatypeComponent>;
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

    let index_masterdata = 1;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [masterdatatypeComponent],
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
            fixture = TestBed.createComponent(masterdatatypeComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c masterdatatypeComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c masterdatatype fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c masterdatatypeComponent true', strCSS);
    });
    it('masterdata functionality', () => {

        console.log('%c ' + index_masterdata + ' masterdatatype masterdata dialog', strCSSheader);
        console.log('%c  ' + index_masterdata + '  masterdatatype masterdata+ clicking the add and edit button', strCSS);
        component.AddOrEdit_masterdata(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_masterdata + ' masterdatatype masterdata+ checking the existence of the masterdata dialog', strCSS);
        let obj = document.getElementsByTagName('app-masterdata') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_masterdata + ' masterdatatype masterdata obj ' + obj.length, strCSS);
        console.log('%c  ' + index_masterdata + ' masterdatatype masterdata pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_masterdata + ' masterdatatype masterdata clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-masterdata') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_masterdata + ' masterdatatype masterdata obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_masterdata + ' masterdatatype masterdata pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c masterdatatype checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c masterdatatype jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  masterdatatype JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].datatypeid) component.masterdatatype_Form.controls.datatypeid.setValue((json as any)[0].datatypeid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].masterdatatypename) component.masterdatatype_Form.controls.masterdatatypename.setValue((json as any)[0].masterdatatypename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].code) component.masterdatatype_Form.controls.code.setValue((json as any)[0].code);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.masterdatatype_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  masterdatatype Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  masterdatatype Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.masterdatatype.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  masterdatatype Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.masterdatatype_Form.controls.masterdatatypename.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  masterdatatype -----------------------------------', strCSS);

    });

});
