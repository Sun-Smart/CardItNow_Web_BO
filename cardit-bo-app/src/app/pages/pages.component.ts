import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
      <router-outlet></router-outlet>
  `,
})

export class PagesComponent implements OnInit {
  menu = [];


  constructor() {



  }
  ngOnInit(): void {
  }

}
