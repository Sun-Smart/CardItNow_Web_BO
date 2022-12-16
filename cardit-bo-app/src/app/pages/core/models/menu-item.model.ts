export class MenuItems {
    constructor() {
        this.id = null;
        this.label = null;
        this.icon = null;
        this.routerLink = null;
        this.items = null;
        this.escape = false;
        //   this.IsChildVisible = false;
    }
    sequence: number;
    id: string;
    menucode: string;
    type: string;
    contenttype: string;
    label: string;
    tooltip: string;
    title: string;
    icon?: string;
    routerLink: string;
    command: any;
    escape: boolean;
    fullpath: string;
    filekey: string;
    items: MenuItems[];
    //   IsChildVisible: boolean;
}