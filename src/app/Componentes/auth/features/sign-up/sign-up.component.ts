import { Component, inject } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//auth
import { Auth, AuthErrorCodes, createUserWithEmailAndPassword, GoogleAuthProvider} from '@angular/fire/auth';

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  authForm!: FormGroup;

  //Inicializar el provedor auth de Google
  googleAuthProvider = new GoogleAuthProvider();

  //auth
  auth = inject(Auth);

  isLoading: boolean =  false;
  errorMessage:  string = "";

  constructor(private router :Router){
    this.initForm();
  }

  initForm(){
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

    }
    onSubmit(){
      if(this.authForm.invalid){
        return
      }
      this.isLoading =  true;

      //si el formulario es valido loguear al usuario:
      createUserWithEmailAndPassword(this.auth, this.authForm.value.email, this.authForm.value.password)
      .then((response) => {
        this.navegarAPanel();
      })
      .catch(error => {
        this.isLoading =  false;
        console.error('error: ', error);
        if(error instanceof Error){
          if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)){
            this.errorMessage = "El correo no es válido. "
          }
          else if (error.message.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)){
            this.errorMessage = "El correo y/o la contraseña son incorrectos. "
          }
          else if(this.errorMessage.includes(AuthErrorCodes.WEAK_PASSWORD)){
            this.errorMessage = "Ingrese una contrasea más fuerte."
          }
          else if(this.errorMessage.includes(AuthErrorCodes.WEAK_PASSWORD)){
            this.errorMessage = "El correo ya está en uso en otra cuenta. "
          }
          else{
            this.errorMessage = ("Ocurrió un error, intente de nuevo. ")
          }
        }
      })
      
    }

    navegarAPanel(){
      this.router.navigate(['/productos'])
  } 



}







