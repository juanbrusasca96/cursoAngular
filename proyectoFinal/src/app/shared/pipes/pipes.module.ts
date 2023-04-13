import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteNamePipe } from './complete-name.pipe';



@NgModule({
  declarations: [
    CompleteNamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompleteNamePipe
  ]
})
export class PipesModule { }
