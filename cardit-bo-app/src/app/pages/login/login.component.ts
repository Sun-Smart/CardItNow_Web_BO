import { Component, OnInit } from '@angular/core';

//import { UserDataService } from '../core/services/user-data.service';
import { bousermaster } from './../../model/bousermaster.model';
import { bousermasterService } from './../../service/bousermaster.service';
//import { User } from '../core/models/user.model';
import { ToastService } from '../core/services/toast.service';
import { RouteStateService } from '../core/services/route-state.service';
import { SessionService } from '../core/services/session.service';
import { ThemeService } from '../core/services/theme.service';
//import { TranslateService } from '@ngx-translate/core';
import { UserContextService } from '../core/services/user-context.service';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

declare var window: any;
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {
    loadingspinner:boolean=false;
    bologinForm: FormGroup;
    private readonly minlengthPassword = 10;
    locale: string;
    theme: string;
    nandhini:any;
    loggedIn: boolean = false;
    sessiondata: any;
    hideye:boolean =true;
    showeye:boolean=true;
    password:any;
    fieldTextType: boolean;
    passvalidation:boolean;
    constructor(public sharedService: SharedService, private translate: TranslateService,
        private spinner: NgxSpinnerService,
        private fb: FormBuilder,
        private userService: bousermasterService,
        private toastService: ToastService,
        private routeStateService: RouteStateService,
        public sessionService: SessionService,
        //public translate: TranslateService,
        private themeService: ThemeService,
        private userContextService: UserContextService,
        private router: Router,
    ) {
        this.bologinForm = this.fb.group({
            email: [null],
            password: [null]
        });
        this.translate.setDefaultLang('en');
        this.theme = "omega";
    }

    ngOnInit() {
        this.nandhini=[{'name':'778'},{'name':'8990'}];
console.log(this.password);
        this.locale = this.sessionService.getItem("ng-prime-language");
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });
        /*
        this.sessiondata = this.sessionService.getSession();
        if(this.sessiondata!="")this.loggedIn=true;
        if(this.loggedIn)this.router.navigate(['/home']);
        */
    }
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }
    test1() {
        this.passvalidation = false
    }
    onSubmit() {
        debugger;
        this.loadingspinner=true;
        //let user: bousermaster = this.userService.getUserByUserNameAndPassword(this.bologinForm.get('username').value, this.bologinForm.get('password').value);
        this.userService.login(this.bologinForm.get('email').value, this.bologinForm.get('password').value, window.location.host).then((res: any) => {
            debugger;
            console.log(res);
            this.loadingspinner=false;
            this.toastService.addSingle("success", "", "Login successfully.");
            let user: any = res;
            if (user) {
                this.userContextService.setUser(user.token);
                // this language will be used as a fallback when a translation isn't found in the current language



                //debugger;
                let loginuser = this.sessionService.getSession();
                console.log(loginuser);
                var language = loginuser.language;
                if (language != null && language.length > 0) {
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    this.sharedService.translate.use(language);

                } else {
                    this.sessionService.setItem("language", "en");
                }
                this.sessionService.setItem("countrycode", loginuser.countrycode);
                this.sessionService.setItem("selected-theme", this.theme);
                this.sessionService.setItem("selected-layout", loginuser.layoutpage);
                this.themeService.selectTheme(loginuser.theme);
                this.sessionService.setItem("Email",loginuser.email[0]);
                this.sessionService.setItem("userId",loginuser.userid);
                this.sessionService.setItem("userName",loginuser.username);
                
                if (loginuser.defaultpage == null || !loginuser.defaultpage)
                    //this.routeStateService.add("Home", '/home/showdashboard/1', null, true);
                    this.router.navigate(['/home']);
                //
                else
                    //this.routeStateService.add("Home", loginuser.defaultpage, null, true);
                    this.router.navigate(['/home']);
                //this.router.navigate([loginuser.defaultpage]);
                //
                return;
            }
            this.toastService.addSingle('error', '', 'Invalid user.');
            return;
        });


    }
    selectTheme(theme: string) {
        this.sessionService.setItem("selected-theme", theme);
        this.themeService.selectTheme(theme);
    }
    onLanguageChange($event) {
        this.locale = $event.target.value;
        if (this.locale == undefined || this.locale == null || this.locale.length == 0) {
            this.locale = "en";
        }
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        //this.translate.use(this.locale);
        this.sessionService.setItem("ng-prime-language", this.locale);
    }
    private onValueChanged(data?: any): void {
        if (!this.bologinForm) { return; }

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = this.bologinForm.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'email': '',
        'password': ''
    };

    validationMessages = {
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least ' + this.minlengthPassword + ' characters long.'
        }
    };
  
}
