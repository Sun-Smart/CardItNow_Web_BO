import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../pages/core/services/toast.service';
import { LoaderService } from '../../../pages/core/services/loader.service';
import { menumasterService } from '../../../service/menumaster.service';
import { MenuItems } from '../../core/models/menu-item.model';
//import {MenuItem} from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { ApplicationStateService } from '../../../pages/core/services/application-state.service';
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../../pages/core/services/session.service';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../../pages/core/services/theme.service';
import { TranslateService } from "@ngx-translate/core";
//import { MenuController } from '@ionic/angular';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    animations: [
        trigger('slidein', [
          transition(':enter', [
            // when ngif has true
            style({ transform: 'translateX(-100%)' }),
            animate(250, style({ transform: 'translateX(0)' }))
          ]),
          transition(':leave', [
            // when ngIf has false
            animate(250, style({ transform: 'translateX(-100%)' }))
          ])
        ])
      ]
    })

export class LayoutComponent implements AfterViewInit, OnInit {

    menuItems: any = [];
    menuloaded: boolean = false;
    isMenuVisible: boolean;
    layout: any = 1;
    isMobileResolution: boolean = false;
    theme: string;
    loggedIn: boolean = false;
    sessiondata: any;
    sessionData: any;
    isSmallScreen = false;
    menuActive: boolean = false;
    @ViewChild("menubar", { static: false }) menubar: Sidebar;


    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ];
    //private menu: MenuController,
    constructor(private translate: TranslateService, private router: Router, private toastService: ToastService,
        private loaderService: LoaderService,
        private menumasterservice: menumasterService,
        private applicationStateService: ApplicationStateService,
        public sessionService: SessionService,
        private themeService: ThemeService,
        private sharedService: SharedService) {
        this.layout = this.sessionService.getItem("selected-layout");
        this.theme = "cupertino";
        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.translate.use(this.sessionData.language);


            this.router.events.subscribe(event => {

                if (event instanceof NavigationEnd) {

                    this.hideMenu();
                }
            });


        }
    }
    onMenuButtonClick(event: Event) {
        this.menuActive = !this.menuActive;
        //this.addClass(document.body, 'blocked-scroll');
    }
    OpenPage(e: any) {
        //debugger;
        if (e.item.routerLink != null && e.item.routerLink != "") {
            console.log("layout" + e.item.id);
            this.sharedService.menuid = e.item.id;
            this.sharedService.menucode = e.item.menucode;
            this.sharedService.currenturl = e.item.routerLink;
            this.router.navigate([e.item.routerLink]);
        }

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
        //debugger;
        this.themeService.theme.subscribe((val: string) => {
            ////debugger;
            this.theme = val;
        });

    }

    async menuload() {
        /*   
           await this.bomenumasterservice.getbomenumastersList().then((res:any) => {
               console.log(this.menuItems);
               this.menuItems= this.convert(res);
           });
           */
        // debugger;
        let res = await this.menumasterservice.get_usermenumaster_List();
        //debugger;
        if ((res as any).length == 0) {
            //this.sharedService.alert("Menu Access Not given");
            return;
        }
        // debugger;

        //let i = this.convert(res);
        // this.menuItems = res;
        this.menuItems = await this.sharedService.convertMenu(res);//this.sharedService.JSON_parse(res[0].json_value);
        this.menuloaded = true;
        // ////debugger;
    }
    onMaskClick() {
        this.hideMenu();
    }
    hideMenu() {
        this.menuActive = false;
        // this.removeClass(document.body, 'blocked-scroll');
    }

    ngAfterViewInit(): void {
        debugger;


        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != "") this.loggedIn = true;
        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;

        this.loaderService.display(true);

        this.isMobileResolution = this.applicationStateService.getIsMobileResolution();
        this.sharedService.isMobileResolution = this.isMobileResolution;

        this.menuload();

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
        //debugger;
        this.isMenuVisible = !this.isMenuVisible
    }



    async convert(array) {
        //debugger;
        //var map = {};
        var map = [];
        for (var i = 0; i < array.length; i++) {
            var obj: MenuItems;
            obj = new MenuItems();
            obj.id = array[i].menuid;
            //obj.menucode = array[i].menucode;
            //obj.label = array[i].menudescription;
            let desc = array[i].menuname;
            if (desc == null) desc = ""

            //console.log(desc)
            if (desc != '' && desc != null && this.translate.get(desc) != null && this.translate.get(desc) != undefined)
                obj.label = await this.translate.get(desc).toPromise();
            else
                obj.label = desc;
            obj.tooltip = desc;
            obj.title = desc;
            //'<img src="http://localhost:5002/MyResources/workflow.webp"></img>'
            //obj.icon=array[i].menudescription.toLowerCase().replace(/ /g, '');
            //obj.escape= false;
            obj.icon = array[i].iconname;

            let link = array[i].menuurl;


            obj.routerLink = link;
            obj.command = (e: any) => { this.OpenPage(e); };
            //  obj.IsChildVisible=true;
            // obj.expanded = true;
            // obj.children = [];
            // obj.IsChildVisible=false;
            map[obj.id] = obj;


            var parent = array[i].parentid || '-';
            if (!map[parent]) {
                map[parent] = {
                    items: []
                };
            }
            if (map[parent].items == undefined || map[parent].items == null) {

                map[parent].items = [];
            }
            else {
                // map[parent].icon = 'pi pi-fw';  //
            }

            map[parent].items.push(obj);
        }
        //debugger;
        var ret = {}
        ret[0] = {
            label: "root", items: map, parentid: 0
        };
        return map['1'].items;
        //return map['-'].items;

    }
    topFunction() {
        //debugger;
        if (document.getElementById("contentArea") != undefined) document.getElementById("contentArea1").scrollTop = 0;
        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;

        //if(this.router.url=="/" || this.router.url=="/login")this.loggedIn=false;
        if(!this.loggedIn)this.router.navigate(['/login']);
        */
    }

    selectTheme(theme: string) {
        ////debugger;
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
        this.theme = theme;
    }

}
