import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListLocationComponent } from './views/location/list-location/list-location.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewLocationComponent } from './views/location/new-location/new-location.component';
import { ListAcquisitionMethodComponent } from './views/acquisition-method/list-acquisition-method/list-acquisition-method.component';
import { ListPatrimonyComponent } from './views/patrimony/list-patrimony/list-patrimony.component';
import { ToastrModule } from 'ngx-toastr';
import { NewAcquisitionMethodComponent } from './views/acquisition-method/new-acquisition-method/new-acquisition-method.component';
import { NewPatrimonyComponent } from './views/patrimony/new-patrimony/new-patrimony.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { LogoutComponent } from './views/logout/logout.component';
import { NewUserComponent } from './views/user/new-user/new-user.component';
import { ListUserComponent } from './views/user/list-user/list-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ng2-validation'
import { WriteOffPatrimonyComponent } from './views/patrimony/write-off-patrimony/write-off-patrimony.component';
import { PerformWriteOffPatrimonyComponent } from './views/patrimony/perform-write-off-patrimony/perform-write-off-patrimony.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InWriteOffPatrimonyComponent } from './views/patrimony/in-write-off-patrimony/in-write-off-patrimony.component';
import { ChangePasswordComponent } from './views/user/change-password/change-password.component';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { LogComponent } from './views/log/log.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CurrencyMaskModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    NgxDatatableModule,
    CustomFormsModule,
    NgbModalModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ListLocationComponent,
    ListAcquisitionMethodComponent,
    ListPatrimonyComponent,
    ListUserComponent,
    NewLocationComponent,
    NewAcquisitionMethodComponent,
    NewPatrimonyComponent,
    NewUserComponent,
    LogoutComponent,
    WriteOffPatrimonyComponent,
    PerformWriteOffPatrimonyComponent,
    InWriteOffPatrimonyComponent,
    ChangePasswordComponent,
    ConfirmModalComponent,
    LogComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    InWriteOffPatrimonyComponent,
    ConfirmModalComponent
  ]
})
export class AppModule { }
