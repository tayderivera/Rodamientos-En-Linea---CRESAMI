import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isHeroSection = true;
  isLargeScreen: boolean = window.innerWidth >= 1024;
  scrolled =  false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolled = scrollPosition > 50; // Cambia a `true` si el scroll es mayor a 50px
    const heroHeight = document.getElementById('hero')?.offsetHeight || 0;
    this.isHeroSection = window.scrollY < heroHeight;
  }
  onResize(event: Event): void {
    this.isLargeScreen = window.innerWidth >= 1024;
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.isLargeScreen = window.innerWidth >= 1024;
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
