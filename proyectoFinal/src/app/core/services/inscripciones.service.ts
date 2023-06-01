import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';
import { Materia } from '../models/materias.model';
import { Inscripcion } from '../models/inscripciones.module';

@Injectable({
    providedIn: 'root'
})
export class InscripcionesService {

    private inscripciones$ = new BehaviorSubject<Inscripcion[]>([]);

    constructor(private httpClient: HttpClient) { }

    get inscripciones(): Observable<Inscripcion[]> {
        return this.inscripciones$.asObservable()
    }

    obtenerInscripciones(): Observable<Inscripcion[]> {
        return this.httpClient.get<Inscripcion[]>(`${enviroment.apiSecondBaseUrl}/inscripciones`)
            .pipe(
                tap((inscripciones) => this.inscripciones$.next(inscripciones)),
                mergeMap(() => this.inscripciones$.asObservable())
            );
    }

    getInscripcionById(inscripcionId: number): Observable<Inscripcion | undefined> {
        return this.inscripciones$.asObservable()
            .pipe(
                map((inscripciones) => inscripciones.find((i) => i.id === inscripcionId))
            )
    }
}