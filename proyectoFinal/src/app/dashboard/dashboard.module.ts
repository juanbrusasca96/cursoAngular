import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from '../shared/directives/directives.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { CursosComponent } from './pages/cursos/cursos.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AlumnosModule,
    DirectivesModule,
    RouterModule.forChild([
      {
        path: 'alumnos',
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule)
      },
      {
        path:'inscripciones',
        loadChildren:()=>import('./pages/inscripciones/inscripciones.module').then((m)=>m.InscripcionesModule)
      }
    ]),
    MatListModule,
    CursosModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
