import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { ListLocationComponent } from './views/location/list-location/list-location.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NewLocationComponent } from './views/location/new-location/new-location.component';
import { ListAcquisitionMethodComponent } from './views/acquisition-method/list-acquisition-method/list-acquisition-method.component';
import { ListPatrimonyComponent } from './views/patrimony/list-patrimony/list-patrimony.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthService],
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'patrimonios',
        component: ListPatrimonyComponent
      },
      {
        path: 'localizacoes',
        component: ListLocationComponent
      },
      {
        path: 'localizacoes/novo',
        component: NewLocationComponent
      },
      {
        path: 'metodos-aquisicao',
        component: ListAcquisitionMethodComponent
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
