import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoCotizacionService } from '../../Servicios/carrito.service';
import { ElementRef, ViewChild } from '@angular/core';
import { ModalCotizacionComponent } from '../modal-cotizacion/modal-cotizacion.component';
import { FormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-carrito-cotizacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito-cotizacion.component.html',
  styleUrl: './carrito-cotizacion.component.css'
})
export class CarritoCotizacionComponent {
  popoverAbierto =  false;
  modalEnviarAbierto =  false;
  carrito : any[] = []
  cantidad = 0
  modalCotizacion =  false

    nombre = '';
    apellido = '';

   @ViewChild('popoverCarrito') popoverCarrito!: ElementRef;
  constructor(private carritoCotService:CarritoCotizacionService){}

  ngOnInit(){
   
    this.carrito = this.carritoCotService.getCarrito();
     this.carritoCotService.abrirPopover$.subscribe(() => {
    this.togglePopover() // Método que muestra el carrito
  });
  }

  togglePopover(){
    this.popoverAbierto = !this.popoverAbierto;
  }
  get productos(){
    return this.carritoCotService.getCarrito()
  }

eliminarProducto(idProducto: string) {
  this.carritoCotService.eliminarProductoPorId(idProducto);
}

abrirModalCotizacion(){
  this.popoverAbierto =  false
  this.modalCotizacion =  true
}


}
