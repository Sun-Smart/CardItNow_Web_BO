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

import * as jsonData from './boreportcolumn.json';

import { boreportcolumnComponent } from './boreportcolumn.component';
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
        console.log('%c Toast boreportcolumn ' + message_detail, 'background: #fff; color: red');
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
describe('boreportcolumnComponent', () => {

    let component: boreportcolumnComponent;
    let fixture: ComponentFixture<boreportcolumnComponent>;
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
            declarations: [boreportcolumnComponent],
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
            fixture = TestBed.createComponent(boreportcolumnComponent);
            component = fixture.componentInstance;
            element = fixture.debugElement.nativeElement;

            fixture.whenStable();
            fixture.detectChanges();
            console.log('%c boreportcolumnComponent created', strCSS);
        }
    });


    afterEach(async () => {
        fixture?.debugElement?.nativeElement?.remove();
        fixture?.destroy();
        console.log('%c boreportcolumn fixture deleted', strCSS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        console.log('%c boreportcolumnComponent true', strCSS);
    });
    it('dropdowns functionality', () => {
        console.log('%c boreportcolumn checking whether dropdowns contain values', strCSSheader);

        fixture.whenStable();
        console.log('%c boreportcolumn datatype_List ' + component.datatype_List?.length + '', strCSS);
        console.log('%c boreportcolumn filtertype_List ' + component.filtertype_List?.length + '', strCSS);

    });
    it('Submit & delete functionality', async () => {

        fixture.whenStable();

        let json = jsonData;
        console.log('%c boreportcolumn jsonData ' + (jsonData as any)?.length + '', strCSS);
        console.log('%c  boreportcolumn JSON Values ' + (json as any)[0] + '', strCSS);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportcolumnid) component.boreportcolumn_Form.controls.reportcolumnid.setValue((json as any)[0].reportcolumnid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].reportid) component.boreportcolumn_Form.controls.reportid.setValue((json as any)[0].reportid);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].tablealias) component.boreportcolumn_Form.controls.tablealias.setValue((json as any)[0].tablealias);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].field) component.boreportcolumn_Form.controls.field.setValue((json as any)[0].field);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].header) component.boreportcolumn_Form.controls.header.setValue((json as any)[0].header);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].columnalias) component.boreportcolumn_Form.controls.columnalias.setValue((json as any)[0].columnalias);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].hide) component.boreportcolumn_Form.controls.hide.setValue((json as any)[0].hide);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].derived) component.boreportcolumn_Form.controls.derived.setValue((json as any)[0].derived);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].datatype) component.boreportcolumn_Form.controls.datatype.setValue((json as any)[0].datatype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].fkfilter) component.boreportcolumn_Form.controls.fkfilter.setValue((json as any)[0].fkfilter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].filtertype) component.boreportcolumn_Form.controls.filtertype.setValue((json as any)[0].filtertype);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].width) component.boreportcolumn_Form.controls.width.setValue((json as any)[0].width);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].nofilter) component.boreportcolumn_Form.controls.nofilter.setValue((json as any)[0].nofilter);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].groupby) component.boreportcolumn_Form.controls.groupby.setValue((json as any)[0].groupby);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sum) component.boreportcolumn_Form.controls.sum.setValue((json as any)[0].sum);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].count) component.boreportcolumn_Form.controls.count.setValue((json as any)[0].count);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].colhtml) component.boreportcolumn_Form.controls.colhtml.setValue((json as any)[0].colhtml);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].poptitle) component.boreportcolumn_Form.controls.poptitle.setValue((json as any)[0].poptitle);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].link) component.boreportcolumn_Form.controls.link.setValue((json as any)[0].link);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].linkurl) component.boreportcolumn_Form.controls.linkurl.setValue((json as any)[0].linkurl);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].service) component.boreportcolumn_Form.controls.service.setValue((json as any)[0].service);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].servicename) component.boreportcolumn_Form.controls.servicename.setValue((json as any)[0].servicename);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sp) component.boreportcolumn_Form.controls.sp.setValue((json as any)[0].sp);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].spname) component.boreportcolumn_Form.controls.spname.setValue((json as any)[0].spname);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].alert) component.boreportcolumn_Form.controls.alert.setValue((json as any)[0].alert);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].caps) component.boreportcolumn_Form.controls.caps.setValue((json as any)[0].caps);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].bold) component.boreportcolumn_Form.controls.bold.setValue((json as any)[0].bold);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].italic) component.boreportcolumn_Form.controls.italic.setValue((json as any)[0].italic);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].strikethrough) component.boreportcolumn_Form.controls.strikethrough.setValue((json as any)[0].strikethrough);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].bgcolor) component.boreportcolumn_Form.controls.bgcolor.setValue((json as any)[0].bgcolor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].forecolor) component.boreportcolumn_Form.controls.forecolor.setValue((json as any)[0].forecolor);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].conditionstyle) component.boreportcolumn_Form.controls.conditionstyle.setValue((json as any)[0].conditionstyle);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].performancestatusvalues) component.boreportcolumn_Form.controls.performancestatusvalues.setValue((json as any)[0].performancestatusvalues);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].status) component.boreportcolumn_Form.controls.status.setValue((json as any)[0].status);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].notsortable) component.boreportcolumn_Form.controls.notsortable.setValue((json as any)[0].notsortable);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sequence) component.boreportcolumn_Form.controls.sequence.setValue((json as any)[0].sequence);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].sumcondition) component.boreportcolumn_Form.controls.sumcondition.setValue((json as any)[0].sumcondition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].countcondition) component.boreportcolumn_Form.controls.countcondition.setValue((json as any)[0].countcondition);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].min) component.boreportcolumn_Form.controls.min.setValue((json as any)[0].min);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].max) component.boreportcolumn_Form.controls.max.setValue((json as any)[0].max);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].maxchars) component.boreportcolumn_Form.controls.maxchars.setValue((json as any)[0].maxchars);
        if (json != undefined && (json as any)?.length > 0 && (json as any)[0].helptext) component.boreportcolumn_Form.controls.helptext.setValue((json as any)[0].helptext);
        debugger;
        console.log('%c  boreportcolumn Submitting', strCSSheader);

        let res = await component.onSubmitData(false);
        //waitForAsync(() => {
        //setTimeout(() => {
        //tick(2000);
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        console.log('%c  boreportcolumn Message: ' + _MockMessageService.get(), strCSS);
        await expect(_MockMessageService.get()).toEqual('Successfully saved');
        await component.PopulateScreen(res.boreportcolumn.pkcol);

        //expect(window.alert).toHaveBeenCalledWith('Successfully saved');
        console.log('%c  boreportcolumn Deleting the Record', strCSS);
        await component.onDelete();
        //tick(2000);
        //  waitForAsync(() => {
        //setTimeout(() => {
        fixture.whenStable();
        debugger;
        fixture.detectChanges();
        await expect(component.boreportcolumn_Form.controls.reportid.value).toEqual(null);
        await expect(_MockMessageService.get()).toEqual('Successfully Deleted');
        //expect(window.alert).toHaveBeenCalledWith('Successfully Deleted');

        console.log('%c  boreportcolumn -----------------------------------', strCSS);

    });

});
