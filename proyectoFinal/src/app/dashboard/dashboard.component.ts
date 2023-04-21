import { Component } from '@angular/core';
import links from './nav-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  links = links

  constructor(private router: Router) {

  }

  logout(): void {
    this.router.navigate(['auth', 'login'])
  }
}
