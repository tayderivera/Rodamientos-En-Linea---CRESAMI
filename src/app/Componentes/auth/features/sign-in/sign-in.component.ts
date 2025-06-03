import { Component, inject } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//auth
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
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
      signInWithEmailAndPassword(this.auth, this.authForm.value.email, this.authForm.value.password)
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
            if (error.message.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)){
            this.errorMessage = "El correo y/o la contraseña son incorrectos. "
          }
        }
      })
      
    }

    navegarAPanel(){
      this.router.navigate(['/productos'])
  } 



}







