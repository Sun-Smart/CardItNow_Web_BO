import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Injectable } from '@angular/core';
/*export class CanDeactivateGuard {

  canDeactivate() {
    if (confirm('Do you want to exit the page?')) {
        return Observable.of(true);
    } else {
        return Observable.of(false);
    }      
    //this.sharedService.alert('canDeactivate called');

    //return Observable.of(false);
    //return false;
  }

}
*/
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (component != null) {
      let url: string = state.url;
      console.log('Url: ' + url);

      console.log('component.canDeactivate: ' + component.canDeactivate);

      return component.canDeactivate ? component.canDeactivate() : true;
    }
  }
}