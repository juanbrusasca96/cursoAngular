import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap, mergeMap } from 'rxjs';
import { CrearCursoPayload, Curso } from '../models/cursos.model';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Curso[]>([]);

  constructor(private httpClient: HttpClient) { }

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable()
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${enviroment.apiBaseUrl}/Cursos`)
      .pipe(
        tap((cursos) => this.cursos$.next(cursos)),
        mergeMap(() => this.cursos$.asObservable())
      );
  }

  getCursoById(cursoId: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((cursos) => cursos.find((c) => c.id === cursoId))
      )
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          this.cursos$.next([
            ...cursos,
            {
              id: cursos.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => { },
        error: () => { }
      });

    return this.cursos$.asObservable();
  }

  editarCurso(cursoId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1),
      )
      .subscribe({
        next: (cursos) => {

          const cursosActualizados = cursos.map((curso) => {
            if (curso.id === cursoId) {
              return {
                ...curso,
                ...actualizacion,
              }
            } else {
              return curso;
            }
          })

          this.cursos$.next(cursosActualizados);
        },
        complete: () => { },
        error: () => { }
      });

    return this.cursos$.asObservable();
  }


  eliminarCurso(cursoId: number): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          const cursosActualizados = cursos.filter((curso) => curso.id !== cursoId)
          this.cursos$.next(cursosActualizados);
        },
        complete: () => { },
        error: () => { }
      });

    return this.cursos$.asObservable();
  }
}
