import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoCotizacionService } from '../../Servicios/carrito.service';
import { ElementRef, ViewChild } from '@angular/core';
import { ModalCotizacionComponent } from '../modal-cotizacion/modal-cotizacion.component';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';


interface CotizacionForm{
  nombre: string;
  empresa:  string;
  correo: string;
  telefono: string;
  mensaje: string;
}

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

  form: CotizacionForm = {
    nombre:"",
    empresa:"",
    correo:"",
    telefono: "",
    mensaje:""


  }
   

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

  //funciones para generar el correo de cotización:

  getNextCotizacionId(): string {
      let lastId = Number(localStorage.getItem('cotizacion_id') || '0');
      lastId++;
      localStorage.setItem('cotizacion_id', lastId.toString());
      return lastId.toString().padStart(3, '0'); // Ejemplo: 001, 002, etc.
    }

      // Genera el HTML de productos para la plantilla de EmailJS
    generarProductosHtml(): string {
      return this.productos.map(p =>
        `<div style="display: flex; align-items: center; background: #f5f5f5; border-radius: 8px; padding: 10px;">
          <img src="${p.imagenProducto}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 12px; border-radius: 6px; background: #fff; border: 1px solid #eee;">
          <span style="font-size: 15px; color: #222;">${p.nombreProducto}</span>
        </div>`
      ).join('');
    }

    // Función para enviar la cotización
    enviarCotizacion() {
      const cotizacion_id = this.getNextCotizacionId();
      const productos_html = this.generarProductosHtml();

      emailjs.send(
    "service_usfkino",
    "template_cokd6rg",
    {
      ...this.form,                // nombre, empresa, correo, telefono, mensaje
      cotizacion_id: cotizacion_id,
      productos_html: productos_html
    },
    {
      publicKey: "LkBeXv7-RZ-0I0ZXf",
    }
  )
  .then(() => {
    alert("¡Cotización enviada correctamente!");
    this.modalCotizacion = false;
    // Limpia el formulario si lo deseas:
    this.form = {
      nombre: "",
      empresa: "",
      correo: "",
      telefono: "",
      mensaje: ""
    };
    this.carritoCotService.limpiarCarrito()
  })
  .catch((error) => {
    alert("Error al enviar la cotización");
    console.error(error);
  });
        
      }
  
  }


