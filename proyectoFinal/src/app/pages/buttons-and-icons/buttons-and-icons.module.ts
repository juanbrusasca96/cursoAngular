import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsAndIconsComponent } from './buttons-and-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ButtonsAndIconsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ButtonsAndIconsComponent
  ]
})
export class ButtonsAndIconsModule { }
