import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, from, map } from 'rxjs';

export interface Alumno {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private _alumnos$ = new Subject<Alumno[]>

  constructor() {
    // this._alumnos$ = from(this.getData())
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
}
