import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    CardsComponent
  ]
})
export class CardsModule { }
