import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { MarcasComponent } from "../marcas/marcas.component";
import { NosotrosComponent } from "../nosotros/nosotros.component";
import { RodamientosComponent } from "../rodamientos/rodamientos.component";
import { ContactanosComponent } from "../contactanos/contactanos.component";
import { Router } from '@angular/router';
import { prodErrorMap } from 'firebase/auth';

@Component({
  selector: 'app-main',
  imports: [CommonModule, HeaderComponent, MarcasComponent, NosotrosComponent, RodamientosComponent, ContactanosComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  scrolled =  false;
  constructor(private router : Router){}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrollPosition > 50; // Cambia a `true` si el scroll es mayor a 50px
  }
  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  navegarAProductos(){
    this.router.navigate(["/productos"])
  }

  scrollToForm() {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  

}
