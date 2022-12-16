import { Component, Injectable, OnInit, TemplateRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PasswordResetRequest, Auth, defaultSpTokenResolver } from './../../service/auth.service';
import { SessionService } from '../../pages/core/services/session.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'reset-password',
  template: `<ng-template #defaultTemplate>
<div class="row">
  <div class="col-sm-offset-4 col-xs-12">
    <p *ngIf="verifying" class="this.sharedService.alert this.sharedService.alert-warning text-center">We are verifying your password reset link</p>
    <p class="this.sharedService.alert this.sharedService.alert-success" *ngIf="reset">Your new password has been set, you may now login.</p>
    <div *ngIf="verificationFailed" class="this.sharedService.alert this.sharedService.alert-danger">
      This password reset link is not valid, please request a new reset link.
    </div>
  </div>
</div>
<div class="row center">
  <div class="col-xs-12">
    <form class="form-horizontal" *ngIf="verified && !reset" (ngSubmit)="onSubmit()" autocomplete="off">
      <div class="form-group">
        <label for="spUsername" class="col-xs-12 control-label">New Password</label>
        <div class="col-xs-12">
          <input class="form-control" name="password"  id="password" [(ngModel)]="formModel.password"
                 placeholder="New Password" type="password" [disabled]="posting">
        </div>
      </div>
      <div class="form-group">
        <label for="spPassword" class="col-xs-12 control-label">Confirm New Password</label>
        <div class="col-xs-12">
          <input class="form-control" name="confirmPassword" id="confirmPassword" [(ngModel)]="formModel.confirmPassword"
                 placeholder="Confirm New Password" type="password" [disabled]="posting">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-4">
          <p class="this.sharedService.alert this.sharedService.alert-danger" *ngIf="error">{{error}}</p>
          <button type="submit" class="btn btn-primary" [disabled]="posting">Set New Password</button>
        </div>
      </div>
    </form>
  </div>
</div>
</ng-template>
<ng-template
  [ngTemplateOutlet]="customTemplate || defaultTemplate">
</ng-template>`
})
@Injectable()
export class ResetPasswordComponent implements OnInit {
  /**
   * A reference to a `<ng-template>` tag that if set will override this component's template. Use like so:
   * ```
   * <ng-template #customTemplate>
   *   // custom HTML with login form
   * </ng-template>
   * ```
   * Then pass customTemplate to the `reset-password` component like so `[customTemplate]="customTemplate"`
   */
  @Input() customTemplate: TemplateRef<any>;
  protected disabled: boolean;
  protected error: string;
  protected formModel: PasswordResetRequest;
  protected posting: boolean;
  protected reset: boolean;
  protected verifying: boolean;
  protected verified: boolean;
  protected verificationFailed: boolean;
  protected sptoken: string;

  constructor(public sharedService: SharedService, public auth: Auth, public location: Location, public sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.verifying = false;
    this.verified = false;
    this.verificationFailed = false;

    // //debugger
    console.log(this.sessionService.getItem("currentUser"));
    console.log(this.sharedService.JSON_parse(this.sessionService.getItem("currentUser")));
    var sptoken = this.spTokenResolver();
    //debugger;
    if (sptoken == "") {
      this.formModel = {
        sptoken: this.sharedService.JSON_parse(this.sessionService.getItem("currentUser")),
        password: ''
      };
      this.verified = true;
    }
    else if (sptoken != "") {
      this.formModel = {
        sptoken: this.spTokenResolver(),
        password: ''
      };
      this.verify();
    }

    console.log(this.formModel);
  }

  spTokenResolver(): string {
    return defaultSpTokenResolver(this.location);
  }

  verify(): void {
    //debugger;
    this.verifying = true;
    this.auth.verifyPasswordResetToken(this.formModel.sptoken)
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

  send(): void {
    //debugger;
    this.auth.resetPassword(this.formModel)
      .subscribe(
        () => {
          this.posting = false;
          this.reset = true;
        },
        (error) => {
          this.posting = false;
          this.error = error.message;
        }
      );
  }

  onSubmit(): void {
    this.send();
  }
}
