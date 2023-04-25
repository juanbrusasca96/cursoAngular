import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteNamePipe } from './complete-name.pipe';
import { ControlErrorMessagesPipe } from './control-error-messages';



@NgModule({
  declarations: [
    CompleteNamePipe,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompleteNamePipe,
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
