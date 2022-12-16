import {
    Component, ViewChild, ElementRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory, OnDestroy, AfterViewInit, Compiler, Injector, NgModuleRef, NgModule, OnInit
} from '@angular/core';
//import { crmtatconfigurationComponent } from '../../forms/crmtatconfiguration/crmtatconfiguration.component';

import { BOReportViewerComponent } from '../../forms/boreportviewer.component';
import { boserialkeyparameterComponent } from '../../forms/boserialkeyparameter/boserialkeyparameter.component';
import { sampleComponent } from '../sample/sample.component';
import { crmtatconfigurationModule } from '../../forms/crmtatconfiguration/crmtatconfiguration.module';
import { ToastService } from '../../../pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-entryform',
    templateUrl: './entryform.component.html'
})
export class entryformComponent implements AfterViewInit {

    @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;
    private toastr: ToastService;

    reportparameterid: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private currentRoute: ActivatedRoute) {
        console.log(this.currentRoute);
        console.log(this.currentRoute.snapshot);
        this.reportparameterid = this.currentRoute.snapshot.paramMap.get('id');
    }

    ngAfterViewInit() {
        if (this.container != undefined) {
            setTimeout(() => {
                this.createcomponent();
            }, 200);
        }
        else {
            this.toastr.addSingle("error", "", "Enter the required fields");
        }
    }
    createcomponent(): void {
        //debugger;
        // create the component factory
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(crmtatconfigurationComponent);

        // add the component to the view
        const componentRef = this.container.createComponent(componentFactory);

        // pass some data to the component
        componentRef.instance.parameterid = null;
    }
}
