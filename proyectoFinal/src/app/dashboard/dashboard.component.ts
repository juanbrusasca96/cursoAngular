import { Component } from '@angular/core';
import links from './nav-item';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../core/models/usuario.models';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  links = links

  authUser$: Observable<Usuario | null>;

  constructor(private router: Router, private authService: AuthService) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  logout(): void {
    this.authService.logout()
  }
}
