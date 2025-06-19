import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CarritoCotizacionService } from '../../Servicios/carrito.service';
import { Producto } from '../../Clases/bd';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-cotizacion',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-cotizacion.component.html',
  styleUrl: './modal-cotizacion.component.css'
})
export class ModalCotizacionComponent {
  @Input() mostrar = false;
  @Output() cerrar = new EventEmitter<void>();

  email = '';
  mensaje = '';
  productos: Producto[] = [];

  constructor(private carritoService: CarritoCotizacionService) {}

  ngOnInit() {
    this.productos = this.carritoService.getCarrito();
  }

  enviarCotizacion() {
    if (!this.email) return;
    // Aquí puedes manejar el envío (servicio, email, etc.)
    this.cerrar.emit();
  }
}

