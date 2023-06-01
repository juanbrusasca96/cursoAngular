import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  AlumnoService } from 'src/app/core/services/alumno.service';
import { Subject, takeUntil } from 'rxjs';
import { Alumno } from 'src/app/core/models/alumno.model';

@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.scss']
})
export class AlumnoDetalleComponent implements OnDestroy {
  alumno: Alumno | undefined = undefined;
  private destroyed$ = new Subject()

  constructor(private activatedRoute: ActivatedRoute, private alumnoService: AlumnoService) {
    this.alumnoService.obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id'])).pipe(takeUntil(this.destroyed$)).subscribe((alumno) => this.alumno = alumno)
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
