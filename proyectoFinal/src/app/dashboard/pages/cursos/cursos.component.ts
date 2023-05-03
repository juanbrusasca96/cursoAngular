import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/core/models/cursos.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { AbmCursosComponent } from './components/abm-cursos/abm-cursos.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource()

  displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'eliminar', 'editar', 'ver_detalle']

  cursosSubscription: Subscription | null = null;

  constructor(private cursosService: CursosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cursosSubscription = this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  ngOnDestroy(): void {
    this.cursosSubscription?.unsubscribe();
  }

  crearCurso(): void {
    const dialog = this.dialog.open(AbmCursosComponent);
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.cursosService.crearCurso(formValue)
        }
      });
  }

  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCursosComponent, {
      data: {
        curso,
      }
    })

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.cursosService.editarCurso(curso.id, formValue);
        }
      })
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('Está seguro?')) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }
  irAlDetalle(id: number): void {

  }
}
