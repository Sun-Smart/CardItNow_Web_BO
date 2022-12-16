
import { Component, OnInit, forwardRef } from '@angular/core';
import { Router, } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class mainComponent implements OnInit {

  url: any;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,) {

  }
  async ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("#/login");
  }

}