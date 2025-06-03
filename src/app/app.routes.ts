import { Routes } from '@angular/router';
import { DisplayProductosComponent } from './Componentes/display-productos/display-productos/display-productos.components';
import { MainComponent } from './Componentes/main/main.component';
import { SignInComponent } from './Componentes/auth/features/sign-in/sign-in.component';
//import { SignUpComponent } from './Componentes/auth/features/sign-up/sign-up.component';

export const routes: Routes = [

{path: 'productos', component: DisplayProductosComponent},
{path: '', component: MainComponent},
//{path: 'sign-up', component: SignUpComponent},
{path: 'login', component: SignInComponent},

];
