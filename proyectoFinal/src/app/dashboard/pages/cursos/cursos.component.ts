import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/core/models/cursos.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Observable, Subscription } from 'rxjs';
import { MateriasService } from 'src/app/core/services/materias.service';
import { Materia } from '../../../core/models/materias.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/models/usuario.models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource()
  materiasArray: Materia[] = []

  displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'eliminar']

  cursosSubscription: Subscription | null = null;
  materiasSubscription: Subscription | null = null;
  authUser$: Observable<Usuario | null>;

  constructor(private cursosService: CursosService, private materiasService: MateriasService, private dialog: MatDialog, private authService: AuthService) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
   }

  ngOnInit(): void {
    this.materiasSubscription = this.materiasService.obtenerMaterias().subscribe({
      next: (materias) => {
        this.materiasArray = materias;
        this.cursosSubscription = this.cursosService.obtenerCursos().subscribe({
          next: (cursos) => {
            this.dataSource.data = cursos.map((curso) => ({ ...curso, nombre: this.materiasArray.find((m) => m.id == curso.idMateria)?.nombre }));
          },
        });
      },
    });

  }

  ngOnDestroy(): void {
    this.cursosSubscription?.unsubscribe();
    this.materiasSubscription?.unsubscribe();
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('Está seguro?')) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }
  irAlDetalle(id: number): void {

  }
}
