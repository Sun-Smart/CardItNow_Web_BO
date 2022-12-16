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

import * as jsonData from './customerdetail.json';

import { customerdetailComponent } from './customerdetail.component';
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
        console.log('%c Toast customerdetail ' + message_detail, 'background: #fff; color: red');
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
describe('customerdetailComponent', () => {

    let component: customerdetailComponent;
    let fixture: ComponentFixture<customerdetailComponent>;
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
            declarations: [customerdetailComponent],
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
            fixture = TestBed.createComponent(customerdetailComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c customerdetailComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c customerdetail fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c customerdetailComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c customerdetail checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c customerdetail customerid_List ' + component.customerid_List?.length + '', strCSS);
        console.log('%c customerdetail uid_List ' + component.uid_List?.length + '', strCSS);
        console.log('%c customerdetail geoid_List ' + component.geoid_List?.length + '', strCSS);
        console.log('%c customerdetail cityid_List ' + component.cityid_List?.length + '', strCSS);
        console.log('%c customerdetail divmode_List ' + component.divmode_List?.length + '', strCSS);
        console.log('%c customerdetail divstatus_List ' + component.divstatus_List?.length + '', strCSS);
        console.log('%c customerdetail amlcheckstatus_List ' + component.amlcheckstatus_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c customerdetail jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  customerdetail JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerdetailid) component.customerdetail_Form.controls.customerdetailid.setValue((json as any)[0].customerdetailid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerid) component.customerdetail_Form.controls.customerid.setValue((json as any)[0].customerid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].type) component.customerdetail_Form.controls.type.setValue((json as any)[0].type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.customerdetail_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].address) component.customerdetail_Form.controls.address.setValue((json as any)[0].address);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].geoid) component.customerdetail_Form.controls.geoid.setValue((json as any)[0].geoid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cityid) component.customerdetail_Form.controls.cityid.setValue((json as any)[0].cityid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].postalcode) component.customerdetail_Form.controls.postalcode.setValue((json as any)[0].postalcode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].identificationdocumenttype) component.customerdetail_Form.controls.identificationdocumenttype.setValue((json as any)[0].identificationdocumenttype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].idnumber) component.customerdetail_Form.controls.idnumber.setValue((json as any)[0].idnumber);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].idissuedate) component.customerdetail_Form.controls.idissuedate.setValue((json as any)[0].idissuedate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].idexpirydate) component.customerdetail_Form.controls.idexpirydate.setValue((json as any)[0].idexpirydate);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].livestockphoto) component.customerdetail_Form.controls.livestockphoto.setValue((json as any)[0].livestockphoto);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].divmode) component.customerdetail_Form.controls.divmode.setValue((json as any)[0].divmode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].divref) component.customerdetail_Form.controls.divref.setValue((json as any)[0].divref);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].divsubmissionon) component.customerdetail_Form.controls.divsubmissionon.setValue((json as any)[0].divsubmissionon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].divstatus) component.customerdetail_Form.controls.divstatus.setValue((json as any)[0].divstatus);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].divremarks) component.customerdetail_Form.controls.divremarks.setValue((json as any)[0].divremarks);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].amlcheckstatus) component.customerdetail_Form.controls.amlcheckstatus.setValue((json as any)[0].amlcheckstatus);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].amlremarks) component.customerdetail_Form.controls.amlremarks.setValue((json as any)[0].amlremarks);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.customerdetail_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.customerdetail_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.customerdetail_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  customerdetail Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  customerdetail Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.customerdetail.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  customerdetail Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.customerdetail_Form.controls.customerid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  customerdetail -----------------------------------', strCSS);

    });

});
