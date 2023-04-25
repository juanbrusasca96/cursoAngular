import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Alumno } from 'src/app/models';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription, debounceTime, from, map, of, takeUntil } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { FormControl } from '@angular/forms';
import { Alumno, AlumnoService } from 'src/app/services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';

// const alumnos: Alumno[] = [
//   new Alumno(1, 'Megumi', 'Fushiguro', 'megumi@gmail.com', 15, true, new Date('1994-01-03')),
//   new Alumno(2, 'Nobara', 'Kigusaki', 'nobara@gmail.com', 16, true, new Date('1994-01-03')),
//   new Alumno(3, 'Yuji', 'Itadori', 'yiji@gmail.com', 15, false, new Date('1994-01-03')),
//   new Alumno(4, 'Toge', 'Inumaki', 'toge@gmail.com', 17, true, new Date('1994-01-03')),
//   new Alumno(5, 'Panda', '', 'panda@gmail.com', 99999, true, new Date('1994-01-03')),
//   new Alumno(6, 'Maki', 'Zenin', 'maki@gmail.com', 16, true, new Date('1994-01-03')),
// ];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'eliminar', 'editar', 'ver_detalle'];
  dataSource: Alumno[] = [];
  alumnos$: Observable<Alumno[]>;
  subscriptionRef: Subscription;
  search: string = '';
  private destroyed$ = new Subject()

  constructor(private matDialog: MatDialog, private apiService: ApiServiceService, private alumnoService: AlumnoService, private router: Router, private activateRoute: ActivatedRoute) {
    this.alumnos$ = this.alumnoService.getAlumnos('')
    this.subscriptionRef = this.alumnoService.getAlumnos('').subscribe((alumnos) => {
      this.dataSource = alumnos
    })
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
