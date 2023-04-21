import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  nombreControl = new FormControl('', [Validators.required])
  formularioRegistro = new FormGroup({
    nombre: this.nombreControl
  })
}
