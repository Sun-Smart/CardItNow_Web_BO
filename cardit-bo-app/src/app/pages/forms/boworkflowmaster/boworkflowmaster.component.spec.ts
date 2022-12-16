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

import * as jsonData from './boworkflowmaster.json';

import { boworkflowmasterComponent } from './boworkflowmaster.component';
//import { boworkflowComponent } from '../boworkflow/boworkflow.component';
//import { boworkflowstepComponent } from '../boworkflowstep/boworkflowstep.component';
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
        console.log('%c Toast boworkflowmaster ' + message_detail, 'background: #fff; color: red');
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
describe('boworkflowmasterComponent', () => {

    let component: boworkflowmasterComponent;
    let fixture: ComponentFixture<boworkflowmasterComponent>;
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

    let index_boworkflow = 1;
    let index_boworkflowstep = 2;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [boworkflowmasterComponent],
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
            fixture = TestBed.createComponent(boworkflowmasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boworkflowmasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boworkflowmaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boworkflowmasterComponent true', strCSS);
    });
    it('boworkflow functionality', () => {

        console.log('%c ' + index_boworkflow + ' boworkflowmaster boworkflow dialog', strCSSheader);
        console.log('%c  ' + index_boworkflow + '  boworkflowmaster boworkflow+ clicking the add and edit button', strCSS);
        component.AddOrEdit_boworkflow(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_boworkflow + ' boworkflowmaster boworkflow+ checking the existence of the boworkflow dialog', strCSS);
        let obj = document.getElementsByTagName('app-boworkflow') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_boworkflow + ' boworkflowmaster boworkflow obj ' + obj.length, strCSS);
        console.log('%c  ' + index_boworkflow + ' boworkflowmaster boworkflow pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_boworkflow + ' boworkflowmaster boworkflow clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-boworkflow') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_boworkflow + ' boworkflowmaster boworkflow obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_boworkflow + ' boworkflowmaster boworkflow pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('boworkflowstep functionality', () => {

        console.log('%c ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep dialog', strCSSheader);
        console.log('%c  ' + index_boworkflowstep + '  boworkflowmaster boworkflowstep+ clicking the add and edit button', strCSS);
        component.AddOrEdit_boworkflowstep(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep+ checking the existence of the boworkflowstep dialog', strCSS);
        let obj = document.getElementsByTagName('app-boworkflowstep') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep obj ' + obj.length, strCSS);
        console.log('%c  ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-boworkflowstep') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_boworkflowstep + ' boworkflowmaster boworkflowstep pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c boworkflowmaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boworkflowmaster menucode_List ' + component.menucode_List?.length + '', strCSS);
        console.log('%c boworkflowmaster tablecode_List ' + component.tablecode_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boworkflowmaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boworkflowmaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowmasterid) component.boworkflowmaster_Form.controls.workflowmasterid.setValue((json as any)[0].workflowmasterid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].menuid) component.boworkflowmaster_Form.controls.menuid.setValue((json as any)[0].menuid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].pause) component.boworkflowmaster_Form.controls.pause.setValue((json as any)[0].pause);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].description) component.boworkflowmaster_Form.controls.description.setValue((json as any)[0].description);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].menucode) component.boworkflowmaster_Form.controls.menucode.setValue((json as any)[0].menucode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tablecode) component.boworkflowmaster_Form.controls.tablecode.setValue((json as any)[0].tablecode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowhtml) component.boworkflowmaster_Form.controls.workflowhtml.setValue((json as any)[0].workflowhtml);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boworkflowmaster_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boworkflowmaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boworkflowmaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boworkflowmaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boworkflowmaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boworkflowmaster_Form.controls.menuid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boworkflowmaster -----------------------------------', strCSS);

    });

});
