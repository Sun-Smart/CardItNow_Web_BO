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

import * as jsonData from './boworkflowstep.json';

import { boworkflowstepComponent } from './boworkflowstep.component';
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
        console.log('%c Toast boworkflowstep ' + message_detail, 'background: #fff; color: red');
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
describe('boworkflowstepComponent', () => {

    let component: boworkflowstepComponent;
    let fixture: ComponentFixture<boworkflowstepComponent>;
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
            declarations: [boworkflowstepComponent],
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
            fixture = TestBed.createComponent(boworkflowstepComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boworkflowstepComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boworkflowstep fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boworkflowstepComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boworkflowstep checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boworkflowstep task_List ' + component.task_List?.length + '', strCSS);
        console.log('%c boworkflowstep yesstep_List ' + component.yesstep_List?.length + '', strCSS);
        console.log('%c boworkflowstep nostep_List ' + component.nostep_List?.length + '', strCSS);
        console.log('%c boworkflowstep workflowuserfieldtype_List ' + component.workflowuserfieldtype_List?.length + '', strCSS);
        console.log('%c boworkflowstep parentid_List ' + component.parentid_List?.length + '', strCSS);
        console.log('%c boworkflowstep customfieldid_List ' + component.customfieldid_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boworkflowstep jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boworkflowstep JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowstepid) component.boworkflowstep_Form.controls.workflowstepid.setValue((json as any)[0].workflowstepid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowmasterid) component.boworkflowstep_Form.controls.workflowmasterid.setValue((json as any)[0].workflowmasterid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].stepno) component.boworkflowstep_Form.controls.stepno.setValue((json as any)[0].stepno);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].stepname) component.boworkflowstep_Form.controls.stepname.setValue((json as any)[0].stepname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tat) component.boworkflowstep_Form.controls.tat.setValue((json as any)[0].tat);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].task) component.boworkflowstep_Form.controls.task.setValue((json as any)[0].task);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].condition) component.boworkflowstep_Form.controls.condition.setValue((json as any)[0].condition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].yesstep) component.boworkflowstep_Form.controls.yesstep.setValue((json as any)[0].yesstep);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].nostep) component.boworkflowstep_Form.controls.nostep.setValue((json as any)[0].nostep);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].approver) component.boworkflowstep_Form.controls.approver.setValue((json as any)[0].approver);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].action) component.boworkflowstep_Form.controls.action.setValue((json as any)[0].action);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].actiontype) component.boworkflowstep_Form.controls.actiontype.setValue((json as any)[0].actiontype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].minapprovers) component.boworkflowstep_Form.controls.minapprovers.setValue((json as any)[0].minapprovers);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowuserfieldtype) component.boworkflowstep_Form.controls.workflowuserfieldtype.setValue((json as any)[0].workflowuserfieldtype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].workflowuserfieldname) component.boworkflowstep_Form.controls.workflowuserfieldname.setValue((json as any)[0].workflowuserfieldname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].parentid) component.boworkflowstep_Form.controls.parentid.setValue((json as any)[0].parentid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].noedittransaction) component.boworkflowstep_Form.controls.noedittransaction.setValue((json as any)[0].noedittransaction);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].autoapproval) component.boworkflowstep_Form.controls.autoapproval.setValue((json as any)[0].autoapproval);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].autodenial) component.boworkflowstep_Form.controls.autodenial.setValue((json as any)[0].autodenial);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].waitduration) component.boworkflowstep_Form.controls.waitduration.setValue((json as any)[0].waitduration);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].remainderduration) component.boworkflowstep_Form.controls.remainderduration.setValue((json as any)[0].remainderduration);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].escalationuser) component.boworkflowstep_Form.controls.escalationuser.setValue((json as any)[0].escalationuser);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].cc) component.boworkflowstep_Form.controls.cc.setValue((json as any)[0].cc);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].customfieldid) component.boworkflowstep_Form.controls.customfieldid.setValue((json as any)[0].customfieldid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].predecessor) component.boworkflowstep_Form.controls.predecessor.setValue((json as any)[0].predecessor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].processid) component.boworkflowstep_Form.controls.processid.setValue((json as any)[0].processid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boworkflowstep_Form.controls.status.setValue((json as any)[0].status);
        debugger;
        console.log('%c  boworkflowstep Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boworkflowstep Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boworkflowstep.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boworkflowstep Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boworkflowstep_Form.controls.workflowmasterid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boworkflowstep -----------------------------------', strCSS);

    });

});
