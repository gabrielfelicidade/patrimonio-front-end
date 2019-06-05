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
import { UserLevel } from './constants/user-level.enum';
import { WriteOffPatrimonyComponent } from './views/patrimony/write-off-patrimony/write-off-patrimony.component';
import { PerformWriteOffPatrimonyComponent } from './views/patrimony/perform-write-off-patrimony/perform-write-off-patrimony.component';
import { ChangePasswordComponent } from './views/user/change-password/change-password.component';
import { LogComponent } from './views/log/log.component';

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
    children: [
      {
        path: 'home',
        component: DashboardComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic
        }
      },
      {
        path: 'patrimonios',
        redirectTo: 'patrimonios/consulta'
      },
      {
        path: 'patrimonios/consulta',
        component: ListPatrimonyComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic,
          canEdit: UserLevel.Intermediary
        }
      },
      {
        path: 'patrimonios/baixa',
        component: PerformWriteOffPatrimonyComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic,
          canEdit: UserLevel.Intermediary
        }
      },
      {
        path: 'patrimonios/baixados',
        component: WriteOffPatrimonyComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic
        }
      },
      {
        path: 'patrimonios/novo',
        component: NewPatrimonyComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'patrimonios/:id',
        component: NewPatrimonyComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'localizacoes',
        redirectTo: 'localizacoes/consulta'
      },
      {
        path: 'localizacoes/consulta',
        component: ListLocationComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic,
          canEdit: UserLevel.Intermediary
        }
      },
      {
        path: 'localizacoes/novo',
        component: NewLocationComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'localizacoes/:id',
        component: NewLocationComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'metodos-aquisicao',
        redirectTo: 'metodos-aquisicao/consulta'
      },
      {
        path: 'metodos-aquisicao/consulta',
        component: ListAcquisitionMethodComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic,
          canEdit: UserLevel.Intermediary
        }
      },
      {
        path: 'metodos-aquisicao/novo',
        component: NewAcquisitionMethodComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'metodos-aquisicao/:id',
        component: NewAcquisitionMethodComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Intermediary
        }
      },
      {
        path: 'usuarios',
        redirectTo: 'usuarios/consulta'
      },
      {
        path: 'usuarios/consulta',
        component: ListUserComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Administrator
        }
      },
      {
        path: 'usuarios/novo',
        component: NewUserComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Administrator
        }
      },
      {
        path: 'usuarios/:id',
        component: NewUserComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Administrator
        }
      },
      {
        path: 'alterar-senha',
        component: ChangePasswordComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic
        }
      },
      {
        path: 'logs',
        component: LogComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Administrator
        }
      },
      {
        path: 'sair',
        component: LogoutComponent,
        canActivate: [AuthService],
        data: {
          canSee: UserLevel.Basic
        }
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
