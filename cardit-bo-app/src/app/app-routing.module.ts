import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule, enableProdMode } from '@angular/core';
import { AuthGuard } from './pages/core/gaurds/auth.gaurd';
import { LoginComponent } from './pages/login/login.component';

import { mainComponent } from './pages/main/main.component';
import { MultiFormComponent } from './pages/layout/multiform/multiform.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LayoutComponent } from './pages/layout/layout/layout.component';


import { CanDeactivateGuard } from './pages/common/unsaved-changes';
import { CanActivateGuard } from './pages/common/canactivate';

import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResendEmailVerificationComponent } from './pages/resend-email-verification/resend-email-verification.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { NewheaderComponent } from './pages/layout/newheader/newheader.component';




enableProdMode();

const routes: Routes = [


    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    //component: LayoutComponent,

    {
        // path: 'home', component: LayoutComponent
        path: 'home', component: LayoutComponent, loadChildren: () => import('./app.layout.module').then(m => m.NgPrimeModule)

    },

    {
        path: 'workflow',
        loadChildren: () => import('./app.workflowlayout.module').then(m => m.NgWorkFlowModule)

    },


    { path: 'login', component: LoginComponent, },
    { path: 'forgotpassword', component: ForgotPasswordComponent, },
    { path: 'resendemail', component: ResendEmailVerificationComponent, },
    { path: 'resetpassword', component: ResetPasswordComponent, },
    { path: 'emailverify', component: EmailVerificationComponent, },
    {path:'newheader',component:NewheaderComponent},
    { path: 'register', component: RegisterUserComponent, },


    { path: '', redirectTo: 'login', pathMatch: 'full' },

];


const config: ExtraOptions = {
    useHash: true,
    onSameUrlNavigation: 'reload',
    //enableTracing: true
};

@NgModule({
    imports: [
        RouterModule.forRoot(routes, config)

    ],
    declarations: [

        //LayoutComponent
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
export const APP_ROUTER_PROVIDERS = [
    // provideRouter(routes),
    CanDeactivateGuard,
    CanActivateGuard
];
