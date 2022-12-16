import { Component, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { RouteStateService } from '../../../pages/core/services/route-state.service';
import { SessionService } from '../../../pages/core/services/session.service';
import { ToastService } from '../../../pages/core/services/toast.service';
import { MenuItems } from '../../core/models/menu-item.model';
import { SharedService } from '../../../service/shared.service';
import { ThemeService } from '../../../pages/core/services/theme.service';
@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {

    @Input() items: any[];
    menuitems: any;
    selectedItem: string;
    theme: string;
    @Output() closeClicked = new EventEmitter<boolean>();


    constructor(private routeStateService: RouteStateService,
        public sessionService: SessionService,
        private toastService: ToastService, public sharedService: SharedService, private themeService: ThemeService) {
        this.theme = "grey-theme";
    }
    ngOnInit() {
        this.theme = this.sessionService.getItem('selected-theme');
        this.themeService.theme.subscribe((val: string) => {
            //debugger;
            this.theme = val;
        });


    }
    ngAfterViewInit() {



        setTimeout(() => {
            //debugger;
            console.log(this.items);
            // this.menuitems=JSON.stringify(this.items);


            var activeMenu = this.sessionService.getItem("active-menu");
            if (activeMenu) {
                this.selectedItem = activeMenu;
            } else {
                this.selectedItem = "Home";
            }
        }, 2000);
    }

    // on menu click event
    onMenuClick(menu: MenuItems) {
        ////debugger;
        // if child are available then open child
        if (menu.items != undefined || menu.items != null) {
            this.toggleSubMenu(menu);
            return;
        }
        if (menu.routerLink == undefined || menu.routerLink == null || menu.routerLink == "") {
            this.toastService.addSingle("error", "", "404 Page not found.");
            return;
        }
        console.log("click" + menu.id);
        this.sharedService.menuid = menu.id;
        this.sharedService.menucode = menu.menucode;
        this.sharedService.currenturl = menu.routerLink;
        this.selectedItem = menu.label;
        this.sessionService.setItem("active-menu", menu.label);
        //this.routeStateService.add(menu.label, "/pages/" + menu.routerLink, null, true);
        let link = menu.routerLink;

        this.routeStateService.add(menu.label, "/#/" + link, null, true);

        // hide menu bar after menu click for mobile layout        
        setTimeout(() => {
            this.closeClicked.emit(false);
        }, 100);
    }

    // toggle sub menu on click
    toggleSubMenu(menu: MenuItems) {
        //   menu.IsChildVisible = !menu.IsChildVisible;
    }

}
