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

import * as jsonData from './customermaster.json';

import { customermasterComponent } from './customermaster.component';
//import { customerdetailComponent } from '../customerdetail/customerdetail.component';
//import { customertermsacceptanceComponent } from '../customertermsacceptance/customertermsacceptance.component';
//import { customerpaymodeComponent } from '../customerpaymode/customerpaymode.component';
//import { customersecurityquestionComponent } from '../customersecurityquestion/customersecurityquestion.component';
//import { customersecurityquestionshistoryComponent } from '../customersecurityquestionshistory/customersecurityquestionshistory.component';
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
        console.log('%c Toast customermaster ' + message_detail, 'background: #fff; color: red');
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
describe('customermasterComponent', () => {

    let component: customermasterComponent;
    let fixture: ComponentFixture<customermasterComponent>;
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

    let index_customerdetail = 1;
    let index_customertermsacceptance = 2;
    let index_customerpaymode = 3;
    let index_customersecurityquestion = 4;
    let index_customersecurityquestionshistory = 5;
    //   
    jasmine.getEnv().configure({ random: false });
    AuthServiceSpy = createSpyObj('AuthService', ['getToken']);


    beforeAll(async () => {
        //TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() );
    });
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule, NgPrimeModule, TranslateMockModule,],
            declarations: [customermasterComponent],
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
            fixture = TestBed.createComponent(customermasterComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c customermasterComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c customermaster fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c customermasterComponent true', strCSS);
    });
    it('customerdetail functionality', () => {

        console.log('%c ' + index_customerdetail + ' customermaster customerdetail dialog', strCSSheader);
        console.log('%c  ' + index_customerdetail + '  customermaster customerdetail+ clicking the add and edit button', strCSS);
        component.AddOrEdit_customerdetail(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_customerdetail + ' customermaster customerdetail+ checking the existence of the customerdetail dialog', strCSS);
        let obj = document.getElementsByTagName('app-customerdetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_customerdetail + ' customermaster customerdetail obj ' + obj.length, strCSS);
        console.log('%c  ' + index_customerdetail + ' customermaster customerdetail pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_customerdetail + ' customermaster customerdetail clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-customerdetail') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_customerdetail + ' customermaster customerdetail obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_customerdetail + ' customermaster customerdetail pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('customertermsacceptance functionality', () => {

        console.log('%c ' + index_customertermsacceptance + ' customermaster customertermsacceptance dialog', strCSSheader);
        console.log('%c  ' + index_customertermsacceptance + '  customermaster customertermsacceptance+ clicking the add and edit button', strCSS);
        component.AddOrEdit_customertermsacceptance(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_customertermsacceptance + ' customermaster customertermsacceptance+ checking the existence of the customertermsacceptance dialog', strCSS);
        let obj = document.getElementsByTagName('app-customertermsacceptance') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_customertermsacceptance + ' customermaster customertermsacceptance obj ' + obj.length, strCSS);
        console.log('%c  ' + index_customertermsacceptance + ' customermaster customertermsacceptance pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_customertermsacceptance + ' customermaster customertermsacceptance clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-customertermsacceptance') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_customertermsacceptance + ' customermaster customertermsacceptance obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_customertermsacceptance + ' customermaster customertermsacceptance pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('customerpaymode functionality', () => {

        console.log('%c ' + index_customerpaymode + ' customermaster customerpaymode dialog', strCSSheader);
        console.log('%c  ' + index_customerpaymode + '  customermaster customerpaymode+ clicking the add and edit button', strCSS);
        component.AddOrEdit_customerpaymode(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_customerpaymode + ' customermaster customerpaymode+ checking the existence of the customerpaymode dialog', strCSS);
        let obj = document.getElementsByTagName('app-customerpaymode') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_customerpaymode + ' customermaster customerpaymode obj ' + obj.length, strCSS);
        console.log('%c  ' + index_customerpaymode + ' customermaster customerpaymode pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_customerpaymode + ' customermaster customerpaymode clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-customerpaymode') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_customerpaymode + ' customermaster customerpaymode obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_customerpaymode + ' customermaster customerpaymode pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('customersecurityquestion functionality', () => {

        console.log('%c ' + index_customersecurityquestion + ' customermaster customersecurityquestion dialog', strCSSheader);
        console.log('%c  ' + index_customersecurityquestion + '  customermaster customersecurityquestion+ clicking the add and edit button', strCSS);
        component.AddOrEdit_customersecurityquestion(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_customersecurityquestion + ' customermaster customersecurityquestion+ checking the existence of the customersecurityquestion dialog', strCSS);
        let obj = document.getElementsByTagName('app-customersecurityquestion') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_customersecurityquestion + ' customermaster customersecurityquestion obj ' + obj.length, strCSS);
        console.log('%c  ' + index_customersecurityquestion + ' customermaster customersecurityquestion pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_customersecurityquestion + ' customermaster customersecurityquestion clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-customersecurityquestion') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_customersecurityquestion + ' customermaster customersecurityquestion obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_customersecurityquestion + ' customermaster customersecurityquestion pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('customersecurityquestionshistory functionality', () => {

        console.log('%c ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory dialog', strCSSheader);
        console.log('%c  ' + index_customersecurityquestionshistory + '  customermaster customersecurityquestionshistory+ clicking the add and edit button', strCSS);
        component.AddOrEdit_customersecurityquestionshistory(null, null, null);

        //fixture.whenStable().then(() => {
        fixture.whenStable();
        fixture.detectChanges();
        //
        console.log('%c  ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory+ checking the existence of the customersecurityquestionshistory dialog', strCSS);
        let obj = document.getElementsByTagName('app-customersecurityquestionshistory') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;

        console.log('%c  ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory obj ' + obj.length, strCSS);
        console.log('%c  ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory pdialog ' + pdialog.length + '', strCSS);

        expect(obj).not.toEqual(undefined);
        expect(pdialog).not.toEqual(undefined);
        let frm = obj[0];
    });
    it('close button functionality', () => {
        console.log('%c ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory clicking close button', strCSS);

        let buttonElement = document.getElementById('closebutton') as any;

        expect(buttonElement).not.toEqual(undefined);
        buttonElement?.click();
        let obj = document.getElementsByTagName('app-customersecurityquestionshistory') as any;
        let pdialog = document.getElementsByTagName('p-dynamicdialog') as any;
        console.log('%c ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory obj ' + obj.length + '', strCSS);
        console.log('%c ' + index_customersecurityquestionshistory + ' customermaster customersecurityquestionshistory pdialog ' + pdialog.length + '', strCSS);

        pdialog[0]?.remove()
    });
    it('dropdowns functionality', () => {
        console.log('%c customermaster checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c customermaster mode_List ' + component.mode_List?.length + '', strCSS);
        console.log('%c customermaster type_List ' + component.type_List?.length + '', strCSS);
        console.log('%c customermaster defaultavatar_List ' + component.defaultavatar_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c customermaster jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  customermaster JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerid) component.customermaster_Form.controls.customerid.setValue((json as any)[0].customerid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].mode) component.customermaster_Form.controls.mode.setValue((json as any)[0].mode);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].uid) component.customermaster_Form.controls.uid.setValue((json as any)[0].uid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].type) component.customermaster_Form.controls.type.setValue((json as any)[0].type);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].firstname) component.customermaster_Form.controls.firstname.setValue((json as any)[0].firstname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].lastname) component.customermaster_Form.controls.lastname.setValue((json as any)[0].lastname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].email) component.customermaster_Form.controls.email.setValue((json as any)[0].email);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].mobile) component.customermaster_Form.controls.mobile.setValue((json as any)[0].mobile);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].dob) component.customermaster_Form.controls.dob.setValue((json as any)[0].dob);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerinterests) component.customermaster_Form.controls.customerinterests.setValue((json as any)[0].customerinterests);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].defaultavatar) component.customermaster_Form.controls.defaultavatar.setValue((json as any)[0].defaultavatar);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customerphoto) component.customermaster_Form.controls.customerphoto.setValue((json as any)[0].customerphoto);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].googleid) component.customermaster_Form.controls.googleid.setValue((json as any)[0].googleid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].facebookid) component.customermaster_Form.controls.facebookid.setValue((json as any)[0].facebookid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].lasttermsaccepted) component.customermaster_Form.controls.lasttermsaccepted.setValue((json as any)[0].lasttermsaccepted);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.customermaster_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.customermaster_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.customermaster_Form.controls.status.setValue((json as any)[0].status);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].deletionaccountrequestedon) component.customermaster_Form.controls.deletionaccountrequestedon.setValue((json as any)[0].deletionaccountrequestedon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].autodeletedon) component.customermaster_Form.controls.autodeletedon.setValue((json as any)[0].autodeletedon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].deleterevokedon) component.customermaster_Form.controls.deleterevokedon.setValue((json as any)[0].deleterevokedon);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].createdon) component.customermaster_Form.controls.createdon.setValue((json as any)[0].createdon);
        debugger;
        console.log('%c  customermaster Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  customermaster Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.customermaster.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  customermaster Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.customermaster_Form.controls.mode.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  customermaster -----------------------------------', strCSS);

    });

});
