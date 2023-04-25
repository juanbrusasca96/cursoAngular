import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/core/models';

@Pipe({
  name: 'completeName'
})
export class CompleteNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return `${value.name} - ${value.username}`;
  }

}
