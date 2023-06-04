import { Component } from '@angular/core';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription, map, takeUntil } from 'rxjs';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/models/usuario.models';

@Component({
  selector: 'app-tables',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'eliminar', 'editar'];
  dataSource: Alumno[] = [];
  alumnos$: Observable<Alumno[]>;
  subscriptionRef: Subscription;
  search: string = '';
  private destroyed$ = new Subject()
  authUser$: Observable<Usuario | null>;

  constructor(private matDialog: MatDialog, private alumnoService: AlumnoService, private router: Router, private activateRoute: ActivatedRoute, private authService: AuthService) {
    this.alumnos$ = this.alumnoService.getAlumnos('')
    this.subscriptionRef = this.alumnoService.getAlumnos('').subscribe((alumnos) => {
      this.dataSource = alumnos
    })
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  filterData(event: any) {
    const filterString = this.search.toLowerCase();
    this.alumnos$.pipe(
      takeUntil(this.destroyed$),
      map((alumnos: Alumno[]) => alumnos)
    ).subscribe((alumnos: Alumno[]) => {
      this.dataSource = alumnos.filter(value => value.name.toLocaleLowerCase().includes(filterString))
    })
  }

  ngOnDestroy() {
    this.subscriptionRef.unsubscribe();
    this.destroyed$.next(true)
  }

  abrirABMAlumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource = [
          ...this.dataSource,
          { id: this.dataSource.length + 1, name: valor.name, username: valor.username, email: valor.email, phone: valor.phone }
        ]
      }
    })
  }

  eliminarAlumno(alumnoParaEliminar: Alumno): void {
    this.dataSource = this.dataSource.filter((alumnmoActual) => alumnmoActual.id !== alumnoParaEliminar.id)
  }

  editarAlumno(alumnoParaEditar: Alumno): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent, {
      data: {
        alumnoParaEditar
      }
    });
    dialog.afterClosed().subscribe((dataDelAlumnoEditado) => {
      console.log(dataDelAlumnoEditado);

      if (dataDelAlumnoEditado) {
        this.dataSource = this.dataSource.map((alumnoActual) => alumnoActual.id === alumnoParaEditar.id ? ({ ...alumnoActual, ...dataDelAlumnoEditado }) : alumnoActual)
      }
    })
  }

  irAlDetalle(alumnoID: number): void {
    this.router.navigate([alumnoID],
      {
        relativeTo: this.activateRoute
      })
  }
}
