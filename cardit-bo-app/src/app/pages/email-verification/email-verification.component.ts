import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { defaultSpTokenResolver, Auth } from './../../service/auth.service';


@Component({
  selector: 'email-verification',
  template: `<ng-template #defaultTemplate>
<div class="row">
  <div class="col-sm-offset-4 col-xs-12 col-sm-4">
    <p *ngIf="verifying" class="this.sharedService.alert this.sharedService.alert-warning">We are verifying your account</p>
    <p *ngIf="verified" class="this.sharedService.alert this.sharedService.alert-success">
      Your account has has been verified!  You may now login.
    </p>
    <div *ngIf="verificationFailed" class="this.sharedService.alert this.sharedService.alert-danger">
      This email verification link is not valid.  Please request a new email verification link.
    </div>
    <p class="text-danger" *ngIf="error">{{error}}</p>
  </div>
</div>
</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</ng-template>`
})
@Injectable()
export class EmailVerificationComponent implements OnInit {
  /**
   * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
   * ```
   * <ng-template #customTemplate>
   *   // custom HTML with login form
   * </ng-template>
   * ```
   * Then pass customTemplate to the `email-verification` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;

  protected error: string;
  protected verifying: boolean;
  protected verified: boolean;
  protected verificationFailed: boolean;
  protected sptoken: string;

  constructor(public auth: Auth, public location: Location) {
  }

  ngOnInit(): void {
    this.verifying = false;
    this.verified = false;
    this.verificationFailed = false;
    this.sptoken = this.spTokenResolver();
    if (this.sptoken) {
      this.verify();
    }
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    this.verifying = true;
    this.auth.verifyEmailVerificationToken(this.sptoken)
      .subscribe(() => {
        this.verifying = false;
        this.verified = true;
      }, (error) => {
        this.verifying = false;
        if (error.status && error.status === 404) {
          this.verificationFailed = true;
        } else {
          this.error = error.message;
        }
      });
  }
}
