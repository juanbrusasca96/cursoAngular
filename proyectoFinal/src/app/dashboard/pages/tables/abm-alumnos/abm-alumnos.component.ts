import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent {

  nombreControl = new FormControl('', Validators.required)
  usernameControl = new FormControl('', Validators.required)
  emailControl = new FormControl('', [Validators.required, Validators.email])
  telefonoControl = new FormControl('', Validators.required)

  alumnosForm = new FormGroup({
    name: this.nombreControl,
    username: this.usernameControl,
    email: this.emailControl,
    phone: this.telefonoControl
  })

  constructor(private dialogRef: MatDialogRef<AbmAlumnosComponent>, @Inject(MAT_DIALOG_DATA) private data:any) {
    if(data){
      this.nombreControl.setValue(data.alumnoParaEditar.name)
      this.usernameControl.setValue(data.alumnoParaEditar.username)
      this.emailControl.setValue(data.alumnoParaEditar.email)
      this.telefonoControl.setValue(data.alumnoParaEditar.phone)
    }
   }

  get mailControl(): AbstractControl | null {
    return this.alumnosForm.get('email');
  }

  get mailControlIsInvalid(): boolean {
    return !!(this.emailControl?.invalid && this.emailControl.touched);
  }

  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value)
    }
    else {
      this.alumnosForm.markAllAsTouched();
    }
  }
}
