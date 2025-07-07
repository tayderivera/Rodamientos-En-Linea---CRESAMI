import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rodamientos',
  imports: [CommonModule, RouterModule],
  templateUrl: './rodamientos.component.html',
  styleUrl: './rodamientos.component.css'
})
export class RodamientosComponent {

  constructor(private router: Router){}
}
