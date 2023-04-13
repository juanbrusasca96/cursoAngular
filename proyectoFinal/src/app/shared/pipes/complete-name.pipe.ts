import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/models';

@Pipe({
  name: 'completeName'
})
export class CompleteNamePipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    return `${value.firstName} ${value.lastName}`;
  }

}
