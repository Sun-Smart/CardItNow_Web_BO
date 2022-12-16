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

import * as jsonData from './boworkflow.json';

import { boworkflowComponent } from './boworkflow.component';
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
        console.log('%c Toast boworkflow ' + message_detail, 'background: #fff; color: red');
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
describe('boworkflowComponent', () => {

    let component: boworkflowComponent;
    let fixture: ComponentFixture<boworkflowComponent>;
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
            declarations: [boworkflowComponent],
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
            fixture = TestBed.createComponent(boworkflowComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boworkflowComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boworkflow fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boworkflowComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boworkflow checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boworkflow currentapproved_List ' + component.currentapproved_List?.length + '', strCSS);
        console.log('%c boworkflow standardrating_List ' + component.standardrating_List?.length + '', strCSS);
        console.log('%c boworkflow performancerating_List ' + component.performancerating_List?.length + '', strCSS);
        console.log('%c boworkflow performancestatus_List ' + component.performancestatus_List?.length + '', strCSS);
        console.log('%c boworkflow workflowstatus_List ' + component.workflowstatus_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boworkflow jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boworkflow JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowid) component.boworkflow_Form.controls.workflowid.setValue((json as any)[0].workflowid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowmasterid) component.boworkflow_Form.controls.workflowmasterid.setValue((json as any)[0].workflowmasterid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].currentstepno) component.boworkflow_Form.controls.currentstepno.setValue((json as any)[0].currentstepno);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].modulename) component.boworkflow_Form.controls.modulename.setValue((json as any)[0].modulename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].pkvalue) component.boworkflow_Form.controls.pkvalue.setValue((json as any)[0].pkvalue);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].currentapproved) component.boworkflow_Form.controls.currentapproved.setValue((json as any)[0].currentapproved);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].currentapprovers) component.boworkflow_Form.controls.currentapprovers.setValue((json as any)[0].currentapprovers);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].nextapprovers) component.boworkflow_Form.controls.nextapprovers.setValue((json as any)[0].nextapprovers);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].assigneddatetime) component.boworkflow_Form.controls.assigneddatetime.setValue((json as any)[0].assigneddatetime);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].closeddatetime) component.boworkflow_Form.controls.closeddatetime.setValue((json as any)[0].closeddatetime);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].standardrating) component.boworkflow_Form.controls.standardrating.setValue((json as any)[0].standardrating);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].performancerating) component.boworkflow_Form.controls.performancerating.setValue((json as any)[0].performancerating);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].performancestatus) component.boworkflow_Form.controls.performancestatus.setValue((json as any)[0].performancestatus);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].exception) component.boworkflow_Form.controls.exception.setValue((json as any)[0].exception);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].approvedusers) component.boworkflow_Form.controls.approvedusers.setValue((json as any)[0].approvedusers);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].stepapprovedusers) component.boworkflow_Form.controls.stepapprovedusers.setValue((json as any)[0].stepapprovedusers);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].approvedcondition) component.boworkflow_Form.controls.approvedcondition.setValue((json as any)[0].approvedcondition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tathours) component.boworkflow_Form.controls.tathours.setValue((json as any)[0].tathours);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].totalactualtime) component.boworkflow_Form.controls.totalactualtime.setValue((json as any)[0].totalactualtime);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].processid) component.boworkflow_Form.controls.processid.setValue((json as any)[0].processid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowdetails) component.boworkflow_Form.controls.workflowdetails.setValue((json as any)[0].workflowdetails);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].comments) component.boworkflow_Form.controls.comments.setValue((json as any)[0].comments);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].history) component.boworkflow_Form.controls.history.setValue((json as any)[0].history);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].lastapprover) component.boworkflow_Form.controls.lastapprover.setValue((json as any)[0].lastapprover);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cc) component.boworkflow_Form.controls.cc.setValue((json as any)[0].cc);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfield) component.boworkflow_Form.controls.customfield.setValue((json as any)[0].customfield);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].attachment) component.boworkflow_Form.controls.attachment.setValue((json as any)[0].attachment);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowstatus) component.boworkflow_Form.controls.workflowstatus.setValue((json as any)[0].workflowstatus);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boworkflow_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boworkflow Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boworkflow Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boworkflow.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boworkflow Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boworkflow_Form.controls.workflowmasterid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boworkflow -----------------------------------', strCSS);

    });

});
