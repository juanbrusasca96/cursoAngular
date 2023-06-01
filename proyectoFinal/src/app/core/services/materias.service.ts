import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap, mergeMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';
import { Materia } from '../models/materias.model';

@Injectable({
    providedIn: 'root'
})
export class MateriasService {

    private materias$ = new BehaviorSubject<Materia[]>([]);

    constructor(private httpClient: HttpClient) { }

    get materias(): Observable<Materia[]> {
        return this.materias$.asObservable()
    }

    obtenerMaterias(): Observable<Materia[]> {
        return this.httpClient.get<Materia[]>(`${enviroment.apiSecondBaseUrl}/materias`)
            .pipe(
                tap((materias) => this.materias$.next(materias)),
                mergeMap(() => this.materias$.asObservable())
            );
    }

    getMateriaById(materiaId: number): Observable<Materia | undefined> {
        return this.materias$.asObservable()
            .pipe(
                map((materias) => materias.find((m) => m.id === materiaId))
            )
    }
}