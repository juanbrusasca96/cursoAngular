import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from, map } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private _alumnos$ = new Subject<Alumno[]>

  constructor() {
  }

  getAlumnos(filter: string): Observable<Alumno[]> {
    return from(this.getData(filter))
  }

  async getData(filter: string): Promise<Alumno[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    const alumnos: Alumno[] = []
    for (let i = 0; i < data.length; i++) {
      alumnos.push({
        id: data[i].id,
        name: data[i].name,
        username: data[i].username,
        email: data[i].email,
        phone: data[i].phone
      })
    }
    return alumnos.filter(value => value.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return from(this.getData('')).pipe(
      map((alumnos) => alumnos.find((a) => a.id === id))
    )
  }
}
