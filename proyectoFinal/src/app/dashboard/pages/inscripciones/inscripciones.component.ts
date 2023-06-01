import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { Observable, Subscription } from 'rxjs';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { State } from './store/inscripciones.reducer';
import { MateriasService } from 'src/app/core/services/materias.service';
import { AlumnoService } from 'src/app/core/services/alumno.service';
import { MatTableDataSource } from '@angular/material/table';
import { Materia } from 'src/app/core/models/materias.model';
import { Alumno } from 'src/app/core/models/alumno.model';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit, OnDestroy {
  state$: Observable<State>;

  dataSource = new MatTableDataSource()
  materiasArray: Materia[] = []
  alumnosArray: Alumno[] = []

  displayedColumns = ['id', 'alumno', 'esta_inscripto_a']

  materiasSubscription: Subscription | null = null;
  alumnosSubscription: Subscription | null = null;
  inscripcionesSubscription: Subscription | null = null;

  constructor(private materiasService: MateriasService, private alumnosService: AlumnoService, private store: Store) {
    this.state$ = this.store.select(selectInscripcionesState);
  }


  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.materiasSubscription = this.materiasService.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materiasArray = materias;
        this.alumnosSubscription = this.alumnosService.getAlumnos('').subscribe({
          next: (alumnos) => {
            this.alumnosArray = alumnos
            this.inscripcionesSubscription = this.state$.subscribe({
              next: (inscripciones) => {
                this.dataSource.data = inscripciones.inscripciones.map((i) => ({ ...i, alumno: this.alumnosArray.find((a) => a.id == i.idAlumno), materia: this.materiasArray.find((m) => m.id == i.idMateria) }))
              }
            })
          }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.materiasSubscription?.unsubscribe();
    this.alumnosSubscription?.unsubscribe();
    this.inscripcionesSubscription?.unsubscribe();
  }
}
