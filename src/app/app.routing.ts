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
import { NewAcquisitionMethodComponent } from './views/acquisition-method/new-acquisition-method/new-acquisition-method.component';
import { NewPatrimonyComponent } from './views/patrimony/new-patrimony/new-patrimony.component';
import { LogoutComponent } from './views/logout/logout.component';
import { ListUserComponent } from './views/user/list-user/list-user.component';
import { NewUserComponent } from './views/user/new-user/new-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
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
        path: 'patrimonios/novo',
        component: NewPatrimonyComponent
      },
      {
        path: 'patrimonios/:id',
        component: NewPatrimonyComponent
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
        path: 'localizacoes/:id',
        component: NewLocationComponent
      },
      {
        path: 'metodos-aquisicao',
        component: ListAcquisitionMethodComponent
      },
      {
        path: 'metodos-aquisicao/novo',
        component: NewAcquisitionMethodComponent
      },
      {
        path: 'metodos-aquisicao/:id',
        component: NewAcquisitionMethodComponent
      },
      {
        path: 'usuarios',
        component: ListUserComponent
      },
      {
        path: 'usuarios/novo',
        component: NewUserComponent
      },
      {
        path: 'usuarios/:id',
        component: NewUserComponent
      },
      {
        path: 'sair',
        component: LogoutComponent
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
