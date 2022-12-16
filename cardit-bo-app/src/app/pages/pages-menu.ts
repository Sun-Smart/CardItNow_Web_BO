//import { NbMenuItem } from '@nebular/theme';

//import { Menu } from '../model/menu.model';
//import { MenuService } from '../service/menu.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
export const MENU_ITEMS: MenuItem[] = [
    {



        label: 'Extra Components',
        icon: 'nb-star',
        items: [
            {
                label: 'login',
                icon: 'nb-e-commerce',
                routerLink: 'forms/login',
            },
            {
                label: 'Dashboard',
                icon: 'nb-e-commerce',
                routerLink: 'charts/bodashboardviewer/1',
            },
            {
                label: 'Dashboard Config',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bodashboard-list',
            },
            {
                label: 'Master Report',
                icon: 'nb-e-commerce',
                routerLink: 'forms/boreportviewer/1',
            },
            {
                label: 'Master Detail Report',
                icon: 'nb-e-commerce',
                routerLink: 'forms/boreportviewer/3',
            },
            {
                label: 'Legal Case Summary',
                icon: 'nb-e-commerce',
                routerLink: 'forms/boreportviewer/4',
            },
            {
                label: 'Report Config',
                icon: 'nb-e-commerce',
                routerLink: 'forms/boreport-list',
            },
            {
                label: 'Table Config',
                icon: 'nb-e-commerce',
                routerLink: 'forms/botableconfiguration-list',
            },
            {
                label: 'Master Detail Table Config',
                icon: 'nb-e-commerce',
                routerLink: 'forms/botable-list',
            },
            {
                label: 'bobranchmaster',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bobranchmaster-list',
            },
            {
                label: 'Company',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list',
            },
            {
                label: 'User Role Alone',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/1',
            },
            {
                label: 'Holidays Alone',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/2',
            },
            {
                label: 'fin alone',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/3',
            },
            {
                label: 'role & holidays',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/1,2',
            },
            {
                label: 'holiday & fin',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/2,3',
            },
            {
                label: 'role & fin',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocompanymaster-list/show/1,3',
            },

            {
                label: 'bocountry',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bocountry-list',
            },

            {
                label: 'bokbmaster',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bokbmaster-list',
            },
            {
                label: 'bousermasterx',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bousermaster-list',
            },
            {
                label: 'bonotificationsetting',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bonotificationsetting-list',
            },
            {
                label: 'bomasterdata',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bomasterdata-list',
            },

            {
                label: 'bomasterdatatype',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bomasterdatatype-list',
            },

            {
                label: 'bomenumaster',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bomenumaster-list',
            },

            {
                label: 'bostate-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bostate-list',
            },
            {
                label: 'bousermaster',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bousermaster-list',
            },
            {
                label: 'bouserrolemaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/bouserrolemaster-list',
            },
            {
                label: 'legalcase-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalcase-list',
            },
            {
                label: 'legalcourtmaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalcourtmaster-list',
            },
            {
                label: 'legalcourtprocessmaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalcourtprocessmaster-list',
            },
            {
                label: 'legalcustomermaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalcustomermaster-list',
            },
            {
                label: 'legalinterdepartmentquery-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalinterdepartmentquery-list',
            },
            {
                label: 'legallawyermaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legallawyermaster-list',
            },
            {
                label: 'legalmatter-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legalmatter-list',
            },
            {
                label: 'legaltaskmaster-list',
                icon: 'nb-e-commerce',
                routerLink: 'forms/legaltaskmaster-list',
            },









            {
                label: 'itemcategory',
                icon: 'nb-e-commerce',
                routerLink: '/pages/itemcategory',
            },



            {
                label: 'E-commerce',
                icon: 'nb-e-commerce',
                routerLink: '/pages/dashboard',

            },
            {
                label: 'IoT Dashboard',
                icon: 'nb-home',
                routerLink: '/pages/iot-dashboard',
            },
            {
                label: 'FEATURES',
                separator: true,
            },
            {
                label: 'Extra Components',
                icon: 'nb-star',
                items: [
                    {
                        label: 'Calendar',
                        routerLink: '/pages/extra-components/calendar',
                    },
                    {
                        label: 'Stepper',
                        routerLink: '/pages/extra-components/stepper',
                    },
                    {
                        label: 'List',
                        routerLink: '/pages/extra-components/list',
                    },
                    {
                        label: 'Infinite List',
                        routerLink: '/pages/extra-components/infinite-list',
                    },
                    {
                        label: 'Form Inputs',
                        routerLink: '/pages/extra-components/form-inputs',
                    },
                    {
                        label: 'Accordion',
                        routerLink: '/pages/extra-components/accordion',
                    },
                    {
                        label: 'Progress Bar',
                        routerLink: '/pages/extra-components/progress-bar',
                    },
                    {
                        label: 'Spinner',
                        routerLink: '/pages/extra-components/spinner',
                    },
                    {
                        label: 'this.sharedService.alert',
                        routerLink: '/pages/extra-components/this.sharedService.alert',
                    },
                    {
                        label: 'Tree',
                        routerLink: '/pages/extra-components/tree',
                    },
                    {
                        label: 'Tabs',
                        routerLink: '/pages/extra-components/tabs',
                    },
                    {
                        label: 'Calendar Kit',
                        routerLink: '/pages/extra-components/calendar-kit',
                    },
                    {
                        label: 'Chat',
                        routerLink: '/pages/extra-components/chat',
                    },
                ],
            },
            {

                label: 'Forms',
                icon: 'nb-compose',
                items: [
                    {
                        label: 'Item Category',
                        routerLink: '/pages/forms/itemcategory',
                    },
                    {
                        label: 'columnvisibility',
                        routerLink: '/pages/forms/columnvisibility',
                    },
                    {
                        label: 'CustomFieldConfiguration',
                        routerLink: '/pages/forms/customfieldconfiguration',
                    },
                    {
                        label: 'InventoryType',
                        routerLink: '/pages/forms/inventorytype',
                    },
                    {
                        label: 'Parameter',
                        routerLink: '/pages/forms/parameter',
                    },
                    {
                        label: 'UOM',
                        routerLink: '/pages/forms/uom',
                    },
                    {
                        label: ' SerialKeyParameter',
                        routerLink: '/pages/forms/serialkeyparameter',
                    },
                    {
                        label: 'PRSMaster',
                        routerLink: '/pages/forms/prsmasters/prsmaster',
                    },
                    {
                        label: 'UserMaster',
                        routerLink: '/pages/forms/usermaster',
                    },
                    {
                        label: 'ItemMaster',
                        routerLink: '/pages/forms/itemmaster',
                    },
                    {
                        label: 'Form Inputs',
                        routerLink: '/pages/forms/inputs',
                    },
                    {
                        label: 'Form Layouts',
                        routerLink: '/pages/forms/layouts',
                    },
                    {
                        label: 'Buttons',
                        routerLink: '/pages/forms/buttons',
                    },
                    {
                        label: 'Datepicker',
                        routerLink: '/pages/forms/datepicker',
                    },
                ],
            },
            {
                label: 'UI Features',
                icon: 'nb-keypad',
                routerLink: '/pages/ui-features',
                items: [
                    {
                        label: 'Grid',
                        routerLink: '/pages/ui-features/grid',
                    },
                    {
                        label: 'Icons',
                        routerLink: '/pages/ui-features/icons',
                    },
                    {
                        label: 'Typography',
                        routerLink: '/pages/ui-features/typography',
                    },
                    {
                        label: 'Animated Searches',
                        routerLink: '/pages/ui-features/search-fields',
                    },
                ],
            },
            {
                label: 'Modal & Overlays',
                icon: 'nb-layout-default',
                items: [
                    {
                        label: 'Dialog',
                        routerLink: '/pages/modal-overlays/dialog',
                    },
                    {
                        label: 'Window',
                        routerLink: '/pages/modal-overlays/window',
                    },
                    {
                        label: 'Popover',
                        routerLink: '/pages/modal-overlays/popover',
                    },
                    {
                        label: 'Toastr',
                        routerLink: '/pages/modal-overlays/toastr',
                    },
                    {
                        label: 'Tooltip',
                        routerLink: '/pages/modal-overlays/tooltip',
                    },
                ],
            },
            {
                label: 'Bootstrap',
                icon: 'nb-gear',
                items: [
                    {
                        label: 'Form Inputs',
                        routerLink: '/pages/bootstrap/inputs',
                    },
                    {
                        label: 'Buttons',
                        routerLink: '/pages/bootstrap/buttons',
                    },
                    {
                        label: 'Modal',
                        routerLink: '/pages/bootstrap/modal',
                    },
                ],
            },
            {
                label: 'Maps',
                icon: 'nb-location',
                items: [
                    {
                        label: 'Google Maps',
                        routerLink: '/pages/maps/gmaps',
                    },
                    {
                        label: 'Leaflet Maps',
                        routerLink: '/pages/maps/leaflet',
                    },
                    {
                        label: 'Bubble Maps',
                        routerLink: '/pages/maps/bubble',
                    },
                    {
                        label: 'Search Maps',
                        routerLink: '/pages/maps/searchmap',
                    },
                ],
            },
            {
                label: 'Charts',
                icon: 'nb-bar-chart',
                items: [
                    {
                        label: 'Echarts',
                        routerLink: '/pages/charts/echarts',
                    },
                    {
                        label: 'Charts.js',
                        routerLink: '/pages/charts/chartjs',
                    },
                    {
                        label: 'D3',
                        routerLink: '/pages/charts/d3',
                    },
                ],
            },
            {
                label: 'Editors',
                icon: 'nb-title',
                items: [
                    {
                        label: 'TinyMCE',
                        routerLink: '/pages/editors/tinymce',
                    },
                    {
                        label: 'CKEditor',
                        routerLink: '/pages/editors/ckeditor',
                    },
                ],
            },
            {
                label: 'Tables',
                icon: 'nb-tables',
                items: [
                    {
                        label: 'itemcategory-list',
                        routerLink: '/pages/forms/itemcategory-list',
                    },
                    {
                        label: 'functionmaster-list',
                        routerLink: '/pages/forms/functionmaster-list',
                    },
                    {
                        label: 'prsmaster-list',
                        routerLink: '/pages/forms/prsmaster-list',
                    },
                    {
                        label: 'itemmaster-list',
                        routerLink: '/pages/forms/itemmaster-list',
                    },
                    {
                        label: 'uom-list',
                        routerLink: '/pages/forms/uom-list',
                    },
                    {
                        label: 'boconfigvalue-list',
                        routerLink: '/pages/forms/boconfigvalue-list',
                    },
                    {
                        label: 'customfieldconfiguration-list',
                        routerLink: '/forms/customfieldconfiguration-list',
                    },
                    {
                        label: 'inventorytype-list',
                        routerLink: '/pages/forms/inventorytype-list',
                    },
                    {
                        label: 'iworkflow-list',
                        routerLink: '/pages/forms/workflow-list',
                    },
                    {
                        label: 'Smart Table',
                        routerLink: '/pages/forms/smart-table',
                    },

                ],
            },
            {
                label: 'Miscellaneous',
                icon: 'nb-shuffle',
                items: [
                    {
                        label: '404',
                        routerLink: '/pages/miscellaneous/404',
                    },
                ],
            },
            /*
            {
              label: 'auth',
              icon: 'nb-locked',
              items: [
                {
                  label: 'Login',
                  routerLink: '/auth/login',
                },
                {
                  label: 'Register',
                  routerLink: '/auth/register',
                },
                {
                  label: 'Request Password',
                  routerLink: '/auth/request-password',
                },
                {
                  label: 'Reset Password',
                  routerLink: '/auth/reset-password',
                },
              ],
            },
          */
        ]
    }


];


