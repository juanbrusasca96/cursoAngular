import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardsModule } from '../pages/cards/cards.module';
import { ButtonsAndIconsModule } from '../pages/buttons-and-icons/buttons-and-icons.module';
import { FormsModule } from '../pages/forms/forms.module';
import { TablesModule } from '../pages/tables/tables.module';
import { DirectivesModule } from '../shared/directives/directives.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CardsModule,
    ButtonsAndIconsModule,
    FormsModule,
    TablesModule,
    DirectivesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
