import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  scrolled =  false;

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
  

  scrollToForm() {
    const formSection = document.getElementById('formulario');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  

}
