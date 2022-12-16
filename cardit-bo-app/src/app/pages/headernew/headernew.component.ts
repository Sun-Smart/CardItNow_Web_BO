import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headernew',
  templateUrl: './headernew.component.html',
  styleUrls: ['./headernew.component.scss']
})
export class HeadernewComponent implements OnInit {
  nandhini:any;
  constructor() { }

  ngOnInit(): void {
    this.nandhini=[{'name':'778'},{'name':'8990'}];
  }

}
