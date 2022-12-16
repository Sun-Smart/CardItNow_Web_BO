import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastService } from '../pages/core/services/toast.service';
@Injectable()
export class ExceptionService {
  //options = {headers: new HttpHeaders({'Accept': 'application/json','Content-Type': 'application/json',Authorization:'Bearer ' + localStorage.getItem("currentUser")?.replace(/"/g, '')})};
  constructor(private toastService: ToastService) { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (
    errorResponse: any
  ) => {
    let res = <HttpErrorResponse>errorResponse;
    let err = res;
    let emsg = err
      ? err.error
        ? err.error
        : JSON.stringify(err)
      : res.statusText || 'unknown error';
    console.log(`Error - Bad Response - ${emsg}`);
    return of(false);
  };
}