import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { LoaderService } from '../../../pages/core/services/loader.service';
//import { bomenumasterService } from './../../service/bomenumaster.service';
//import { MenuItem } from '../core/models/menu-item.model';
import { Sidebar } from 'primeng/sidebar';
import { ApplicationStateService } from '../../../pages/core/services/application-state.service';
import { SharedService } from '../../../service/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crmlayout',
    templateUrl: './crmlayout.component.html',
    styleUrls: ['./crmlayout.component.css']
})
export class CRMLayoutComponent implements AfterViewInit, OnInit {

    menuItems: any = [];
    menuloaded: boolean = false;
    isMenuVisible: boolean;

    isMobileResolution: boolean = false;

    constructor(private router: Router, private toastService: ToastService,
        private loaderService: LoaderService,
        //private bomenumasterservice: bomenumasterService,
        private applicationStateService: ApplicationStateService, private sharedService: SharedService) {
    }
    OpenPage(menuid, url) {


        this.sharedService.menuid = menuid;
        this.sharedService.currenturl = url;
        this.router.navigate(["" + url]);

    }
    ngOnInit() {
        /*
        ////debugger;
        this.loaderService.display(true);
        this.toastService.addSingle("success", "", "Login successfully.");
        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();

        
        this.menuload();
        
        if (this.isMobileResolution) {
            this.isMenuVisible = false;
        }
        else {
            this.isMenuVisible = true;
        }
*/

    }


    ngAfterViewInit(): void {
        //  ////debugger;
        this.loaderService.display(true);
        this.toastService.addSingle("success", "", "Login successfully.");
        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();




        if (this.isMobileResolution) {
            this.isMenuVisible = false;
        }
        else {
            this.isMenuVisible = true;
        }
        setTimeout(() => {
            this.loaderService.display(false);
        }, 1000);
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible
    }



    topFunction() {
        document.getElementById("contentArea1").scrollTop = 0;
    }

}
