import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  emailControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.email
    ]
  );

  nameControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  )

  lastNameControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(3)
    ]
  )

  passwordControl = new FormControl(
    '',
    [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)
    ]
  )

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      nombre: this.nameControl,
      email: this.emailControl,
      apellido: this.lastNameControl,
      contrasena: this.passwordControl
    })
  }

  get nombreControl(): AbstractControl | null {
    return this.registerForm.get('nombre');
  }

  get nombreControlIsInvalid(): boolean {
    return !!(this.nombreControl?.invalid && this.nombreControl.touched);
  }

  get mailControl(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get mailControlIsInvalid(): boolean {
    return !!(this.emailControl?.invalid && this.emailControl.touched);
  }

  get apellidoControl(): AbstractControl | null {
    return this.registerForm.get('apellido');
  }

  get apellidoControlIsInvalid(): boolean {
    return !!(this.apellidoControl?.invalid && this.apellidoControl.touched);
  }

  get contrasenaControl(): AbstractControl | null {
    return this.registerForm.get('contrasena');
  }

  get contrasenaControlIsInvalid(): boolean {
    return !!(this.contrasenaControl?.invalid && this.contrasenaControl.touched);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
    else {
      alert('El formulario tiene errores')
    }
  }

}
