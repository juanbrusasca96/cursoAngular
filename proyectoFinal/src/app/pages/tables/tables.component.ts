import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { MatDialog } from '@angular/material/dialog';

const alumnos: Alumno[] = [
  new Alumno(1, 'Megumi', 'Fushiguro', 'megumi@gmail.com', 15, true, new Date('1994-01-03')),
  new Alumno(2, 'Nobara', 'Kigusaki', 'nobara@gmail.com', 16, true, new Date('1994-01-03')),
  new Alumno(3, 'Yuji', 'Itadori', 'yiji@gmail.com', 15, false, new Date('1994-01-03')),
  new Alumno(4, 'Toge', 'Inumaki', 'toge@gmail.com', 17, true, new Date('1994-01-03')),
  new Alumno(5, 'Panda', '', 'panda@gmail.com', 99999, true, new Date('1994-01-03')),
  new Alumno(6, 'Maki', 'Zenin', 'maki@gmail.com', 16, true, new Date('1994-01-03')),
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'age'];
  dataSource = alumnos

  constructor(private matDialog: MatDialog) { }

  abrirABMAlumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)
    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource = [
          ...this.dataSource,
          new Alumno(this.dataSource.length + 1, valor.nombre, valor.apellido, valor.email, valor.edad, false, new Date())
        ]
      }
    })
  }
}
