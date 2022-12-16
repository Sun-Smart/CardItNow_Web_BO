export class parentcomponent {
    toolbarvisible: boolean = true;
    parentcomponent() { }
    ToolBar(prop: any) {
        this.toolbarvisible = prop;
    }
}