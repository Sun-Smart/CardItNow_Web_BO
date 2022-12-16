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

import * as jsonData from './boreportdetail.json';

import { boreportdetailComponent } from './boreportdetail.component';
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
        console.log('%c Toast boreportdetail ' + message_detail, 'background: #fff; color: red');
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
describe('boreportdetailComponent', () => {

    let component: boreportdetailComponent;
    let fixture: ComponentFixture<boreportdetailComponent>;
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
            declarations: [boreportdetailComponent],
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
            fixture = TestBed.createComponent(boreportdetailComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boreportdetailComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boreportdetail fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boreportdetailComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boreportdetail checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boreportdetail separator_List ' + component.separator_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boreportdetail jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boreportdetail JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportdetailid) component.boreportdetail_Form.controls.reportdetailid.setValue((json as any)[0].reportdetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportid) component.boreportdetail_Form.controls.reportid.setValue((json as any)[0].reportid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tablename) component.boreportdetail_Form.controls.tablename.setValue((json as any)[0].tablename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].formula) component.boreportdetail_Form.controls.formula.setValue((json as any)[0].formula);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].separator) component.boreportdetail_Form.controls.separator.setValue((json as any)[0].separator);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header) component.boreportdetail_Form.controls.header.setValue((json as any)[0].header);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].footer) component.boreportdetail_Form.controls.footer.setValue((json as any)[0].footer);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].wherecondition) component.boreportdetail_Form.controls.wherecondition.setValue((json as any)[0].wherecondition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].alias) component.boreportdetail_Form.controls.alias.setValue((json as any)[0].alias);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boreportdetail_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boreportdetail Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boreportdetail Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boreportdetail.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boreportdetail Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boreportdetail_Form.controls.reportid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boreportdetail -----------------------------------', strCSS);

    });

});
