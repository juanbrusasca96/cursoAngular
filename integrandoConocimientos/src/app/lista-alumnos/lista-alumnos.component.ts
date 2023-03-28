import { Component, OnInit } from '@angular/core';
import { Alumno } from '../models';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {
  public alumnos: Alumno[] = [
    new Alumno(1, 'Megumi', 'Fushiguro', 'megumi@gmail.com', 15, true, new Date('1994-01-03')),
    new Alumno(2, 'Nobara', 'Kigusaki', 'nobara@gmail.com', 16, true, new Date('1994-01-03')),
    new Alumno(3, 'Yuji', 'Itadori', 'yiji@gmail.com', 15, false, new Date('1994-01-03')),
    new Alumno(4, 'Toge', 'Inumaki', 'toge@gmail.com', 17, true, new Date('1994-01-03')),
    new Alumno(5, 'Panda', '', 'panda@gmail.com', 99999, true, new Date('1994-01-03')),
    new Alumno(6, 'Maki', 'Zenin', 'maki@gmail.com', 16, true, new Date('1994-01-03')),
  ];
  ngOnInit(): void {

  }
}
