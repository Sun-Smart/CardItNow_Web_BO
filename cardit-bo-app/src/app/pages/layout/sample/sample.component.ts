import {
    Component, ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory, OnDestroy, AfterViewInit, Compiler, Injector, NgModuleRef, NgModule, OnInit
} from '@angular/core';
//import { crmtatconfigurationComponent } from '../../forms/crmtatconfiguration/crmtatconfiguration.component';
@Component({
    selector: 'app-sample',
    templateUrl: './sample.component.html'
})
export class sampleComponent implements OnInit {
    /*
    // 
    componentRef: any;
    @ViewChild('appcontainer',{read: ViewContainerRef, static: false}) entry: ViewContainerRef;
    //@ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
    constructor(private resolver: ComponentFactoryResolver) { }
*/
    ngOnInit() {


    }


    constructor() {
    }
    /*
        ngOnDestroy() {
            this.destroyComponent();
        }
        
        createComponent(message) {
            //debugger;
            this.entry.clear();
            const factory = this.resolver.resolveComponentFactory(crmtatconfigurationComponent);
            const componentRef = this.entry.createComponent(factory);
            componentRef.instance.parameterid = message;
        }
    
        destroyComponent() {
            if(this.componentRef!=undefined && this.componentRef!=null)this.componentRef.destroy();
        }
    */




}
