import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    console.log('canActivate called');
    //this.router.navigate(['/c']);
    return false;
  }

}
