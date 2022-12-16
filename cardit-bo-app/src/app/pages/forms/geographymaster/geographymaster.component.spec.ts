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

import * as jsonData from './geographymaster.json';

import { geographymasterComponent } from './geographymaster.component';
//import { citymasterComponent } from '../citymaster/citymaster.component';
//import { geoaccessComponent } from '../geoaccess/geoaccess.component';
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
        console.log('%c Toast geographymaster ' + message_detail, 'background: #fff; color: red');
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
describe('geographymasterComponent', () => {

    let component: geographymasterComponent;
    let fixture: ComponentFixture<geographymasterComponent>;
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

    let index_citymaster = 1;
    let index_geoaccess = 2;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [geographymasterComponent],
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
            fixture = TestBed.createComponent(geographymasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c geographymasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c geographymaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c geographymasterComponent true', strCSS);
    });
    it('citymaster functionality', () => {

        console.log('%c ' + index_citymaster + ' geographymaster citymaster dialog', strCSSheader);
        console.log('%c  ' + index_citymaster + '  geographymaster citymaster+ clicking the add and edit button', strCSS);
        component.AddOrEdit_citymaster(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_citymaster + ' geographymaster citymaster+ checking the existence of the citymaster dialog', strCSS);
        let obj = document.getElementsByTagName('app-citymaster') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_citymaster + ' geographymaster citymaster obj ' + obj.length, strCSS);
        console.log('%c  ' + index_citymaster + ' geographymaster citymaster pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_citymaster + ' geographymaster citymaster clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-citymaster') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_citymaster + ' geographymaster citymaster obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_citymaster + ' geographymaster citymaster pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('geoaccess functionality', () => {

        console.log('%c ' + index_geoaccess + ' geographymaster geoaccess dialog', strCSSheader);
        console.log('%c  ' + index_geoaccess + '  geographymaster geoaccess+ clicking the add and edit button', strCSS);
        component.AddOrEdit_geoaccess(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_geoaccess + ' geographymaster geoaccess+ checking the existence of the geoaccess dialog', strCSS);
        let obj = document.getElementsByTagName('app-geoaccess') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_geoaccess + ' geographymaster geoaccess obj ' + obj.length, strCSS);
        console.log('%c  ' + index_geoaccess + ' geographymaster geoaccess pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_geoaccess + ' geographymaster geoaccess clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-geoaccess') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_geoaccess + ' geographymaster geoaccess obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_geoaccess + ' geographymaster geoaccess pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c geographymaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c geographymaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  geographymaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].geoid) component.geographymaster_Form.controls.geoid.setValue((json as any)[0].geoid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].geoname) component.geographymaster_Form.controls.geoname.setValue((json as any)[0].geoname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].geocode) component.geographymaster_Form.controls.geocode.setValue((json as any)[0].geocode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].chargepercent) component.geographymaster_Form.controls.chargepercent.setValue((json as any)[0].chargepercent);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].vat) component.geographymaster_Form.controls.vat.setValue((json as any)[0].vat);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].useraccess) component.geographymaster_Form.controls.useraccess.setValue((json as any)[0].useraccess);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.geographymaster_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  geographymaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  geographymaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.geographymaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  geographymaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.geographymaster_Form.controls.geoname.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  geographymaster -----------------------------------', strCSS);

    });

});
