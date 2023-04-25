import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablesComponent } from './dashboard/pages/tables/tables.component';
import { CardsComponent } from './dashboard/pages/cards/cards.component';
import { FormsComponent } from './dashboard/pages/forms/forms.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AlumnoDetalleComponent } from './dashboard/pages/tables/pages/alumno-detalle/alumno-detalle.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: TablesComponent
          },
          {
            path: ':id',
            component: AlumnoDetalleComponent
          }
        ]
      },
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'formularios',
        component: FormsComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
