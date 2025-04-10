import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './Componentes/header/header.component';
import { MainComponent } from "./Componentes/main/main.component";
import { NosotrosComponent } from "./Componentes/nosotros/nosotros.component";
import { MarcasComponent } from "./Componentes/marcas/marcas.component";
import { RodamientosComponent } from "./Componentes/rodamientos/rodamientos.component";
import { ContactanosComponent } from "./Componentes/contactanos/contactanos.component";
import { FooterComponent } from "./Componentes/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, HeaderComponent, NosotrosComponent, MarcasComponent, RodamientosComponent, ContactanosComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-project';
}
